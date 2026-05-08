package com.votewise.ui;

import javax.swing.*;
import java.awt.*;

/**
 * JPanel with beautiful gradient backgrounds and animated particle effects.
 * Used as the main background panel for frames.
 */
public class GradientPanel extends JPanel {

    private boolean drawOrbs = false; // Disabled bubbles as requested
    private boolean drawGrid = false;
    private float animationPhase = 0f;
    private Timer animationTimer;
    private Image bgImage;

    public GradientPanel() {
        setOpaque(false);
        setLayout(new BorderLayout());

        try {
            bgImage = new ImageIcon("bg.jpg").getImage();
            if (bgImage.getWidth(null) == -1) bgImage = null; // Image doesn't exist yet
        } catch (Exception e) {}

        // Animate (only used if orbs are re-enabled)
        animationTimer = new Timer(50, e -> {
            animationPhase += 0.02f;
            if (animationPhase > 2 * Math.PI) animationPhase = 0;
            repaint();
        });
        animationTimer.start();
    }

    public void setDrawOrbs(boolean drawOrbs) {
        this.drawOrbs = drawOrbs;
    }

    public void setDrawGrid(boolean drawGrid) {
        this.drawGrid = drawGrid;
    }

    public void stopAnimation() {
        if (animationTimer != null) animationTimer.stop();
    }

    @Override
    protected void paintComponent(Graphics g) {
        Graphics2D g2d = (Graphics2D) g.create();
        VoteWiseTheme.enableAntiAliasing(g2d);

        int w = getWidth();
        int h = getHeight();

        // Main background
        if (bgImage != null) {
            // Draw custom image (scaled up from tiny version to create blur effect)
            g2d.drawImage(bgImage, 0, 0, w, h, this);
            // Light Frosted Glass Overlay
            g2d.setColor(new Color(255, 255, 255, 180)); 
            g2d.fillRect(0, 0, w, h);
        } else {
            // Native Abstract Blurry Indian Flag Background
            int stripeH = h / 3;
            // Soft Saffron
            g2d.setPaint(new GradientPaint(0, 0, new Color(255, 153, 51, 160), 0, stripeH, new Color(255, 153, 51, 80)));
            g2d.fillRect(0, 0, w, stripeH);
            // Soft White
            g2d.setPaint(new GradientPaint(0, stripeH, new Color(255, 255, 255, 180), 0, stripeH * 2, new Color(255, 255, 255, 180)));
            g2d.fillRect(0, stripeH, w, stripeH);
            // Soft Green
            g2d.setPaint(new GradientPaint(0, stripeH * 2, new Color(19, 136, 8, 80), 0, h, new Color(19, 136, 8, 160)));
            g2d.fillRect(0, stripeH * 2, w, h - stripeH * 2);

            // Removed dark orb for a cleaner light theme

            // Overall Light frosted glass overlay
            g2d.setColor(new Color(255, 255, 255, 140));
            g2d.fillRect(0, 0, w, h);
        }

        // Subtle grid pattern
        if (drawGrid) {
            g2d.setColor(new Color(0, 0, 0, 10)); // Darker grid for light theme
            g2d.setStroke(new BasicStroke(0.5f));
            for (int x = 0; x < w; x += 40) {
                g2d.drawLine(x, 0, x, h);
            }
            for (int y = 0; y < h; y += 40) {
                g2d.drawLine(0, y, w, y);
            }
        }

        g2d.dispose();
        super.paintComponent(g);
    }
}
