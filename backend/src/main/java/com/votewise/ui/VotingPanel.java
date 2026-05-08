package com.votewise.ui;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Voting Panel displaying candidate cards in a beautiful grid layout.
 * Each card shows candidate info with a vote button.
 */
public class VotingPanel extends JPanel {

    private JPanel cardsContainer;
    private JLabel headerStatus;
    private boolean hasVoted = false;

    public VotingPanel() {
        setOpaque(false);
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(24, 28, 24, 28));

        // Header
        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);
        header.setBorder(BorderFactory.createEmptyBorder(0, 0, 20, 0));

        JLabel title = VoteWiseTheme.createLabel("Cast Your Vote", VoteWiseTheme.FONT_HEADING, VoteWiseTheme.TEXT_PRIMARY);
        JLabel desc = VoteWiseTheme.createLabel("Select your preferred candidate and cast your vote securely", VoteWiseTheme.FONT_BODY, VoteWiseTheme.TEXT_SECONDARY);

        headerStatus = new JLabel(" ");
        headerStatus.setFont(VoteWiseTheme.FONT_BODY_BOLD);
        headerStatus.setForeground(VoteWiseTheme.ACCENT_GOLD);
        headerStatus.setHorizontalAlignment(SwingConstants.RIGHT);

        JPanel titleBlock = new JPanel();
        titleBlock.setOpaque(false);
        titleBlock.setLayout(new BoxLayout(titleBlock, BoxLayout.Y_AXIS));
        titleBlock.add(title);
        titleBlock.add(Box.createVerticalStrut(4));
        titleBlock.add(desc);

        header.add(titleBlock, BorderLayout.WEST);
        header.add(headerStatus, BorderLayout.EAST);
        add(header, BorderLayout.NORTH);

        // Cards container in scroll pane
        cardsContainer = new JPanel();
        cardsContainer.setOpaque(false);
        cardsContainer.setLayout(new GridLayout(0, 2, 16, 16));

        JScrollPane scroll = new JScrollPane(cardsContainer);
        scroll.setOpaque(false);
        scroll.getViewport().setOpaque(false);
        scroll.setBorder(null);
        scroll.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
        scroll.getVerticalScrollBar().setUnitIncrement(16);
        add(scroll, BorderLayout.CENTER);

        loadCandidates();
        checkVoteStatus();
    }

    private void loadCandidates() {
        new SwingWorker<JSONArray, Void>() {
            protected JSONArray doInBackground() throws Exception {
                return ApiClient.getCandidates();
            }
            protected void done() {
                try {
                    JSONArray candidates = get();
                    cardsContainer.removeAll();
                    for (int i = 0; i < candidates.length(); i++) {
                        JSONObject c = candidates.getJSONObject(i);
                        cardsContainer.add(createCandidateCard(c, i));
                    }
                    cardsContainer.revalidate();
                    cardsContainer.repaint();
                } catch (Exception ex) {
                    JLabel err = VoteWiseTheme.createLabel("Could not load candidates. Check server connection.",
                            VoteWiseTheme.FONT_BODY, VoteWiseTheme.ERROR);
                    err.setHorizontalAlignment(SwingConstants.CENTER);
                    cardsContainer.add(err);
                }
            }
        }.execute();
    }

    private void checkVoteStatus() {
        String voterId = ApiClient.getCurrentVoterId();
        if (voterId == null) return;
        new SwingWorker<Boolean, Void>() {
            protected Boolean doInBackground() throws Exception {
                return ApiClient.hasVoted(voterId);
            }
            protected void done() {
                try {
                    hasVoted = get();
                    if (hasVoted) {
                        headerStatus.setText("You have already cast your vote");
                        headerStatus.setForeground(VoteWiseTheme.SUCCESS);
                    }
                } catch (Exception ignored) {}
            }
        }.execute();
    }

    private JPanel createCandidateCard(JSONObject candidate, int index) {
        Color[] accentColors = {
            VoteWiseTheme.ACCENT_BLUE, VoteWiseTheme.ACCENT_PURPLE, VoteWiseTheme.ACCENT_PINK,
            VoteWiseTheme.ACCENT_CYAN, VoteWiseTheme.ACCENT_GREEN, VoteWiseTheme.ACCENT_GOLD,
            VoteWiseTheme.ACCENT_ORANGE, new Color(150, 100, 255), new Color(255, 100, 150),
            new Color(100, 200, 255)
        };
        Color accent = accentColors[index % accentColors.length];

        int candidateId = candidate.optInt("id", 0);
        String name = candidate.optString("name", "Unknown");
        String party = candidate.optString("party_or_group", "Independent");
        String manifesto = candidate.optString("manifesto", "No manifesto");
        String symbol = candidate.optString("symbol", "V");

        RoundedPanel card = new RoundedPanel(16, VoteWiseTheme.CARD_BG, new Color(accent.getRed(), accent.getGreen(), accent.getBlue(), 40));
        card.setLayout(new BorderLayout(12, 8));
        card.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        card.setPreferredSize(new Dimension(350, 170));

        // Hover effect
        card.addMouseListener(new MouseAdapter() {
            public void mouseEntered(MouseEvent e) {
                card.setBackgroundColor(VoteWiseTheme.CARD_HOVER);
                card.setBorderColor(new Color(accent.getRed(), accent.getGreen(), accent.getBlue(), 100));
                card.repaint();
            }
            public void mouseExited(MouseEvent e) {
                card.setBackgroundColor(VoteWiseTheme.CARD_BG);
                card.setBorderColor(new Color(accent.getRed(), accent.getGreen(), accent.getBlue(), 40));
                card.repaint();
            }
        });

        // Left: Symbol
        JLabel symbolLabel = new JLabel(symbol, SwingConstants.CENTER);
        symbolLabel.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 42));
        symbolLabel.setPreferredSize(new Dimension(70, 70));
        card.add(symbolLabel, BorderLayout.WEST);

        // Center: Info
        JPanel info = new JPanel();
        info.setOpaque(false);
        info.setLayout(new BoxLayout(info, BoxLayout.Y_AXIS));

        JLabel nameLabel = VoteWiseTheme.createLabel(name, VoteWiseTheme.FONT_SUBHEADING, VoteWiseTheme.TEXT_PRIMARY);
        JLabel partyLabel = VoteWiseTheme.createLabel(party, VoteWiseTheme.FONT_SMALL, accent);
        JLabel manifestoLabel = VoteWiseTheme.createLabel("\"" + manifesto + "\"", VoteWiseTheme.FONT_SMALL, VoteWiseTheme.TEXT_SECONDARY);
        manifestoLabel.setFont(manifestoLabel.getFont().deriveFont(Font.ITALIC));

        info.add(nameLabel);
        info.add(Box.createVerticalStrut(4));
        info.add(partyLabel);
        info.add(Box.createVerticalStrut(6));
        info.add(manifestoLabel);
        card.add(info, BorderLayout.CENTER);

        // Bottom: Vote button
        AnimatedButton voteBtn = new AnimatedButton("Vote Now", accent, accent.brighter());
        voteBtn.setPreferredSize(new Dimension(100, 36));
        voteBtn.setFont(VoteWiseTheme.FONT_BODY_BOLD);
        voteBtn.addActionListener(e -> castVote(candidateId, name, voteBtn));

        JPanel btnPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT, 0, 0));
        btnPanel.setOpaque(false);

        // Candidate ID badge
        JLabel idBadge = new JLabel("#" + candidateId + "  ");
        idBadge.setFont(VoteWiseTheme.FONT_CAPTION);
        idBadge.setForeground(VoteWiseTheme.TEXT_MUTED);
        btnPanel.add(idBadge);
        btnPanel.add(voteBtn);
        card.add(btnPanel, BorderLayout.SOUTH);

        return card;
    }

    private void castVote(int candidateId, String candidateName, AnimatedButton btn) {
        if (hasVoted) {
            JOptionPane.showMessageDialog(this, "You have already cast your vote!", "Already Voted", JOptionPane.WARNING_MESSAGE);
            return;
        }

        int confirm = JOptionPane.showConfirmDialog(this,
                "Are you sure you want to vote for " + candidateName + "?\nThis action cannot be undone!",
                "Confirm Vote", JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE);

        if (confirm != JOptionPane.YES_OPTION) return;

        btn.setEnabled(false);
        btn.setText("Processing...");

        new SwingWorker<JSONObject, Void>() {
            protected JSONObject doInBackground() throws Exception {
                return ApiClient.vote(ApiClient.getCurrentVoterId(), candidateId);
            }
            protected void done() {
                try {
                    JSONObject resp = get();
                    if (resp.has("error")) {
                        JOptionPane.showMessageDialog(VotingPanel.this, resp.getString("error"), "Error", JOptionPane.ERROR_MESSAGE);
                        btn.setEnabled(true);
                        btn.setText("Vote Now");
                    } else {
                        hasVoted = true;
                        btn.setText("Voted!");
                        headerStatus.setText("Vote cast for " + candidateName);
                        headerStatus.setForeground(VoteWiseTheme.SUCCESS);
                        JOptionPane.showMessageDialog(VotingPanel.this,
                                "Your vote for " + candidateName + " has been recorded!\nThank you for participating in the election.",
                                "Vote Cast Successfully", JOptionPane.INFORMATION_MESSAGE);
                    }
                } catch (Exception ex) {
                    btn.setEnabled(true);
                    btn.setText("Vote Now");
                    JOptionPane.showMessageDialog(VotingPanel.this, "Network error. Please try again.", "Error", JOptionPane.ERROR_MESSAGE);
                }
            }
        }.execute();
    }
}
