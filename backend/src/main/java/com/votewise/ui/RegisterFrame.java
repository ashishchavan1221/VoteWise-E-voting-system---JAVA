package com.votewise.ui;

import javax.swing.*;
import java.awt.*;
import org.json.JSONObject;

/**
 * Registration Frame with beautiful form, field validation, and gradient design.
 */
public class RegisterFrame extends JFrame {

    private PlaceholderTextField nameField, voterIdField, aadharField, emailField, collegeField, ageField;
    private PlaceholderPasswordField passwordField, confirmPasswordField;
    private JLabel statusLabel;

    public RegisterFrame() {
        setTitle("VoteWise — Create Account");
        setSize(1100, 750);
        setMinimumSize(new Dimension(900, 700));
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        GradientPanel bgPanel = new GradientPanel();
        bgPanel.setDrawGrid(true);
        bgPanel.setLayout(new GridBagLayout());

        RoundedPanel card = new RoundedPanel(24, new Color(15, 15, 45, 220), VoteWiseTheme.CARD_BORDER);
        card.setGlass(true);
        card.setGlassOpacity(0.15f);
        card.setPreferredSize(new Dimension(520, 670));
        card.setLayout(new BorderLayout());
        card.setBorder(VoteWiseTheme.createPadding(32));

        JPanel content = new JPanel();
        content.setOpaque(false);
        content.setLayout(new BoxLayout(content, BoxLayout.Y_AXIS));

        // Header
        JLabel icon = new JLabel("R", SwingConstants.CENTER);
        icon.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 40));
        icon.setAlignmentX(Component.CENTER_ALIGNMENT);

        JLabel title = VoteWiseTheme.createLabel("Create Account", VoteWiseTheme.FONT_HEADING, VoteWiseTheme.TEXT_PRIMARY);
        title.setAlignmentX(Component.CENTER_ALIGNMENT);
        JLabel subtitle = VoteWiseTheme.createLabel("Register to participate in the election", VoteWiseTheme.FONT_SMALL, VoteWiseTheme.TEXT_SECONDARY);
        subtitle.setAlignmentX(Component.CENTER_ALIGNMENT);

        // Fields
        nameField = createField("Full Name");
        voterIdField = createField("Voter ID");
        aadharField = createField("Aadhar Card Number");
        emailField = createField("Email Address");
        collegeField = createField("College / Institution");
        ageField = createField("Age");
        passwordField = new PlaceholderPasswordField("Password");
        passwordField.setMaximumSize(new Dimension(440, 45));
        passwordField.setAlignmentX(Component.CENTER_ALIGNMENT);
        confirmPasswordField = new PlaceholderPasswordField("Confirm Password");
        confirmPasswordField.setMaximumSize(new Dimension(440, 45));
        confirmPasswordField.setAlignmentX(Component.CENTER_ALIGNMENT);

        // Two-column layout for some fields
        JPanel row1 = createRow(nameField, ageField);
        JPanel row2 = createRow(voterIdField, aadharField);
        JPanel row3 = createRow(emailField, collegeField);

        // Register button
        AnimatedButton registerBtn = new AnimatedButton("Create Account", VoteWiseTheme.ACCENT_GREEN, VoteWiseTheme.ACCENT_CYAN);
        registerBtn.setMaximumSize(new Dimension(440, 48));
        registerBtn.setAlignmentX(Component.CENTER_ALIGNMENT);
        registerBtn.addActionListener(e -> performRegister());

        statusLabel = new JLabel(" ");
        statusLabel.setFont(VoteWiseTheme.FONT_SMALL);
        statusLabel.setForeground(VoteWiseTheme.ERROR);
        statusLabel.setAlignmentX(Component.CENTER_ALIGNMENT);

        // Login link
        JPanel loginPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 5, 0));
        loginPanel.setOpaque(false);
        JLabel loginText = VoteWiseTheme.createLabel("Already have an account?", VoteWiseTheme.FONT_SMALL, VoteWiseTheme.TEXT_SECONDARY);
        JLabel loginLink = VoteWiseTheme.createLabel("Sign In", VoteWiseTheme.FONT_BODY_BOLD, VoteWiseTheme.ACCENT_CYAN);
        loginLink.setCursor(new Cursor(Cursor.HAND_CURSOR));
        loginLink.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent e) {
                dispose();
                new LoginFrame().setVisible(true);
            }
        });
        loginPanel.add(loginText);
        loginPanel.add(loginLink);

        // Assemble
        content.add(Box.createVerticalGlue());
        content.add(icon);
        content.add(Box.createVerticalStrut(2));
        content.add(title);
        content.add(Box.createVerticalStrut(2));
        content.add(subtitle);
        content.add(Box.createVerticalStrut(10));
        content.add(row1);
        content.add(Box.createVerticalStrut(8));
        content.add(row2);
        content.add(Box.createVerticalStrut(8));
        content.add(row3);
        content.add(Box.createVerticalStrut(8));
        content.add(passwordField);
        content.add(Box.createVerticalStrut(8));
        content.add(confirmPasswordField);
        content.add(Box.createVerticalStrut(8));
        content.add(statusLabel);
        content.add(Box.createVerticalStrut(10));
        content.add(registerBtn);
        content.add(Box.createVerticalStrut(10));
        content.add(loginPanel);
        content.add(Box.createVerticalGlue());

        card.add(content, BorderLayout.CENTER);

        bgPanel.add(card);
        setContentPane(bgPanel);
    }

    private PlaceholderTextField createField(String placeholder) {
        PlaceholderTextField f = new PlaceholderTextField(placeholder);
        f.setMaximumSize(new Dimension(440, 45));
        f.setAlignmentX(Component.CENTER_ALIGNMENT);
        return f;
    }

    private JPanel createRow(JComponent left, JComponent right) {
        JPanel row = new JPanel(new GridLayout(1, 2, 10, 0));
        row.setOpaque(false);
        row.setMaximumSize(new Dimension(440, 45));
        row.add(left);
        row.add(right);
        return row;
    }

    private void performRegister() {
        String name = nameField.getText().trim();
        String voterId = voterIdField.getText().trim();
        String aadhar = aadharField.getText().trim();
        String email = emailField.getText().trim();
        String college = collegeField.getText().trim();
        String ageStr = ageField.getText().trim();
        String password = new String(passwordField.getPassword()).trim();
        String confirmPassword = new String(confirmPasswordField.getPassword()).trim();

        // Validation
        if (name.isEmpty() || voterId.isEmpty() || aadhar.isEmpty() || password.isEmpty()) {
            statusLabel.setForeground(VoteWiseTheme.ERROR);
            statusLabel.setText("Please fill in all required fields");
            return;
        }
        if (!password.equals(confirmPassword)) {
            statusLabel.setForeground(VoteWiseTheme.ERROR);
            statusLabel.setText("Passwords do not match");
            return;
        }
        int age;
        try {
            age = Integer.parseInt(ageStr);
            if (age < 18) {
                statusLabel.setForeground(VoteWiseTheme.ERROR);
                statusLabel.setText("You must be 18 or older to register");
                return;
            }
        } catch (NumberFormatException ex) {
            statusLabel.setForeground(VoteWiseTheme.ERROR);
            statusLabel.setText("Please enter a valid age");
            return;
        }

        statusLabel.setForeground(VoteWiseTheme.ACCENT_BLUE);
        statusLabel.setText("Creating account...");

        new SwingWorker<JSONObject, Void>() {
            protected JSONObject doInBackground() throws Exception {
                return ApiClient.register(voterId, aadhar, name, password, college, email, age);
            }
            protected void done() {
                try {
                    JSONObject resp = get();
                    if (resp.has("error")) {
                        statusLabel.setForeground(VoteWiseTheme.ERROR);
                        statusLabel.setText(resp.getString("error"));
                    } else {
                        statusLabel.setForeground(VoteWiseTheme.SUCCESS);
                        statusLabel.setText("Registered successfully! Redirecting to login...");
                        Timer t = new Timer(1200, ev -> {
                            dispose();
                            new LoginFrame().setVisible(true);
                        });
                        t.setRepeats(false);
                        t.start();
                    }
                } catch (Exception ex) {
                    statusLabel.setForeground(VoteWiseTheme.ERROR);
                    statusLabel.setText("Connection error. Is the server running?");
                }
            }
        }.execute();
    }
}
