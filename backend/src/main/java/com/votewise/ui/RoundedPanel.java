package com.votewise.ui;

import javax.swing.*;
import java.awt.*;
import java.awt.geom.RoundRectangle2D;

/**
 * Custom JPanel with rounded corners and optional gradient/glass background.
 * Used throughout the VoteWise UI for card-like containers.
 */
public class RoundedPanel extends JPanel {

    private int cornerRadius;
    private Color backgroundColor;
    private Color borderColor;
    private boolean isGlass;
    private float glassOpacity;

    public RoundedPanel(int cornerRadius) {
        this(cornerRadius, VoteWiseTheme.CARD_BG, VoteWiseTheme.CARD_BORDER);
    }

    public RoundedPanel(int cornerRadius, Color backgroundColor, Color borderColor) {
        this.cornerRadius = cornerRadius;
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor;
        this.isGlass = false;
        this.glassOpacity = 0.12f;
        setOpaque(false);
        setLayout(new BorderLayout());
    }

    public void setGlass(boolean glass) {
        this.isGlass = glass;
        repaint();
    }

    public void setGlassOpacity(float opacity) {
        this.glassOpacity = opacity;
        repaint();
    }

    public void setBackgroundColor(Color color) {
        this.backgroundColor = color;
        repaint();
    }

    public void setBorderColor(Color color) {
        this.borderColor = color;
        repaint();
    }

    @Override
    protected void paintComponent(Graphics g) {
        Graphics2D g2d = (Graphics2D) g.create();
        VoteWiseTheme.enableAntiAliasing(g2d);

        int w = getWidth();
        int h = getHeight();

        RoundRectangle2D roundedRect = new RoundRectangle2D.Float(
                1, 1, w - 2, h - 2, cornerRadius, cornerRadius);

        // Fill background
        if (isGlass) {
            // Glassmorphism effect
            g2d.setColor(new Color(
                    backgroundColor.getRed(),
                    backgroundColor.getGreen(),
                    backgroundColor.getBlue(),
                    (int) (glassOpacity * 255)));
            g2d.fill(roundedRect);

            // Top highlight for glass effect
            GradientPaint highlight = new GradientPaint(
                    0, 0,
                    new Color(255, 255, 255, 25),
                    0, h / 2,
                    new Color(255, 255, 255, 0));
            g2d.setPaint(highlight);
            g2d.fill(roundedRect);
        } else {
            g2d.setColor(backgroundColor);
            g2d.fill(roundedRect);
        }

        // Draw border
        if (borderColor != null) {
            g2d.setColor(borderColor);
            g2d.setStroke(new BasicStroke(1.2f));
            g2d.draw(roundedRect);
        }

        g2d.dispose();
        super.paintComponent(g);
    }
}
