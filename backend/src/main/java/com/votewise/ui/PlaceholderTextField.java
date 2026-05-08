package com.votewise.ui;

import javax.swing.*;
import java.awt.*;
import java.awt.event.FocusAdapter;
import java.awt.event.FocusEvent;

/**
 * Styled text field with placeholder text, rounded borders, and focus glow.
 */
public class PlaceholderTextField extends JTextField {

    private String placeholder;
    private boolean showingPlaceholder = true;
    private Color borderColor = VoteWiseTheme.INPUT_BORDER;
    private Color focusBorderColor = VoteWiseTheme.INPUT_FOCUS;
    private boolean isFocused = false;

    public PlaceholderTextField(String placeholder) {
        this(placeholder, 20);
    }

    public PlaceholderTextField(String placeholder, int columns) {
        super(columns);
        this.placeholder = placeholder;
        setFont(VoteWiseTheme.FONT_BODY);
        setForeground(VoteWiseTheme.TEXT_PRIMARY);
        setCaretColor(VoteWiseTheme.TEXT_PRIMARY);
        setBackground(new Color(0, 0, 0, 0));
        setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createEmptyBorder(2, 2, 2, 2),
                BorderFactory.createEmptyBorder(8, 14, 8, 14)));
        setPreferredSize(new Dimension(300, VoteWiseTheme.FIELD_HEIGHT));
        setOpaque(false);

        addFocusListener(new FocusAdapter() {
            @Override
            public void focusGained(FocusEvent e) {
                isFocused = true;
                repaint();
            }
            @Override
            public void focusLost(FocusEvent e) {
                isFocused = false;
                repaint();
            }
        });
    }

    @Override
    protected void paintComponent(Graphics g) {
        Graphics2D g2d = (Graphics2D) g.create();
        VoteWiseTheme.enableAntiAliasing(g2d);

        int w = getWidth(), h = getHeight();
        int radius = 10;

        // Background
        g2d.setColor(VoteWiseTheme.INPUT_BG);
        g2d.fillRoundRect(1, 1, w - 2, h - 2, radius, radius);

        // Border with focus glow
        if (isFocused) {
            // Glow effect
            for (int i = 4; i > 0; i--) {
                g2d.setColor(new Color(focusBorderColor.getRed(), focusBorderColor.getGreen(),
                        focusBorderColor.getBlue(), 20 * (5 - i)));
                g2d.setStroke(new BasicStroke(i));
                g2d.drawRoundRect(1, 1, w - 2, h - 2, radius, radius);
            }
            g2d.setColor(focusBorderColor);
        } else {
            g2d.setColor(borderColor);
        }
        g2d.setStroke(new BasicStroke(1.5f));
        g2d.drawRoundRect(1, 1, w - 3, h - 3, radius, radius);

        g2d.dispose();
        super.paintComponent(g);

        // Draw placeholder
        if (getText().isEmpty()) {
            Graphics2D pg = (Graphics2D) g.create();
            VoteWiseTheme.enableAntiAliasing(pg);
            pg.setColor(VoteWiseTheme.TEXT_MUTED);
            pg.setFont(getFont().deriveFont(Font.ITALIC));
            FontMetrics fm = pg.getFontMetrics();
            pg.drawString(placeholder, 16, (h - fm.getHeight()) / 2 + fm.getAscent());
            pg.dispose();
        }
    }

    public String getPlaceholder() { return placeholder; }
    public void setPlaceholder(String placeholder) {
        this.placeholder = placeholder;
        repaint();
    }
}
