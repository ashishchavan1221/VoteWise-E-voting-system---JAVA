package com.votewise.ui;

import javax.swing.*;
import java.awt.*;
import java.awt.geom.RoundRectangle2D;
import org.json.JSONObject;

public class LoginFrame extends JFrame {

    private PlaceholderTextField voterIdField;
    private PlaceholderPasswordField passwordField;
    private PlaceholderTextField captchaField;
    private JLabel captchaLabel;
    private JLabel statusLabel;
    private String currentCaptchaId = "";
    private String currentCaptchaText = "";
    
    private boolean isAdminMode = false;
    private JPanel captchaPanel;
    private JPanel regPanel;
    private AnimatedButton voterRoleBtn;
    private AnimatedButton adminRoleBtn;
    private JLabel title;
    private JLabel subtitle;

    public LoginFrame() {
        setTitle("VoteWise — Secure Login");
        setSize(1100, 700);
        setMinimumSize(new Dimension(900, 650));
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        GradientPanel bgPanel = new GradientPanel();
        bgPanel.setDrawGrid(true);
        bgPanel.setLayout(new GridBagLayout());

        RoundedPanel card = new RoundedPanel(24, VoteWiseTheme.CARD_BG, VoteWiseTheme.CARD_BORDER);
        card.setGlass(true);
        card.setGlassOpacity(0.4f);
        card.setPreferredSize(new Dimension(460, 620));
        card.setLayout(new BorderLayout());
        card.setBorder(VoteWiseTheme.createPadding(36));

        JPanel content = new JPanel();
        content.setOpaque(false);
        content.setLayout(new BoxLayout(content, BoxLayout.Y_AXIS));

        JPanel iconPanel = new JPanel() {
            @Override
            protected void paintComponent(Graphics g) {
                super.paintComponent(g);
                Graphics2D g2d = (Graphics2D) g.create();
                VoteWiseTheme.enableAntiAliasing(g2d);
                int size = 50;
                int x = (getWidth() - size) / 2;
                int y = (getHeight() - size) / 2;
                
                // Draw a simple, modern ballot box icon
                g2d.setColor(VoteWiseTheme.ACCENT_BLUE);
                g2d.setStroke(new BasicStroke(3f));
                g2d.drawRoundRect(x, y + 15, size, size - 15, 8, 8);
                
                g2d.setColor(VoteWiseTheme.ACCENT_PURPLE);
                int[] px = {x + 10, x + size - 10, x + size + 5, x - 5};
                int[] py = {y + 15, y + 15, y + 5, y + 5};
                g2d.fillPolygon(px, py, 4);
                
                g2d.dispose();
            }
        };
        iconPanel.setOpaque(false);
        iconPanel.setPreferredSize(new Dimension(80, 80));
        iconPanel.setMaximumSize(new Dimension(80, 80));
        iconPanel.setAlignmentX(Component.CENTER_ALIGNMENT);

        title = VoteWiseTheme.createLabel("Welcome Back", VoteWiseTheme.FONT_HEADING, VoteWiseTheme.TEXT_PRIMARY);
        title.setAlignmentX(Component.CENTER_ALIGNMENT);

        subtitle = VoteWiseTheme.createLabel("Sign in to cast your vote securely", VoteWiseTheme.FONT_SMALL, VoteWiseTheme.TEXT_SECONDARY);
        subtitle.setAlignmentX(Component.CENTER_ALIGNMENT);

        // Role Selector
        JPanel rolePanel = new JPanel(new GridLayout(1, 2, 10, 0));
        rolePanel.setOpaque(false);
        rolePanel.setMaximumSize(new Dimension(380, 45));
        
        voterRoleBtn = new AnimatedButton("Voter", VoteWiseTheme.ACCENT_BLUE, VoteWiseTheme.ACCENT_CYAN);
        adminRoleBtn = new AnimatedButton("Admin", new Color(180, 180, 190), new Color(150, 150, 160));
        
        voterRoleBtn.addActionListener(e -> setMode(false));
        adminRoleBtn.addActionListener(e -> setMode(true));
        
        rolePanel.add(voterRoleBtn);
        rolePanel.add(adminRoleBtn);

        voterIdField = new PlaceholderTextField("Voter ID");
        passwordField = new PlaceholderPasswordField("Password");
        captchaField = new PlaceholderTextField("Enter CAPTCHA");

        voterIdField.setMaximumSize(new Dimension(380, 45));
        passwordField.setMaximumSize(new Dimension(380, 45));
        captchaField.setMaximumSize(new Dimension(380, 45));

        captchaPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 10, 0));
        captchaPanel.setOpaque(false);
        captchaPanel.setMaximumSize(new Dimension(380, 50));

        captchaLabel = new JLabel("Loading...");
        captchaLabel.setFont(new Font("Consolas", Font.BOLD, 22));
        captchaLabel.setForeground(VoteWiseTheme.ACCENT_GOLD);
        captchaLabel.setPreferredSize(new Dimension(180, 40));
        captchaLabel.setHorizontalAlignment(SwingConstants.CENTER);
        captchaLabel.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(VoteWiseTheme.ACCENT_GOLD, 1, true),
                BorderFactory.createEmptyBorder(5, 10, 5, 10)));

        AnimatedButton refreshCaptcha = new AnimatedButton("R", VoteWiseTheme.ACCENT_GOLD, VoteWiseTheme.ACCENT_ORANGE);
        refreshCaptcha.setPreferredSize(new Dimension(50, 40));
        refreshCaptcha.setFont(new Font("Segoe UI", Font.BOLD, 18));
        refreshCaptcha.addActionListener(e -> loadCaptcha());

        captchaPanel.add(captchaLabel);
        captchaPanel.add(refreshCaptcha);

        AnimatedButton loginBtn = new AnimatedButton("Sign In", VoteWiseTheme.ACCENT_BLUE, VoteWiseTheme.ACCENT_PURPLE);
        loginBtn.setMaximumSize(new Dimension(380, 48));
        loginBtn.setAlignmentX(Component.CENTER_ALIGNMENT);
        loginBtn.addActionListener(e -> performLogin());

        statusLabel = new JLabel(" ");
        statusLabel.setFont(VoteWiseTheme.FONT_SMALL);
        statusLabel.setForeground(VoteWiseTheme.ERROR);
        statusLabel.setAlignmentX(Component.CENTER_ALIGNMENT);

        regPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 5, 0));
        regPanel.setOpaque(false);
        JLabel regText = VoteWiseTheme.createLabel("Don't have an account?", VoteWiseTheme.FONT_SMALL, VoteWiseTheme.TEXT_SECONDARY);
        JLabel regLink = VoteWiseTheme.createLabel("Register Now", VoteWiseTheme.FONT_BODY_BOLD, VoteWiseTheme.ACCENT_CYAN);
        regLink.setCursor(new Cursor(Cursor.HAND_CURSOR));
        regLink.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent e) {
                dispose();
                new RegisterFrame().setVisible(true);
            }
        });
        regPanel.add(regText);
        regPanel.add(regLink);

        content.add(iconPanel);
        content.add(Box.createVerticalStrut(8));
        content.add(title);
        content.add(Box.createVerticalStrut(4));
        content.add(subtitle);
        content.add(Box.createVerticalStrut(20));
        content.add(rolePanel);
        content.add(Box.createVerticalStrut(20));
        content.add(voterIdField);
        content.add(Box.createVerticalStrut(12));
        content.add(passwordField);
        content.add(Box.createVerticalStrut(16));
        content.add(captchaPanel);
        content.add(Box.createVerticalStrut(8));
        content.add(captchaField);
        content.add(Box.createVerticalStrut(8));
        content.add(statusLabel);
        content.add(Box.createVerticalStrut(16));
        content.add(loginBtn);
        content.add(Box.createVerticalStrut(16));
        content.add(regPanel);

        card.add(content, BorderLayout.CENTER);
        bgPanel.add(card);
        setContentPane(bgPanel);

        setMode(false); // Default to Voter
        loadCaptcha();
    }
    
    private void setMode(boolean admin) {
        this.isAdminMode = admin;
        if (admin) {
            title.setText("Admin Portal");
            subtitle.setText("Sign in to manage the election");
            voterIdField.setPlaceholder("Admin Username");
            captchaPanel.setVisible(false);
            captchaField.setVisible(false);
            regPanel.setVisible(false);
            // highlight admin button
            voterRoleBtn.setBackground(new Color(180, 180, 190));
            adminRoleBtn.setBackground(VoteWiseTheme.ACCENT_PINK);
        } else {
            title.setText("Welcome Back");
            subtitle.setText("Sign in to cast your vote securely");
            voterIdField.setPlaceholder("Voter ID");
            captchaPanel.setVisible(true);
            captchaField.setVisible(true);
            regPanel.setVisible(true);
            voterRoleBtn.setBackground(VoteWiseTheme.ACCENT_BLUE);
            adminRoleBtn.setBackground(new Color(180, 180, 190));
        }
        revalidate();
        repaint();
    }

    private void loadCaptcha() {
        if (isAdminMode) return;
        captchaLabel.setText("Loading...");
        new SwingWorker<JSONObject, Void>() {
            protected JSONObject doInBackground() throws Exception {
                return ApiClient.getCaptcha();
            }
            protected void done() {
                try {
                    JSONObject resp = get();
                    currentCaptchaId = resp.getString("captchaId");
                    currentCaptchaText = resp.getString("text");
                    captchaLabel.setText(currentCaptchaText);
                } catch (Exception ex) {
                    captchaLabel.setText("OFFLINE");
                }
            }
        }.execute();
    }

    private void performLogin() {
        String voterId = voterIdField.getText().trim();
        String password = new String(passwordField.getPassword()).trim();

        if (isAdminMode) {
            if (voterId.equals("admin") && password.equals("admin")) {
                statusLabel.setForeground(VoteWiseTheme.SUCCESS);
                statusLabel.setText("✓ Admin Login successful!");
                ApiClient.setSession("admin", "admin_token", "Administrator");
                Timer t = new Timer(800, ev -> {
                    dispose();
                    new DashboardFrame(true).setVisible(true);
                });
                t.setRepeats(false);
                t.start();
            } else {
                statusLabel.setForeground(VoteWiseTheme.ERROR);
                statusLabel.setText("✗ Invalid Admin credentials");
            }
            return;
        }

        // Voter Login
        String captchaAnswer = captchaField.getText().trim();
 
        if (voterId.isEmpty() || password.isEmpty() || captchaAnswer.isEmpty()) {
            statusLabel.setText("Please fill in all fields");
            return;
        }

        statusLabel.setForeground(VoteWiseTheme.ACCENT_BLUE);
        statusLabel.setText("Authenticating...");

        new SwingWorker<JSONObject, Void>() {
            protected JSONObject doInBackground() throws Exception {
                return ApiClient.login(voterId, "", password, currentCaptchaId, captchaAnswer);
            }
            protected void done() {
                try {
                    JSONObject resp = get();
                    if (resp.has("error")) {
                        statusLabel.setForeground(VoteWiseTheme.ERROR);
                        statusLabel.setText("✗ " + resp.getString("error"));
                        loadCaptcha();
                    } else {
                        String token = resp.optString("token", "");
                        String name = resp.optString("name", voterId);
                        ApiClient.setSession(voterId, token, name);
                        statusLabel.setForeground(VoteWiseTheme.SUCCESS);
                        statusLabel.setText("✓ Login successful! Redirecting...");
                        Timer t = new Timer(800, ev -> {
                            dispose();
                            new DashboardFrame(false).setVisible(true);
                        });
                        t.setRepeats(false);
                        t.start();
                    }
                } catch (Exception ex) {
                    statusLabel.setForeground(VoteWiseTheme.ERROR);
                    statusLabel.setText("✗ Connection error.");
                }
            }
        }.execute();
    }
}
