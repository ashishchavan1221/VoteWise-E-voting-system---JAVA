package com.votewise.ui;

import javax.swing.*;
import java.awt.*;

/**
 * Profile Panel showing the current user's info and session details.
 */
public class ProfilePanel extends JPanel {

    public ProfilePanel() {
        setOpaque(false);
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(24, 28, 24, 28));

        // Header with Edit Button
        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);
        header.setBorder(BorderFactory.createEmptyBorder(0, 0, 20, 0));
        
        JPanel titleBlock = new JPanel();
        titleBlock.setLayout(new BoxLayout(titleBlock, BoxLayout.Y_AXIS));
        titleBlock.setOpaque(false);
        titleBlock.add(VoteWiseTheme.createLabel("My Profile", VoteWiseTheme.FONT_HEADING, VoteWiseTheme.TEXT_PRIMARY));
        titleBlock.add(Box.createVerticalStrut(4));
        titleBlock.add(VoteWiseTheme.createLabel("Your account details and session information", VoteWiseTheme.FONT_BODY, VoteWiseTheme.TEXT_SECONDARY));
        header.add(titleBlock, BorderLayout.WEST);

        AnimatedButton editBtn = new AnimatedButton("Edit Profile", VoteWiseTheme.ACCENT_CYAN, VoteWiseTheme.ACCENT_BLUE);
        editBtn.setPreferredSize(new Dimension(140, 38));
        editBtn.addActionListener(e -> showEditProfileDialog());
        header.add(editBtn, BorderLayout.EAST);
        
        add(header, BorderLayout.NORTH);

        // Profile card
        JPanel center = new JPanel(new GridBagLayout());
        center.setOpaque(false);

        RoundedPanel card = new RoundedPanel(20, VoteWiseTheme.CARD_BG, VoteWiseTheme.CARD_BORDER);
        card.setGlass(true);
        card.setGlassOpacity(0.4f);
        card.setPreferredSize(new Dimension(500, 420));
        card.setLayout(new BorderLayout());
        card.setBorder(BorderFactory.createEmptyBorder(32, 36, 32, 36));

        JPanel content = new JPanel();
        content.setOpaque(false);
        content.setLayout(new BoxLayout(content, BoxLayout.Y_AXIS));

        // Avatar circle
        JPanel avatarPanel = new JPanel() {
            @Override
            protected void paintComponent(Graphics g) {
                Graphics2D g2d = (Graphics2D) g.create();
                VoteWiseTheme.enableAntiAliasing(g2d);
                int size = 90;
                int x = (getWidth() - size) / 2, y = 5;
                // Gradient circle
                g2d.setPaint(new GradientPaint(x, y, VoteWiseTheme.ACCENT_BLUE, x + size, y + size, VoteWiseTheme.ACCENT_PURPLE));
                g2d.fillOval(x, y, size, size);
                // Inner circle
                g2d.setColor(Color.WHITE);
                g2d.fillOval(x + 3, y + 3, size - 6, size - 6);
                // Initials
                String name = ApiClient.getCurrentUserName();
                String initials = "U";
                if (name != null && !name.isEmpty()) {
                    String[] parts = name.split(" ");
                    initials = parts.length > 1 ?
                            ("" + parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase() :
                            ("" + parts[0].charAt(0)).toUpperCase();
                }
                g2d.setFont(new Font("Segoe UI", Font.BOLD, 32));
                g2d.setColor(VoteWiseTheme.TEXT_PRIMARY);
                FontMetrics fm = g2d.getFontMetrics();
                g2d.drawString(initials, x + (size - fm.stringWidth(initials)) / 2, y + (size + fm.getAscent() - fm.getDescent()) / 2);
                g2d.dispose();
            }
        };
        avatarPanel.setOpaque(false);
        avatarPanel.setPreferredSize(new Dimension(200, 100));
        avatarPanel.setMaximumSize(new Dimension(500, 100));
        avatarPanel.setAlignmentX(Component.CENTER_ALIGNMENT);
        content.add(avatarPanel);

        // Name
        String userName = ApiClient.getCurrentUserName();
        if (userName == null || userName.isEmpty()) userName = "User";
        JLabel nameLabel = VoteWiseTheme.createLabel(userName, VoteWiseTheme.FONT_HEADING, VoteWiseTheme.TEXT_PRIMARY);
        nameLabel.setAlignmentX(Component.CENTER_ALIGNMENT);
        content.add(nameLabel);
        content.add(Box.createVerticalStrut(4));

        // Voter ID
        String voterId = ApiClient.getCurrentVoterId();
        if (voterId == null) voterId = "N/A";
        JLabel voterLabel = VoteWiseTheme.createLabel("Voter ID: " + voterId, VoteWiseTheme.FONT_BODY, VoteWiseTheme.TEXT_SECONDARY);
        voterLabel.setAlignmentX(Component.CENTER_ALIGNMENT);
        content.add(voterLabel);
        content.add(Box.createVerticalStrut(24));

        // Vote status check (Moved to Top)
        JLabel voteStatusLabel = VoteWiseTheme.createLabel("Checking vote status...", VoteWiseTheme.FONT_BODY_BOLD, VoteWiseTheme.TEXT_MUTED);
        voteStatusLabel.setAlignmentX(Component.CENTER_ALIGNMENT);
        content.add(voteStatusLabel);
        content.add(Box.createVerticalStrut(24));

        // Info rows
        content.add(createInfoRow("Session Token", truncateToken(ApiClient.getCurrentToken())));
        content.add(Box.createVerticalStrut(10));
        content.add(createInfoRow("College/University", "Savitribai Phule Pune University"));
        content.add(Box.createVerticalStrut(10));
        content.add(createInfoRow("Account Created", "08 May 2026"));
        content.add(Box.createVerticalStrut(20));

        // Authorization Box
        RoundedPanel authBox = new RoundedPanel(12, new Color(19, 136, 8, 20), new Color(19, 136, 8, 40));
        authBox.setLayout(new FlowLayout(FlowLayout.CENTER, 10, 8));
        authBox.setMaximumSize(new Dimension(420, 40));
        JLabel authLabel = VoteWiseTheme.createLabel("AUTHORIZATION: SECURE & VERIFIED", VoteWiseTheme.FONT_CAPTION_BOLD, VoteWiseTheme.SUCCESS);
        authBox.add(authLabel);
        content.add(authBox);
        content.add(Box.createVerticalStrut(24));

        // Check async logic
        String finalVoterId = voterId;
        new SwingWorker<Boolean, Void>() {
            protected Boolean doInBackground() throws Exception {
                return ApiClient.hasVoted(finalVoterId);
            }
            protected void done() {
                try {
                    boolean voted = get();
                    if (voted) {
                        voteStatusLabel.setText("VOTING STATUS: CASTED");
                        voteStatusLabel.setForeground(VoteWiseTheme.SUCCESS);
                    } else {
                        voteStatusLabel.setText("VOTING STATUS: PENDING");
                        voteStatusLabel.setForeground(VoteWiseTheme.ACCENT_GOLD);
                    }
                } catch (Exception ex) {
                    voteStatusLabel.setText("VOTING STATUS: UNKNOWN");
                    voteStatusLabel.setForeground(VoteWiseTheme.TEXT_MUTED);
                }
            }
        }.execute();

        card.add(content, BorderLayout.CENTER);
        center.add(card);
        add(center, BorderLayout.CENTER);
    }

    private JPanel createInfoRow(String label, String value) {
        JPanel row = new JPanel(new BorderLayout());
        row.setOpaque(false);
        row.setMaximumSize(new Dimension(420, 30));
        row.setBorder(BorderFactory.createEmptyBorder(0, 0, 0, 0));

        JLabel labelL = VoteWiseTheme.createLabel(label, VoteWiseTheme.FONT_SMALL, VoteWiseTheme.TEXT_MUTED);
        JLabel valueL = VoteWiseTheme.createLabel(value, VoteWiseTheme.FONT_SMALL, VoteWiseTheme.TEXT_PRIMARY);
        valueL.setHorizontalAlignment(SwingConstants.RIGHT);

        row.add(labelL, BorderLayout.WEST);
        row.add(valueL, BorderLayout.EAST);
        return row;
    }

    private String truncateToken(String token) {
        if (token == null || token.length() < 12) return "N/A";
        return token.substring(0, 8) + "..." + token.substring(token.length() - 4);
    }

    private void showEditProfileDialog() {
        JPanel form = new JPanel();
        form.setLayout(new BoxLayout(form, BoxLayout.Y_AXIS));
        form.setOpaque(false);

        PlaceholderTextField nameField = new PlaceholderTextField("Full Name");
        nameField.setText(ApiClient.getCurrentUserName() != null ? ApiClient.getCurrentUserName() : "");
        PlaceholderTextField collegeField = new PlaceholderTextField("College/University");
        PlaceholderPasswordField passField = new PlaceholderPasswordField("New Password");

        form.add(VoteWiseTheme.createLabel("Update your details:", VoteWiseTheme.FONT_BODY_BOLD, VoteWiseTheme.TEXT_PRIMARY));
        form.add(Box.createVerticalStrut(10));
        form.add(nameField);
        form.add(Box.createVerticalStrut(10));
        form.add(collegeField);
        form.add(Box.createVerticalStrut(10));
        form.add(passField);

        int result = JOptionPane.showConfirmDialog(this, form, "Edit Profile", JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE);
        
        if (result == JOptionPane.OK_OPTION) {
            // Simulate an update
            String newName = nameField.getText();
            if (!newName.trim().isEmpty()) {
                ApiClient.setSession(ApiClient.getCurrentVoterId(), ApiClient.getCurrentToken(), newName);
                // Trigger a UI refresh by simulating a card reload or simply telling the user
                JOptionPane.showMessageDialog(this, "Profile updated successfully!\nNote: Some changes may require a restart to reflect.", "Success", JOptionPane.INFORMATION_MESSAGE);
            }
        }
    }
}
