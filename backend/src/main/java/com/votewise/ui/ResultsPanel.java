package com.votewise.ui;

import javax.swing.*;
import java.awt.*;
import java.awt.geom.RoundRectangle2D;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Results Panel with animated bar chart, statistics cards, and live data.
 */
public class ResultsPanel extends JPanel {

    private JPanel chartPanel;
    private JPanel statsPanel;
    private JSONArray resultsData;
    private float animProgress = 0f;
    private Timer animTimer;

    private Timer refreshTimer;

    public ResultsPanel() {
        this(false);
    }

    public ResultsPanel(boolean autoRefresh) {
        setOpaque(false);
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(24, 28, 24, 28));

        // Header
        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);
        header.setBorder(BorderFactory.createEmptyBorder(0, 0, 16, 0));

        JPanel titleBlock = new JPanel();
        titleBlock.setOpaque(false);
        titleBlock.setLayout(new BoxLayout(titleBlock, BoxLayout.Y_AXIS));
        titleBlock.add(VoteWiseTheme.createLabel("Live Results", VoteWiseTheme.FONT_HEADING, VoteWiseTheme.TEXT_PRIMARY));
        titleBlock.add(Box.createVerticalStrut(4));
        titleBlock.add(VoteWiseTheme.createLabel(autoRefresh ? "Auto-refreshing every 3s..." : "Live results from all cast votes", VoteWiseTheme.FONT_BODY, VoteWiseTheme.TEXT_SECONDARY));

        AnimatedButton refreshBtn = new AnimatedButton("Refresh", VoteWiseTheme.ACCENT_CYAN, VoteWiseTheme.ACCENT_BLUE);
        refreshBtn.setPreferredSize(new Dimension(130, 38));
        refreshBtn.addActionListener(e -> loadResults());

        header.add(titleBlock, BorderLayout.WEST);
        header.add(refreshBtn, BorderLayout.EAST);
        add(header, BorderLayout.NORTH);

        // Main content split
        JPanel body = new JPanel(new BorderLayout(20, 0));
        body.setOpaque(false);

        // Chart area
        chartPanel = new JPanel() {
            @Override
            protected void paintComponent(Graphics g) {
                super.paintComponent(g);
                if (resultsData != null && resultsData.length() > 0) {
                    drawBarChart((Graphics2D) g);
                }
            }
        };
        chartPanel.setOpaque(false);
        chartPanel.setPreferredSize(new Dimension(600, 400));

        RoundedPanel chartCard = new RoundedPanel(16, VoteWiseTheme.CARD_BG, VoteWiseTheme.CARD_BORDER);
        chartCard.setLayout(new BorderLayout());
        chartCard.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        chartCard.add(chartPanel, BorderLayout.CENTER);

        // Stats sidebar
        statsPanel = new JPanel();
        statsPanel.setOpaque(false);
        statsPanel.setLayout(new BoxLayout(statsPanel, BoxLayout.Y_AXIS));
        statsPanel.setPreferredSize(new Dimension(280, 400));

        JScrollPane statsScroll = new JScrollPane(statsPanel);
        statsScroll.setOpaque(false);
        statsScroll.getViewport().setOpaque(false);
        statsScroll.setBorder(null);
        statsScroll.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);

        body.add(chartCard, BorderLayout.CENTER);
        body.add(statsScroll, BorderLayout.EAST);
        add(body, BorderLayout.CENTER);

        loadResults();

        if (autoRefresh) {
            refreshTimer = new Timer(3000, e -> loadResults());
            refreshTimer.start();
        }
    }

    private void loadResults() {
        new SwingWorker<JSONArray, Void>() {
            protected JSONArray doInBackground() throws Exception {
                return ApiClient.getResults();
            }
            protected void done() {
                try {
                    resultsData = get();
                    chartPanel.removeAll();
                    buildStatsCards();
                    if (animProgress == 0f) animateChart();
                    else chartPanel.repaint();
                } catch (Exception ex) {
                    if (resultsData == null) {
                        statsPanel.removeAll();
                        statsPanel.add(VoteWiseTheme.createLabel("Connection Error", VoteWiseTheme.FONT_BODY, VoteWiseTheme.ERROR));
                        statsPanel.revalidate();
                    }
                }
            }
        }.execute();
    }

    private void animateChart() {
        if (animTimer != null) animTimer.stop();
        animProgress = 0f;
        animTimer = new Timer(20, e -> {
            animProgress = Math.min(1f, animProgress + 0.03f);
            chartPanel.repaint();
            if (animProgress >= 1f) ((Timer) e.getSource()).stop();
        });
        animTimer.start();
    }

    private void drawBarChart(Graphics2D g2d) {
        VoteWiseTheme.enableAntiAliasing(g2d);
        int w = chartPanel.getWidth(), h = chartPanel.getHeight();
        int n = resultsData.length();
        if (n == 0) return;

        int maxVotes = 1;
        for (int i = 0; i < n; i++) {
            int v = resultsData.getJSONObject(i).optInt("votes", 0);
            if (v > maxVotes) maxVotes = v;
        }

        int barWidth = Math.min(50, (w - 60) / n - 10);
        int chartHeight = h - 80;
        int startX = 40;

        Color[] barColors = {
            VoteWiseTheme.ACCENT_BLUE, VoteWiseTheme.ACCENT_PURPLE, VoteWiseTheme.ACCENT_PINK,
            VoteWiseTheme.ACCENT_CYAN, VoteWiseTheme.ACCENT_GREEN, VoteWiseTheme.ACCENT_GOLD,
            VoteWiseTheme.ACCENT_ORANGE, new Color(150, 100, 255), new Color(255, 100, 150),
            new Color(100, 200, 255)
        };

        // Y-axis
        g2d.setColor(new Color(0, 0, 0, 30));
        g2d.setStroke(new BasicStroke(1f));
        g2d.drawLine(startX - 5, 20, startX - 5, 20 + chartHeight);

        // Grid lines
        for (int i = 0; i <= 5; i++) {
            int y = 20 + (int)(chartHeight * (1.0 - i / 5.0));
            g2d.setColor(new Color(0, 0, 0, 15));
            g2d.drawLine(startX, y, w - 20, y);
            g2d.setColor(VoteWiseTheme.TEXT_MUTED);
            g2d.setFont(VoteWiseTheme.FONT_CAPTION);
            String val = String.valueOf((int)(maxVotes * i / 5.0));
            g2d.drawString(val, 5, y + 4);
        }

        // Bars
        int spacing = (w - startX - 20) / n;
        for (int i = 0; i < n; i++) {
            JSONObject c = resultsData.getJSONObject(i);
            int votes = c.optInt("votes", 0);
            String name = c.optString("name", "?");

            float ratio = (float) votes / maxVotes * animProgress;
            int barH = (int)(chartHeight * ratio);
            int x = startX + i * spacing + (spacing - barWidth) / 2;
            int y = 20 + chartHeight - barH;

            Color color = barColors[i % barColors.length];

            // Bar glow
            for (int j = 8; j > 0; j--) {
                g2d.setColor(new Color(color.getRed(), color.getGreen(), color.getBlue(), 3));
                g2d.fillRoundRect(x - j, y - j, barWidth + j * 2, barH + j, 6, 6);
            }

            // Bar fill gradient
            g2d.setPaint(new GradientPaint(x, y, color, x, y + barH, color.darker()));
            g2d.fillRoundRect(x, y, barWidth, barH, 6, 6);

            // Shine
            g2d.setPaint(new GradientPaint(x, y, new Color(255, 255, 255, 50), x, y + barH / 2, new Color(255, 255, 255, 0)));
            g2d.fillRoundRect(x, y, barWidth / 2, barH, 6, 6);

            // Vote count on top
            if (animProgress > 0.5f) {
                g2d.setFont(VoteWiseTheme.FONT_BODY_BOLD);
                g2d.setColor(color);
                FontMetrics fm = g2d.getFontMetrics();
                String voteStr = String.valueOf(votes);
                g2d.drawString(voteStr, x + (barWidth - fm.stringWidth(voteStr)) / 2, y - 6);
            }

            // Name below
            g2d.setFont(VoteWiseTheme.FONT_CAPTION);
            g2d.setColor(VoteWiseTheme.TEXT_SECONDARY);
            FontMetrics fm = g2d.getFontMetrics();
            String shortName = name.length() > 10 ? name.substring(0, 9) + "…" : name;
            int textX = x + (barWidth - fm.stringWidth(shortName)) / 2;
            g2d.drawString(shortName, textX, 20 + chartHeight + 16);
        }

        // Title
        g2d.setFont(VoteWiseTheme.FONT_BODY_BOLD);
        g2d.setColor(VoteWiseTheme.TEXT_MUTED);
        g2d.drawString("Votes by Candidate", w / 2 - 60, h - 10);
    }

    private void buildStatsCards() {
        statsPanel.removeAll();

        if (resultsData == null || resultsData.length() == 0) {
            statsPanel.add(VoteWiseTheme.createLabel("No data available", VoteWiseTheme.FONT_BODY, VoteWiseTheme.TEXT_MUTED));
            statsPanel.revalidate();
            return;
        }

        int totalVotes = 0;
        String leader = "";
        int leaderVotes = 0;
        for (int i = 0; i < resultsData.length(); i++) {
            JSONObject c = resultsData.getJSONObject(i);
            int v = c.optInt("votes", 0);
            totalVotes += v;
            if (v > leaderVotes) { leaderVotes = v; leader = c.optString("name", "?"); }
        }

        // Summary cards
        statsPanel.add(createStatCard("Leading", leader, VoteWiseTheme.ACCENT_GOLD));
        statsPanel.add(Box.createVerticalStrut(10));
        statsPanel.add(createStatCard("Total Votes", String.valueOf(totalVotes), VoteWiseTheme.ACCENT_BLUE));
        statsPanel.add(Box.createVerticalStrut(10));
        statsPanel.add(createStatCard("Candidates", String.valueOf(resultsData.length()), VoteWiseTheme.ACCENT_PURPLE));
        statsPanel.add(Box.createVerticalStrut(16));

        // Ranking list
        JLabel rankTitle = VoteWiseTheme.createLabel("  Ranking", VoteWiseTheme.FONT_BODY_BOLD, VoteWiseTheme.TEXT_PRIMARY);
        statsPanel.add(rankTitle);
        statsPanel.add(Box.createVerticalStrut(8));

        Color[] medals = {VoteWiseTheme.ACCENT_GOLD, new Color(192, 192, 210), new Color(205, 127, 50)};
        for (int i = 0; i < resultsData.length(); i++) {
            JSONObject c = resultsData.getJSONObject(i);
            String name = c.optString("name", "?");
            int votes = c.optInt("votes", 0);
            float pct = totalVotes > 0 ? (float) votes / totalVotes * 100 : 0;
            Color medalColor = i < 3 ? medals[i] : VoteWiseTheme.TEXT_MUTED;
            String prefix = i < 3 ? new String[]{"1st", "2nd", "3rd"}[i] : (i + 1) + ".";

            statsPanel.add(createRankItem(prefix, name, votes, pct, medalColor));
            statsPanel.add(Box.createVerticalStrut(6));
        }

        statsPanel.add(Box.createVerticalGlue());
        statsPanel.revalidate();
        statsPanel.repaint();
    }

    private JPanel createStatCard(String label, String value, Color accent) {
        RoundedPanel card = new RoundedPanel(12, VoteWiseTheme.CARD_BG, new Color(accent.getRed(), accent.getGreen(), accent.getBlue(), 40));
        card.setLayout(new BorderLayout());
        card.setBorder(BorderFactory.createEmptyBorder(14, 16, 14, 16));
        card.setMaximumSize(new Dimension(280, 80));

        JLabel labelL = VoteWiseTheme.createLabel(label, VoteWiseTheme.FONT_SMALL, VoteWiseTheme.TEXT_SECONDARY);
        JLabel valueL = VoteWiseTheme.createLabel(value, VoteWiseTheme.FONT_SUBHEADING, accent);

        JPanel textPanel = new JPanel();
        textPanel.setOpaque(false);
        textPanel.setLayout(new BoxLayout(textPanel, BoxLayout.Y_AXIS));
        textPanel.add(labelL);
        textPanel.add(Box.createVerticalStrut(4));
        textPanel.add(valueL);
        card.add(textPanel, BorderLayout.CENTER);
        return card;
    }

    private JPanel createRankItem(String prefix, String name, int votes, float pct, Color color) {
        JPanel item = new JPanel(new BorderLayout(8, 0));
        item.setOpaque(false);
        item.setMaximumSize(new Dimension(280, 36));
        item.setBorder(BorderFactory.createEmptyBorder(4, 8, 4, 8));

        JLabel prefixL = VoteWiseTheme.createLabel(prefix, VoteWiseTheme.FONT_BODY, color);
        prefixL.setPreferredSize(new Dimension(30, 20));

        JLabel nameL = VoteWiseTheme.createLabel(name, VoteWiseTheme.FONT_SMALL, VoteWiseTheme.TEXT_PRIMARY);
        JLabel voteL = VoteWiseTheme.createLabel(votes + " (" + String.format("%.1f", pct) + "%)", VoteWiseTheme.FONT_CAPTION, VoteWiseTheme.TEXT_SECONDARY);
        voteL.setHorizontalAlignment(SwingConstants.RIGHT);

        item.add(prefixL, BorderLayout.WEST);
        item.add(nameL, BorderLayout.CENTER);
        item.add(voteL, BorderLayout.EAST);
        return item;
    }
}
