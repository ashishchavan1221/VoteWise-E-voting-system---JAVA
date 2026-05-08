package com.votewise.ui;

import javax.swing.*;

/**
 * VoteWise Swing Application Entry Point.
 * Launches the splash screen → login flow independently of the backend server.
 * 
 * Run this class to start the GUI client.
 * The backend server (Main.java) should be running separately.
 */
public class VoteWiseApp {

    public static void main(String[] args) {
        // Apply global theme
        VoteWiseTheme.applyGlobalTheme();

        // Ensure Swing is not in headless mode
        System.setProperty("java.awt.headless", "false");

        // Launch on EDT
        SwingUtilities.invokeLater(() -> {
            try {
                // Try setting system L&F for native window decorations
                UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
            } catch (Exception ignored) {}

            VoteWiseTheme.applyGlobalTheme();
            
            // Show splash screen, which auto-transitions to LoginFrame
            SplashScreen splash = new SplashScreen();
            splash.showSplash();
        });
    }

    /**
     * Skip splash and go directly to login (for development/testing)
     */
    public static void launchDirect() {
        VoteWiseTheme.applyGlobalTheme();
        System.setProperty("java.awt.headless", "false");
        SwingUtilities.invokeLater(() -> {
            new LoginFrame().setVisible(true);
        });
    }
}
