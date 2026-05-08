package com.votewise.ui;

import javax.swing.*;
import java.awt.*;
import java.awt.geom.RoundRectangle2D;

/**
 * Animated Splash Screen with logo animation, particle effects, and loading bar.
 * Shows for 3 seconds before transitioning to the Login frame.
 */
public class SplashScreen extends JFrame {

    private float loadingProgress = 0f;
    private float logoOpacity = 0f;
    private float subtitleOpacity = 0f;
    private float particlePhase = 0f;
    private Timer animTimer;

    public SplashScreen() {
        setUndecorated(true);
        setSize(700, 450);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        // Make window rounded
        setShape(new RoundRectangle2D.Double(0, 0, 700, 450, 30, 30));

        JPanel mainPanel = new JPanel() {
            @Override
            protected void paintComponent(Graphics g) {
                Graphics2D g2d = (Graphics2D) g.create();
                VoteWiseTheme.enableAntiAliasing(g2d);
                int w = getWidth(), h = getHeight();

                // Background Image
                Image splashImg = null;
                try {
                    splashImg = new ImageIcon("splash.png").getImage();
                    if (splashImg.getWidth(null) == -1) {
                        splashImg = new ImageIcon("../splash.png").getImage();
                    }
                } catch (Exception e) {}

                if (splashImg != null && splashImg.getWidth(null) > 0) {
                    // Draw the image, scaling to fit the splash bounds
                    g2d.drawImage(splashImg, 0, 0, w, h, this);
                } else {
                    // Fallback background
                    g2d.setColor(Color.WHITE);
                    g2d.fillRect(0, 0, w, h);
                }

                // Loading bar at the bottom
                g2d.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, 1f));
                int barW = 400, barH = 6;
                int barX = (w - barW) / 2, barY = h - 25;
                
                // Track
                g2d.setColor(new Color(230, 230, 240));
                g2d.fillRoundRect(barX, barY, barW, barH, barH, barH);
                
                // Progress
                g2d.setPaint(new GradientPaint(barX, barY, VoteWiseTheme.ACCENT_BLUE, barX + (int)(barW * loadingProgress), barY, VoteWiseTheme.ACCENT_CYAN));
                g2d.fillRoundRect(barX, barY, (int)(barW * loadingProgress), barH, barH, barH);

                // Progress Text
                g2d.setFont(VoteWiseTheme.FONT_CAPTION);
                g2d.setColor(VoteWiseTheme.TEXT_SECONDARY);
                String progressText = "Loading system components... " + (int)(loadingProgress * 100) + "%";
                FontMetrics fm = g2d.getFontMetrics();
                g2d.drawString(progressText, (w - fm.stringWidth(progressText)) / 2, barY - 8);

                g2d.dispose();
            }
        };
        mainPanel.setPreferredSize(new Dimension(700, 450));
        setContentPane(mainPanel);

        // Animation timer
        animTimer = new Timer(30, e -> {
            loadingProgress = Math.min(1f, loadingProgress + 0.012f);
            logoOpacity = Math.min(1f, logoOpacity + 0.04f);
            if (logoOpacity > 0.5f) subtitleOpacity = Math.min(1f, subtitleOpacity + 0.04f);
            particlePhase += 0.03f;
            mainPanel.repaint();

            if (loadingProgress >= 1f) {
                animTimer.stop();
                Timer delay = new Timer(400, ev -> {
                    dispose();
                    SwingUtilities.invokeLater(() -> new LoginFrame().setVisible(true));
                });
                delay.setRepeats(false);
                delay.start();
            }
        });
    }

    private void drawVoteIcon(Graphics2D g2d, int cx, int cy) {
        g2d.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, logoOpacity * 0.8f));
        // Shield shape
        int[] xPoints = {cx, cx + 35, cx + 30, cx, cx - 30, cx - 35};
        int[] yPoints = {cy - 40, cy - 25, cy + 15, cy + 35, cy + 15, cy - 25};
        g2d.setPaint(new GradientPaint(cx - 35, cy - 40, new Color(66, 135, 245, 60), cx + 35, cy + 35, new Color(138, 79, 255, 60)));
        g2d.fillPolygon(xPoints, yPoints, 6);
        g2d.setColor(new Color(66, 135, 245, 120));
        g2d.setStroke(new BasicStroke(2f));
        g2d.drawPolygon(xPoints, yPoints, 6);
        // Checkmark inside
        g2d.setColor(VoteWiseTheme.ACCENT_CYAN);
        g2d.setStroke(new BasicStroke(3f, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));
        g2d.drawLine(cx - 12, cy, cx - 3, cy + 10);
        g2d.drawLine(cx - 3, cy + 10, cx + 14, cy - 10);
    }

    private void drawParticles(Graphics2D g2d, int w, int h) {
        for (int i = 0; i < 30; i++) {
            float x = (float)((Math.sin(particlePhase + i * 0.7) + 1) / 2 * w);
            float y = (float)((Math.cos(particlePhase * 0.5 + i * 1.1) + 1) / 2 * h);
            float size = 1.5f + (i % 3);
            float alpha = 0.1f + (i % 5) * 0.04f;
            g2d.setColor(new Color(150, 180, 255, (int)(alpha * 255)));
            g2d.fillOval((int)x, (int)y, (int)size * 2, (int)size * 2);
        }
    }

    public void showSplash() {
        setVisible(true);
        animTimer.start();
    }
}
