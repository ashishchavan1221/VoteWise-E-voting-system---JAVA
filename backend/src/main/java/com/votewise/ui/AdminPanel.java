package com.votewise.ui;

import javax.swing.*;
import java.awt.*;

/**
 * Admin Panel showing simulated backend statistics, election controls, and system health.
 */
public class AdminPanel extends JPanel {

    private JLabel voterStatLbl;
    private JLabel systemStatusLbl;
    private JLabel securityLogLbl;
    private JLabel controlStatLbl;
    private Timer refreshTimer;

    public AdminPanel() {
        setOpaque(false);
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(24, 28, 24, 28));

        // Header
        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);
        header.setBorder(BorderFactory.createEmptyBorder(0, 0, 20, 0));
        
        JPanel titleBlock = new JPanel();
        titleBlock.setLayout(new BoxLayout(titleBlock, BoxLayout.Y_AXIS));
        titleBlock.setOpaque(false);
        titleBlock.add(VoteWiseTheme.createLabel("Admin Monitoring", VoteWiseTheme.FONT_HEADING, VoteWiseTheme.TEXT_PRIMARY));
        titleBlock.add(Box.createVerticalStrut(4));
        titleBlock.add(VoteWiseTheme.createLabel("Real-time monitoring of election turnout and results", VoteWiseTheme.FONT_BODY, VoteWiseTheme.TEXT_SECONDARY));
        header.add(titleBlock, BorderLayout.WEST);
        
        add(header, BorderLayout.NORTH);

        // Body Grid
        JPanel body = new JPanel(new GridLayout(2, 2, 20, 20));
        body.setOpaque(false);

        // Card 1: System Status
        systemStatusLbl = new JLabel("Online & Secure");
        body.add(createAdminCard("System Status", systemStatusLbl, "All API endpoints are responding normally. Database latency is <20ms."));
        
        // Card 2: Voter Statistics
        voterStatLbl = new JLabel("Loading...");
        body.add(createAdminCard("Voter Statistics", voterStatLbl, "Live turnout percentage based on registered voter target."));
        
        // Card 3: Security Logs
        securityLogLbl = new JLabel("0 Intrusions");
        body.add(createAdminCard("Security Logs", securityLogLbl, "No unauthorized access detected. AES-256 encryption active across all nodes."));

        // Card 4: Election Controls
        controlStatLbl = new JLabel("10 Candidates");
        body.add(createAdminCard("Election Controls", controlStatLbl, "Manage candidate profiles and view detailed auditing logs."));

        JScrollPane scroll = new JScrollPane(body);
        scroll.setOpaque(false);
        scroll.getViewport().setOpaque(false);
        scroll.setBorder(null);

        add(scroll, BorderLayout.CENTER);

        loadAdminStats();
        refreshTimer = new Timer(3000, e -> loadAdminStats());
        refreshTimer.start();
    }

    private void loadAdminStats() {
        new SwingWorker<org.json.JSONArray, Void>() {
            protected org.json.JSONArray doInBackground() throws Exception {
                return ApiClient.getResults();
            }
            protected void done() {
                try {
                    org.json.JSONArray data = get();
                    int totalVotes = 0;
                    for (int i = 0; i < data.length(); i++) {
                        totalVotes += data.getJSONObject(i).optInt("votes", 0);
                    }
                    
                    int targetVoters = 1000; 
                    float percentage = (float) totalVotes / targetVoters * 100;
                    
                    voterStatLbl.setText(totalVotes + " (" + String.format("%.1f", percentage) + "%)");
                    voterStatLbl.setForeground(VoteWiseTheme.ACCENT_BLUE);
                    voterStatLbl.setFont(VoteWiseTheme.FONT_TITLE);
                } catch (Exception ex) {
                    voterStatLbl.setText("Offline");
                }
            }
        }.execute();
    }

    private JPanel createAdminCard(String title, JLabel valLbl, String subText) {
        RoundedPanel card = new RoundedPanel(16, VoteWiseTheme.CARD_BG, VoteWiseTheme.CARD_BORDER);
        card.setGlass(true);
        card.setGlassOpacity(0.4f);
        card.setLayout(new BoxLayout(card, BoxLayout.Y_AXIS));
        card.setBorder(BorderFactory.createEmptyBorder(24, 24, 24, 24));

        JLabel titleLbl = VoteWiseTheme.createLabel(title, VoteWiseTheme.FONT_SUBHEADING, VoteWiseTheme.TEXT_PRIMARY);
        valLbl.setForeground(VoteWiseTheme.ACCENT_BLUE);
        valLbl.setFont(VoteWiseTheme.FONT_TITLE);
        
        JLabel subLbl = VoteWiseTheme.createLabel("<html>" + subText + "</html>", VoteWiseTheme.FONT_BODY, VoteWiseTheme.TEXT_SECONDARY);
        // Store subLbl reference if we wanted to update it, but tooltip is easier for now.
        // I'll stick to updating the main value label to include the % if needed.
        
        card.add(titleLbl);
        card.add(Box.createVerticalStrut(12));
        card.add(valLbl);
        card.add(Box.createVerticalStrut(16));
        card.add(subLbl);
        
        return card;
    }
}
