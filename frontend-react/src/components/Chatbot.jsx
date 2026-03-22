import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { chatbotIntents } from '../utils/chatbotKnowledge';

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm VoteWise Chatbot 🇮🇳. How can I guide you through the e-voting process today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    // Advanced Intent-Based Knowledge Base
    const botBrain = (query) => {
        // Normalize query: to lowercase and remove punctuation
        const normalizedQuery = query.toLowerCase().replace(/[^\w\s]/gi, '');
        const words = normalizedQuery.split(' ');

        // Pull the intents from the external knowledge base
        const intents = chatbotIntents;

        let bestMatch = null;
        let maxScore = 0;

        for (const intent of intents) {
            let score = 0;
            for (const keyword of intent.keywords) {
                // Exact phrase match
                if (normalizedQuery.includes(keyword)) {
                    score += keyword.split(' ').length > 1 ? 3 : 2; 
                } else {
                    // Typo tolerance (partial matching for long words like 'registerd' -> 'register')
                    for (const word of words) {
                        if (word.length > 4 && keyword.length > 4) {
                            if (word.includes(keyword) || keyword.includes(word)) {
                                score += 1;
                            }
                        }
                    }
                }
            }
            if (score > maxScore) {
                maxScore = score;
                bestMatch = intent;
            }
        }

        // Return best match if score is confident enough
        if (maxScore > 0 && bestMatch) {
            return bestMatch.response;
        }

        return "I'm not exactly sure about that! Could you rephrase your question? For example, ask me 'What is required to register?' or 'How secure is the platform?'";
    };

    const handleSend = (e, overrideInput = null) => {
        e?.preventDefault();
        const messageText = overrideInput || input;
        if (!messageText.trim()) return;

        const userMsg = { id: Date.now(), text: messageText, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulate typing delay
        setTimeout(() => {
            const botResponse = { id: Date.now() + 1, text: botBrain(messageText), sender: 'bot' };
            setMessages(prev => [...prev, botResponse]);
        }, 600);
    };

    const quickReplies = ["How to vote?", "Is it secure?", "Who is eligible?"];

    return (
        <>
            {/* Chat Bubble Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-2xl hover:bg-blue-700 hover:scale-110 transition-all z-50 ${isOpen ? 'rotate-90 opacity-0 scale-50 pointer-events-none' : 'rotate-0 opacity-100 scale-100'}`}
            >
                <i className="fa-solid fa-robot text-3xl text-white"></i>
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl z-50 flex flex-col transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 pointer-events-none translate-y-10'}`}>
                
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-4 flex justify-between items-center rounded-t-3xl shadow-md cursor-pointer" onClick={() => setIsOpen(false)}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shadow-inner">
                            <i className="fa-solid fa-robot text-xl"></i>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg leading-tight">VoteWise Chatbot</h3>
                            <p className="text-xs text-blue-100 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Online & Ready</p>
                        </div>
                    </div>
                    <button className="text-white/80 hover:text-white transition text-2xl leading-none">&times;</button>
                </div>

                {/* Chat Body */}
                <div className="p-5 h-96 overflow-y-auto flex flex-col gap-4 bg-gray-50/50" style={{ scrollbarWidth: 'thin' }}>
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                            {msg.sender === 'bot' && (
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 shadow-sm border border-blue-200">
                                    <i className="fa-solid fa-robot text-blue-600 text-xs"></i>
                                </div>
                            )}
                            <div className={`p-3 rounded-2xl shadow-sm text-sm border ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none border-blue-700' : 'bg-white text-gray-700 rounded-tl-none border-gray-100 leading-relaxed'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies (Only show if last message was bot) */}
                {messages[messages.length - 1].sender === 'bot' && (
                    <div className="px-4 pb-2 flex gap-2 overflow-x-auto hide-scrollbar bg-gray-50/50">
                        {quickReplies.map((qr, idx) => (
                            <button key={idx} onClick={() => handleSend(null, qr)} className="whitespace-nowrap px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full hover:bg-blue-100 transition border border-blue-100">
                                {qr}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 rounded-b-3xl flex gap-2 items-center relative z-10 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.02)]">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..." 
                        className="flex-1 bg-gray-100 px-4 py-3 border border-transparent rounded-full text-sm focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition w-full"
                    />
                    <button 
                        type="submit"
                        disabled={!input.trim()}
                        className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all flex-shrink-0 ${input.trim() ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                    >
                        <i className="fa-solid fa-paper-plane text-sm translate-x-[-1px] translate-y-[1px]"></i>
                    </button>
                </form>
            </div>
        </>
    );
}

export default Chatbot;
