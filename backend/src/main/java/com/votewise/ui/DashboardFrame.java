package com.votewise.ui;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.geom.RoundRectangle2D;

/**
 * Main Dashboard Frame with sidebar navigation and content panels.
 * Routes to: VotingPanel, ResultsPanel, ProfilePanel.
 */
public class DashboardFrame extends JFrame {

    private JPanel contentArea;
    private CardLayout cardLayout;
    private JLabel[] navLabels;
    private JPanel[] navItems;
    private int activeIndex = 0;
    private String[] navNames;
    private String[] cardNames;
    private boolean isAdmin;

    public DashboardFrame(boolean isAdmin) {
        this.isAdmin = isAdmin;
        if (isAdmin) {
            navNames = new String[]{"Live Results", "Admin Stats"};
            cardNames = new String[]{"results", "admin"};
        } else {
            navNames = new String[]{"Cast Vote", "Profile"};
            cardNames = new String[]{"vote", "profile"};
        }
        
        setTitle("VoteWise — " + (isAdmin ? "Admin Console" : "Dashboard"));
        setSize(1200, 780);
        setMinimumSize(new Dimension(1000, 700));
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        JPanel mainPanel = new JPanel(new BorderLayout());
        mainPanel.setBackground(VoteWiseTheme.BG_DARK_1);

        // ─── Sidebar ───
        JPanel sidebar = createSidebar();

        // ─── Content Area ───
        cardLayout = new CardLayout();
        contentArea = new JPanel(cardLayout) {
            private Image bgImage;
            {
                try {
                    bgImage = new ImageIcon("bg.jpg").getImage();
                    if (bgImage.getWidth(null) == -1) {
                        bgImage = new ImageIcon("../bg.jpg").getImage();
                    }
                    if (bgImage.getWidth(null) == -1) bgImage = null;
                } catch (Exception e) {}
            }
            @Override
            protected void paintComponent(Graphics g) {
                Graphics2D g2d = (Graphics2D) g.create();
                VoteWiseTheme.enableAntiAliasing(g2d);
                int w = getWidth();
                int h = getHeight();
                if (bgImage != null) {
                    g2d.drawImage(bgImage, 0, 0, w, h, this);
                    g2d.setColor(new Color(255, 255, 255, 180)); 
                    g2d.fillRect(0, 0, w, h);
                } else {
                    int stripeH = h / 3;
                    g2d.setPaint(new GradientPaint(0, 0, new Color(255, 153, 51, 160), 0, stripeH, new Color(255, 153, 51, 80)));
                    g2d.fillRect(0, 0, w, stripeH);
                    g2d.setPaint(new GradientPaint(0, stripeH, new Color(255, 255, 255, 180), 0, stripeH * 2, new Color(255, 255, 255, 180)));
                    g2d.fillRect(0, stripeH, w, stripeH);
                    g2d.setPaint(new GradientPaint(0, stripeH * 2, new Color(19, 136, 8, 80), 0, h, new Color(19, 136, 8, 160)));
                    g2d.fillRect(0, stripeH * 2, w, h - stripeH * 2);

                    // Removed dark orb for a cleaner light theme

                    g2d.setColor(new Color(255, 255, 255, 140));
                    g2d.fillRect(0, 0, w, h);
                }
                g2d.dispose();
                super.paintComponent(g);
            }
        };
        contentArea.setOpaque(false);

        // Add panels based on role
        if (isAdmin) {
            contentArea.add(new ResultsPanel(true), "results"); // isAdmin = true for auto-refresh
            contentArea.add(new AdminPanel(), "admin");
        } else {
            contentArea.add(new VotingPanel(), "vote");
            contentArea.add(new ProfilePanel(), "profile");
        }

        mainPanel.add(sidebar, BorderLayout.WEST);
        mainPanel.add(contentArea, BorderLayout.CENTER);
        setContentPane(mainPanel);
    }

    private JPanel createSidebar() {
        JPanel sidebar = new JPanel() {
            @Override
            protected void paintComponent(Graphics g) {
                Graphics2D g2d = (Graphics2D) g.create();
                VoteWiseTheme.enableAntiAliasing(g2d);
                g2d.setColor(VoteWiseTheme.SIDEBAR_BG);
                g2d.fillRect(0, 0, getWidth(), getHeight());
                // Right border glow
                g2d.setPaint(new GradientPaint(getWidth() - 2, 0, new Color(66, 135, 245, 40), getWidth(), 0, new Color(66, 135, 245, 0)));
                g2d.fillRect(getWidth() - 2, 0, 2, getHeight());
                g2d.dispose();
            }
        };
        sidebar.setPreferredSize(new Dimension(VoteWiseTheme.SIDEBAR_WIDTH, 0));
        sidebar.setLayout(new BoxLayout(sidebar, BoxLayout.Y_AXIS));
        sidebar.setBorder(BorderFactory.createEmptyBorder(0, 0, 0, 0));

        // Logo area
        JPanel logoPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 8, 0));
        logoPanel.setOpaque(false);
        logoPanel.setBorder(BorderFactory.createEmptyBorder(28, 16, 28, 16));
        logoPanel.setMaximumSize(new Dimension(VoteWiseTheme.SIDEBAR_WIDTH, 90));
        JLabel logoIcon = new JLabel("V"); // Replaced emoji with letter V
        logoIcon.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 28));
        JLabel logoText = VoteWiseTheme.createLabel("VoteWise", new Font("Segoe UI", Font.BOLD, 22), VoteWiseTheme.TEXT_PRIMARY);
        logoPanel.add(logoIcon);
        logoPanel.add(logoText);
        sidebar.add(logoPanel);

        // Separator
        sidebar.add(createSeparator());
        sidebar.add(Box.createVerticalStrut(12));

        // User greeting
        String userName = ApiClient.getCurrentUserName();
        if (userName == null || userName.isEmpty()) userName = "User";
        JLabel greetLabel = VoteWiseTheme.createLabel("  Hello, " + userName + "!", VoteWiseTheme.FONT_BODY, VoteWiseTheme.TEXT_SECONDARY);
        greetLabel.setBorder(BorderFactory.createEmptyBorder(0, 20, 0, 0));
        greetLabel.setMaximumSize(new Dimension(VoteWiseTheme.SIDEBAR_WIDTH, 30));
        greetLabel.setAlignmentX(Component.LEFT_ALIGNMENT);
        sidebar.add(greetLabel);
        sidebar.add(Box.createVerticalStrut(20));

        // Navigation section label
        JLabel navSection = VoteWiseTheme.createLabel("  NAVIGATION", VoteWiseTheme.FONT_CAPTION, VoteWiseTheme.TEXT_MUTED);
        navSection.setBorder(BorderFactory.createEmptyBorder(0, 20, 8, 0));
        navSection.setMaximumSize(new Dimension(VoteWiseTheme.SIDEBAR_WIDTH, 25));
        sidebar.add(navSection);

        // Nav items
        navItems = new JPanel[navNames.length];
        navLabels = new JLabel[navNames.length];
        for (int i = 0; i < navNames.length; i++) {
            navItems[i] = createNavItem(navNames[i], i);
            sidebar.add(navItems[i]);
            sidebar.add(Box.createVerticalStrut(4));
        }
        updateNavHighlight(0);

        sidebar.add(Box.createVerticalGlue());

        // Logout button at bottom
        sidebar.add(createSeparator());
        sidebar.add(Box.createVerticalStrut(8));

        AnimatedButton logoutBtn = new AnimatedButton("Logout", VoteWiseTheme.ACCENT_PINK, new Color(180, 50, 70));
        logoutBtn.setMaximumSize(new Dimension(VoteWiseTheme.SIDEBAR_WIDTH - 32, 42));
        logoutBtn.setAlignmentX(Component.CENTER_ALIGNMENT);
        logoutBtn.addActionListener(e -> {
            int confirm = JOptionPane.showConfirmDialog(this, "Are you sure you want to logout?", "Logout", JOptionPane.YES_NO_OPTION);
            if (confirm == JOptionPane.YES_OPTION) {
                ApiClient.clearSession();
                dispose();
                new LoginFrame().setVisible(true);
            }
        });
        sidebar.add(logoutBtn);
        sidebar.add(Box.createVerticalStrut(16));

        // Version
        JLabel version = VoteWiseTheme.createLabel("  VoteWise v2.0", VoteWiseTheme.FONT_CAPTION, VoteWiseTheme.TEXT_MUTED);
        version.setAlignmentX(Component.CENTER_ALIGNMENT);
        sidebar.add(version);
        sidebar.add(Box.createVerticalStrut(12));

        return sidebar;
    }

    private JPanel createNavItem(String text, int index) {
        JPanel item = new JPanel(new BorderLayout()) {
            @Override
            protected void paintComponent(Graphics g) {
                Graphics2D g2d = (Graphics2D) g.create();
                VoteWiseTheme.enableAntiAliasing(g2d);
                if (activeIndex == index) {
                    g2d.setColor(VoteWiseTheme.SIDEBAR_ACTIVE);
                    g2d.fillRoundRect(8, 0, getWidth() - 16, getHeight(), 10, 10);
                    // Left accent bar
                    g2d.setPaint(VoteWiseTheme.getBlueGradient(0, 0, 4));
                    g2d.fillRoundRect(8, 4, 4, getHeight() - 8, 4, 4);
                }
                g2d.dispose();
                super.paintComponent(g);
            }
        };
        item.setOpaque(false);
        item.setMaximumSize(new Dimension(VoteWiseTheme.SIDEBAR_WIDTH, 46));
        item.setCursor(new Cursor(Cursor.HAND_CURSOR));
        item.setBorder(BorderFactory.createEmptyBorder(0, 24, 0, 16));

        JLabel label = VoteWiseTheme.createLabel(text, VoteWiseTheme.FONT_BODY, VoteWiseTheme.TEXT_SECONDARY);
        navLabels[index] = label;
        item.add(label, BorderLayout.CENTER);

        item.addMouseListener(new MouseAdapter() {
            public void mouseClicked(MouseEvent e) {
                activeIndex = index;
                updateNavHighlight(index);
                cardLayout.show(contentArea, cardNames[index]);
            }
            public void mouseEntered(MouseEvent e) {
                if (activeIndex != index) item.setBackground(VoteWiseTheme.SIDEBAR_HOVER);
                item.repaint();
            }
            public void mouseExited(MouseEvent e) {
                item.repaint();
            }
        });
        return item;
    }

    private void updateNavHighlight(int active) {
        for (int i = 0; i < navLabels.length; i++) {
            if (i == active) {
                navLabels[i].setForeground(VoteWiseTheme.TEXT_PRIMARY);
                navLabels[i].setFont(VoteWiseTheme.FONT_BODY_BOLD);
            } else {
                navLabels[i].setForeground(VoteWiseTheme.TEXT_SECONDARY);
                navLabels[i].setFont(VoteWiseTheme.FONT_BODY);
            }
        }
        for (JPanel p : navItems) p.repaint();
    }

    private JPanel createSeparator() {
        JPanel sep = new JPanel() {
            protected void paintComponent(Graphics g) {
                g.setColor(new Color(255, 255, 255, 15));
                g.fillRect(16, getHeight() / 2, getWidth() - 32, 1);
            }
        };
        sep.setOpaque(false);
        sep.setMaximumSize(new Dimension(VoteWiseTheme.SIDEBAR_WIDTH, 8));
        sep.setPreferredSize(new Dimension(VoteWiseTheme.SIDEBAR_WIDTH, 8));
        return sep;
    }
}
