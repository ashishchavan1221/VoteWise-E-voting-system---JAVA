package com.votewise.ui;

import javax.swing.*;
import javax.swing.border.Border;
import java.awt.*;
import java.awt.geom.RoundRectangle2D;

/**
 * VoteWise Design System - Central theme configuration
 * Contains all colors, fonts, gradients, and reusable styling utilities
 */
public class VoteWiseTheme {

    // ═══════════════════════════════════════════════════════════
    // COLOR PALETTE
    // ═══════════════════════════════════════════════════════════

    // Primary Light Background Gradient
    public static final Color BG_DARK_1 = new Color(245, 248, 250);        // Soft off-white
    public static final Color BG_DARK_2 = new Color(250, 252, 255);        // Almost white
    public static final Color BG_DARK_3 = new Color(235, 240, 250);        // Very soft blue

    // Card & Surface Colors
    public static final Color CARD_BG = new Color(255, 255, 255, 190);     // Frosted glass white
    public static final Color CARD_BG_SOLID = new Color(255, 255, 255);    // Solid white
    public static final Color CARD_BORDER = new Color(200, 210, 225, 180); // Subtle gray border
    public static final Color CARD_HOVER = new Color(245, 248, 255, 220);  // Hover state

    // Accent Colors
    public static final Color ACCENT_BLUE = new Color(33, 118, 255);    // Vibrant blue
    public static final Color ACCENT_PURPLE = new Color(138, 79, 255);  // Vivid purple
    public static final Color ACCENT_PINK = new Color(233, 69, 96);     // Crimson pink
    public static final Color ACCENT_GOLD = new Color(245, 150, 0);     // Gold/Orange
    public static final Color ACCENT_GREEN = new Color(30, 190, 100);   // Success green
    public static final Color ACCENT_CYAN = new Color(0, 180, 190);     // Teal cyan
    public static final Color ACCENT_ORANGE = new Color(255, 120, 40);  // Warm orange

    // Text Colors
    public static final Color TEXT_PRIMARY = new Color(30, 35, 45);      // Very dark gray for readability
    public static final Color TEXT_SECONDARY = new Color(90, 100, 115);  // Muted gray
    public static final Color TEXT_MUTED = new Color(140, 150, 160);     // Light muted gray
    public static final Color TEXT_DARK = new Color(10, 15, 25);         // Almost black

    // Status Colors
    public static final Color SUCCESS = new Color(30, 190, 100);
    public static final Color WARNING = new Color(240, 150, 0);
    public static final Color ERROR = new Color(220, 50, 70);
    public static final Color INFO = new Color(33, 118, 255);

    // Input Fields
    public static final Color INPUT_BG = new Color(255, 255, 255, 230);
    public static final Color INPUT_BORDER = new Color(180, 190, 210);
    public static final Color INPUT_FOCUS = new Color(33, 118, 255);
    public static final Color INPUT_TEXT = TEXT_PRIMARY;

    // Sidebar
    public static final Color SIDEBAR_BG = new Color(248, 250, 255, 220);
    public static final Color SIDEBAR_HOVER = new Color(235, 240, 255);
    public static final Color SIDEBAR_ACTIVE = new Color(33, 118, 255, 40);

    // ═══════════════════════════════════════════════════════════
    // FONTS
    // ═══════════════════════════════════════════════════════════

    public static final Font FONT_TITLE = new Font("Segoe UI", Font.BOLD, 32);
    public static final Font FONT_HEADING = new Font("Segoe UI", Font.BOLD, 24);
    public static final Font FONT_SUBHEADING = new Font("Segoe UI", Font.BOLD, 18);
    public static final Font FONT_BODY = new Font("Segoe UI", Font.PLAIN, 14);
    public static final Font FONT_BODY_BOLD = new Font("Segoe UI", Font.BOLD, 14);
    public static final Font FONT_SMALL = new Font("Segoe UI", Font.PLAIN, 12);
    public static final Font FONT_CAPTION = new Font("Segoe UI", Font.PLAIN, 11);
    public static final Font FONT_CAPTION_BOLD = new Font("Segoe UI", Font.BOLD, 11);
    public static final Font FONT_BUTTON = new Font("Segoe UI", Font.BOLD, 14);
    public static final Font FONT_MONO = new Font("Consolas", Font.PLAIN, 13);
    public static final Font FONT_LOGO = new Font("Segoe UI", Font.BOLD, 42);
    public static final Font FONT_SPLASH_TITLE = new Font("Segoe UI", Font.BOLD, 56);

    // ═══════════════════════════════════════════════════════════
    // DIMENSIONS
    // ═══════════════════════════════════════════════════════════

    public static final int CORNER_RADIUS = 16;
    public static final int CARD_PADDING = 24;
    public static final int FIELD_HEIGHT = 45;
    public static final int BUTTON_HEIGHT = 48;
    public static final int SIDEBAR_WIDTH = 260;

    // ═══════════════════════════════════════════════════════════
    // GRADIENT PAINT FACTORIES
    // ═══════════════════════════════════════════════════════════

    public static GradientPaint getMainGradient(int width, int height) {
        return new GradientPaint(0, 0, BG_DARK_1, width, height, BG_DARK_3);
    }

    public static GradientPaint getBlueGradient(int x, int y, int width) {
        return new GradientPaint(x, y, ACCENT_BLUE, x + width, y, ACCENT_PURPLE);
    }

    public static GradientPaint getPinkGradient(int x, int y, int width) {
        return new GradientPaint(x, y, ACCENT_PINK, x + width, y, ACCENT_ORANGE);
    }

    public static GradientPaint getGreenGradient(int x, int y, int width) {
        return new GradientPaint(x, y, ACCENT_GREEN, x + width, y, ACCENT_CYAN);
    }

    public static GradientPaint getGoldGradient(int x, int y, int width) {
        return new GradientPaint(x, y, ACCENT_GOLD, x + width, y, ACCENT_ORANGE);
    }

    public static LinearGradientPaint getSplashGradient(int width, int height) {
        float[] fractions = {0.0f, 0.3f, 0.7f, 1.0f};
        Color[] colors = {
            new Color(245, 248, 255),
            new Color(235, 242, 255),
            new Color(225, 235, 255),
            new Color(240, 245, 255)
        };
        return new LinearGradientPaint(0, 0, width, height, fractions, colors);
    }

    // ═══════════════════════════════════════════════════════════
    // UTILITY METHODS
    // ═══════════════════════════════════════════════════════════

    /**
     * Apply the VoteWise look-and-feel globally
     */
    public static void applyGlobalTheme() {
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception ignored) {}

        // Override default colors
        UIManager.put("Panel.background", BG_DARK_2);
        UIManager.put("OptionPane.background", CARD_BG_SOLID);
        UIManager.put("OptionPane.messageForeground", TEXT_PRIMARY);
        UIManager.put("Button.background", ACCENT_BLUE);
        UIManager.put("Button.foreground", TEXT_PRIMARY);
        UIManager.put("TextField.background", INPUT_BG);
        UIManager.put("TextField.foreground", INPUT_TEXT);
        UIManager.put("TextField.caretForeground", TEXT_PRIMARY);
        UIManager.put("PasswordField.background", INPUT_BG);
        UIManager.put("PasswordField.foreground", INPUT_TEXT);
        UIManager.put("PasswordField.caretForeground", TEXT_PRIMARY);
        UIManager.put("ScrollBar.thumbDarkShadow", BG_DARK_1);
        UIManager.put("ScrollBar.thumb", CARD_BORDER);
        UIManager.put("ScrollBar.track", BG_DARK_2);
    }

    /**
     * Create a styled label
     */
    public static JLabel createLabel(String text, Font font, Color color) {
        JLabel label = new JLabel(text);
        label.setFont(font);
        label.setForeground(color);
        return label;
    }

    /**
     * Create an empty border with uniform padding
     */
    public static Border createPadding(int padding) {
        return BorderFactory.createEmptyBorder(padding, padding, padding, padding);
    }

    /**
     * Enable anti-aliased rendering on a Graphics2D context
     */
    public static void enableAntiAliasing(Graphics2D g2d) {
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g2d.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_LCD_HRGB);
        g2d.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
    }

    /**
     * Draw a rounded rectangle with optional fill and border
     */
    public static void drawRoundedRect(Graphics2D g2d, int x, int y, int width, int height,
                                        int radius, Color fill, Color border) {
        RoundRectangle2D rect = new RoundRectangle2D.Float(x, y, width, height, radius, radius);
        if (fill != null) {
            g2d.setColor(fill);
            g2d.fill(rect);
        }
        if (border != null) {
            g2d.setColor(border);
            g2d.setStroke(new BasicStroke(1.5f));
            g2d.draw(rect);
        }
    }

    /**
     * Draw glowing orb decoration (used in backgrounds)
     */
    public static void drawGlowOrb(Graphics2D g2d, int cx, int cy, int radius, Color color) {
        for (int i = radius; i > 0; i -= 2) {
            float alpha = (float) i / radius * 0.08f;
            g2d.setColor(new Color(color.getRed(), color.getGreen(), color.getBlue(),
                    (int) (alpha * 255)));
            g2d.fillOval(cx - i, cy - i, i * 2, i * 2);
        }
    }
}
