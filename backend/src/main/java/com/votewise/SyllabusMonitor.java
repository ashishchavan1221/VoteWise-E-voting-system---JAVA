package com.votewise;

import javax.swing.*;
import java.awt.*;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;

// Unit 3: Abstract Class, Interfaces
interface MonitorInterface {
    void displayMessage(String msg);
}

// Unit 6: Custom Generic Class with bounded type
class GenericLogManager<T extends SyllabusMonitor.AbstractLog> {
    private List<T> logs = new ArrayList<>(); // Unit 6: Collections & Generics (ArrayList)

    public void add(T log) {
        logs.add(log);
    }
    public List<T> getLogs() {
        return logs;
    }
}

public class SyllabusMonitor extends JFrame implements MonitorInterface {

    // Unit 3: Inheritance, Polymorphism
    public static abstract class AbstractLog implements Serializable {
        // Unit 5: Serializable interface
        protected String message;
        protected Date timestamp; // Unit 4: Dates utility class
        
        public AbstractLog(String message) {
            this.message = message;
            this.timestamp = new Date();
        }
        
        // Unit 3: abstract method
        public abstract String format();
        
        // Unit 3: Overriding toString
        @Override
        public String toString() {
            return format();
        }
    }

    public static class InfoLog extends AbstractLog { // Unit 3: Inheritance
        public InfoLog(String message) {
            super(message); // Unit 3: super keyword
        }

        @Override
        public String format() { // Unit 3: Method Overriding
            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
            return "[INFO - " + sdf.format(timestamp) + "] " + message;
        }
        
        // Unit 3: Overriding equals
        @Override
        public boolean equals(Object obj) {
            if (obj instanceof InfoLog) { // Unit 3: instanceof operator
                return this.message.equals(((InfoLog)obj).message);
            }
            return false;
        }
    }

    // Unit 5: Custom exception
    public static class MonitorException extends Exception {
        public MonitorException(String msg) {
            super(msg);
        }
    }

    private JTextArea textArea;
    private GenericLogManager<AbstractLog> logManager;

    public SyllabusMonitor() {
        // Unit 3: using swing components to demonstrate inheritance
        super("VoteWise Server Monitor (CAP477 Syllabus)");
        
        logManager = new GenericLogManager<>();

        setSize(600, 400);
        setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
        setLayout(new BorderLayout());

        textArea = new JTextArea();
        textArea.setEditable(false);
        textArea.setBackground(Color.BLACK);
        textArea.setForeground(Color.GREEN);
        textArea.setFont(new Font("Consolas", Font.BOLD, 14));
        add(new JScrollPane(textArea), BorderLayout.CENTER);

        JButton saveBtn = new JButton("Save Logs");
        // Unit 4: Implementing listener using lambda expressions
        saveBtn.addActionListener(e -> saveLogsToFile());
        
        // Unit 2: Loops, Arrays
        JPanel bottomPanel = new JPanel();
        JButton[] buttons = {saveBtn, new JButton("Clear")};
        for (JButton btn : buttons) { // Unit 2: for-each loop
            bottomPanel.add(btn);
        }
        buttons[1].addActionListener(e -> textArea.setText(""));
        
        add(bottomPanel, BorderLayout.SOUTH);

        // Unit 4: importance of static and non-static nested classes, local and anonymous class
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                try {
                    // Start up sequence
                    displayMessage("Initializing Server UI Component");
                    Thread.sleep(500);
                    displayMessage("Loading configurations...");
                    
                    // Unit 1: Primitive data types, Arithmetic, Relational, Logical
                    int cores = Runtime.getRuntime().availableProcessors();
                    long freeMem = Runtime.getRuntime().freeMemory() / (1024 * 1024);
                    boolean isHealthy = cores > 1 && freeMem > 50;
                    
                    if (isHealthy) { // Unit 1: if/else constructs
                        displayMessage("System Health OK: " + cores + " cores, " + freeMem + "MB free.");
                    }

                    // Unit 2: String and StringBuilder
                    StringBuilder sb = new StringBuilder();
                    sb.append("Server is now fully listening on assigned port...");
                    displayMessage(sb.toString());

                } catch (InterruptedException e) { // Unit 5: try catch
                    e.printStackTrace();
                }
            }
        };

        // Unit 4: implementing threads using lambda or runnable
        new Thread(runnable).start();
    }

    @Override
    public void displayMessage(String msg) {
        SwingUtilities.invokeLater(() -> { // Unit 4: lambda 
            InfoLog log = new InfoLog(msg);
            logManager.add(log);
            textArea.append(log.format() + "\n");
        });
    }

    private void saveLogsToFile() {
        // Unit 5: auto-close resources with try-with resources statement, using streams to read and write files, Serialization
        try (FileOutputStream fos = new FileOutputStream("server_logs.dat");
             ObjectOutputStream oos = new ObjectOutputStream(fos)) {
            
            // Serialize
            for (AbstractLog log : logManager.getLogs()) { // Unit 6: Generic Collections Iteration
                oos.writeObject(log);
            }
            
            // Multi-catch handling
        } catch (FileNotFoundException e) {
            JOptionPane.showMessageDialog(this, "Could not open file!");
        } catch (IOException e) {
            JOptionPane.showMessageDialog(this, "I/O Error occurred!");
        } catch (Exception e) { // Unit 5: exception overview, class hierarchy
            JOptionPane.showMessageDialog(this, "Unknown exception: " + e.getMessage());
        }
        
        try {
            // Unit 5: Write data from console simulation (just writing to file)
            try (FileWriter fw = new FileWriter("server_logs.txt")) {
                for (AbstractLog log : logManager.getLogs()) {
                    fw.write(log.format() + "\n");
                }
            }
            JOptionPane.showMessageDialog(this, "Logs saved successfully to server_logs.txt & .dat");
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    // Launch UI
    public static void start() {
        System.setProperty("java.awt.headless", "false"); // Ensure Swing works
        SwingUtilities.invokeLater(() -> {
            SyllabusMonitor monitor = new SyllabusMonitor();
            monitor.setVisible(true);
        });
    }
}
