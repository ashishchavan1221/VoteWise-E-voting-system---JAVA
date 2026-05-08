package com.votewise.ui;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.geom.RoundRectangle2D;

/**
 * Beautiful animated button with hover effects, gradient backgrounds,
 * and glow animations. Core interactive element of VoteWise UI.
 */
public class AnimatedButton extends JButton {

    private Color gradientStart;
    private Color gradientEnd;
    private boolean isHovered = false;
    private boolean isPressed = false;
    private float hoverProgress = 0f;
    private Timer hoverTimer;
    private int cornerRadius = 12;

    public AnimatedButton(String text) {
        this(text, VoteWiseTheme.ACCENT_BLUE, VoteWiseTheme.ACCENT_PURPLE);
    }

    public AnimatedButton(String text, Color gradientStart, Color gradientEnd) {
        super(text);
        this.gradientStart = gradientStart;
        this.gradientEnd = gradientEnd;
        setContentAreaFilled(false);
        setBorderPainted(false);
        setFocusPainted(false);
        setForeground(Color.WHITE);
        setFont(VoteWiseTheme.FONT_BUTTON);
        setCursor(new Cursor(Cursor.HAND_CURSOR));
        setPreferredSize(new Dimension(200, VoteWiseTheme.BUTTON_HEIGHT));

        hoverTimer = new Timer(16, e -> {
            if (isHovered && hoverProgress < 1f) {
                hoverProgress = Math.min(1f, hoverProgress + 0.1f);
                repaint();
            } else if (!isHovered && hoverProgress > 0f) {
                hoverProgress = Math.max(0f, hoverProgress - 0.1f);
                repaint();
            }
        });
        hoverTimer.start();

        addMouseListener(new MouseAdapter() {
            public void mouseEntered(MouseEvent e) { isHovered = true; }
            public void mouseExited(MouseEvent e) { isHovered = false; isPressed = false; }
            public void mousePressed(MouseEvent e) { isPressed = true; repaint(); }
            public void mouseReleased(MouseEvent e) { isPressed = false; repaint(); }
        });
    }

    @Override
    protected void paintComponent(Graphics g) {
        Graphics2D g2d = (Graphics2D) g.create();
        VoteWiseTheme.enableAntiAliasing(g2d);
        int w = getWidth(), h = getHeight();
        float f = 1f + hoverProgress * 0.2f;
        Color start = brighten(gradientStart, f);
        Color end = brighten(gradientEnd, f);
        RoundRectangle2D rect = new RoundRectangle2D.Float(0, 0, w, h, cornerRadius, cornerRadius);

        // Glow shadow on hover
        if (hoverProgress > 0) {
            int s = (int)(6 + hoverProgress * 8);
            for (int i = s; i > 0; i--) {
                float a = (float)i / s * 0.06f * hoverProgress;
                g2d.setColor(new Color(start.getRed(), start.getGreen(), start.getBlue(), (int)(a*255)));
                g2d.fill(new RoundRectangle2D.Float(-i, -i+2, w+i*2, h+i*2, cornerRadius+i, cornerRadius+i));
            }
        }

        g2d.setPaint(new GradientPaint(0, 0, start, w, 0, end));
        g2d.fill(rect);
        if (isPressed) { g2d.setColor(new Color(0,0,0,60)); g2d.fill(rect); }

        // Top shine
        g2d.setPaint(new GradientPaint(0, 0, new Color(255,255,255,40+(int)(hoverProgress*20)), 0, h/2, new Color(255,255,255,0)));
        g2d.fill(rect);

        g2d.setFont(getFont());
        g2d.setColor(getForeground());
        FontMetrics fm = g2d.getFontMetrics();
        g2d.drawString(getText(), (w - fm.stringWidth(getText())) / 2, (h - fm.getHeight()) / 2 + fm.getAscent());
        g2d.dispose();
    }

    private Color brighten(Color c, float f) {
        return new Color(Math.min(255,(int)(c.getRed()*f)), Math.min(255,(int)(c.getGreen()*f)), Math.min(255,(int)(c.getBlue()*f)));
    }
}
