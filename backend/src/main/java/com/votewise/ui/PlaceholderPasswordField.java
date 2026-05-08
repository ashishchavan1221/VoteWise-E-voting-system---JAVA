package com.votewise.ui;

import javax.swing.*;
import java.awt.*;
import java.awt.event.FocusAdapter;
import java.awt.event.FocusEvent;

/**
 * Styled password field with placeholder, rounded borders, focus glow, and show/hide toggle.
 */
public class PlaceholderPasswordField extends JPasswordField {

    private String placeholder;
    private boolean isFocused = false;

    public PlaceholderPasswordField(String placeholder) {
        super(20);
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
        setEchoChar('●');

        addFocusListener(new FocusAdapter() {
            public void focusGained(FocusEvent e) { isFocused = true; repaint(); }
            public void focusLost(FocusEvent e) { isFocused = false; repaint(); }
        });
    }

    @Override
    protected void paintComponent(Graphics g) {
        Graphics2D g2d = (Graphics2D) g.create();
        VoteWiseTheme.enableAntiAliasing(g2d);
        int w = getWidth(), h = getHeight(), radius = 10;

        g2d.setColor(VoteWiseTheme.INPUT_BG);
        g2d.fillRoundRect(1, 1, w - 2, h - 2, radius, radius);

        if (isFocused) {
            for (int i = 4; i > 0; i--) {
                g2d.setColor(new Color(VoteWiseTheme.INPUT_FOCUS.getRed(), 
                                       VoteWiseTheme.INPUT_FOCUS.getGreen(),
                                       VoteWiseTheme.INPUT_FOCUS.getBlue(), 
                                       20 * (5 - i)));
                g2d.setStroke(new BasicStroke(i));
                g2d.drawRoundRect(1, 1, w - 2, h - 2, radius, radius);
            }
            g2d.setColor(VoteWiseTheme.INPUT_FOCUS);
        } else {
            g2d.setColor(VoteWiseTheme.INPUT_BORDER);
        }
        g2d.setStroke(new BasicStroke(1.5f));
        g2d.drawRoundRect(1, 1, w - 3, h - 3, radius, radius);
        g2d.dispose();

        super.paintComponent(g);

        if (getPassword().length == 0) {
            Graphics2D pg = (Graphics2D) g.create();
            VoteWiseTheme.enableAntiAliasing(pg);
            pg.setColor(VoteWiseTheme.TEXT_MUTED);
            pg.setFont(getFont().deriveFont(Font.ITALIC));
            FontMetrics fm = pg.getFontMetrics();
            pg.drawString(placeholder, 16, (h - fm.getHeight()) / 2 + fm.getAscent());
            pg.dispose();
        }
    }
}
