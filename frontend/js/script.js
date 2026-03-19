// ================= ALERT =================
function showAlert(msg, type = "success") {
    const div = document.createElement("div");

    div.className = `
        fixed top-6 right-6 px-8 py-4 rounded-3xl text-white font-bold 
        shadow-2xl z-50 transition-all duration-500 opacity-0 translate-y-5
        ${type === "success" ? "bg-green-600" : "bg-red-600"}
    `;

    div.innerHTML = `
        <div class="flex items-center gap-3">
            <span>${type === "success" ? "🗳️" : "⚠️"}</span>
            <span>${msg}</span>
        </div>
    `;

    document.body.appendChild(div);

    setTimeout(() => {
        div.classList.remove("opacity-0", "translate-y-5");
    }, 100);

    setTimeout(() => {
        div.classList.add("opacity-0", "translate-y-5");
        setTimeout(() => div.remove(), 500);
    }, 3000);
}


// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// ================= SCROLL ANIMATION =================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll("section, .card-hover").forEach(el => {
    el.classList.add("hidden-anim");
    observer.observe(el);
});


// ================= ANIMATION STYLE =================
const style = document.createElement("style");
style.innerHTML = `
.hidden-anim {
    opacity: 0;
    transform: translateY(40px);
}

.show {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.8s ease;
}

@keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
}

.fade-in-anim {
    animation: fadeInScale 0.3s ease-out forwards;
}

@keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
    animation: blob 7s infinite;
}

.animation-delay-2000 {
    animation-delay: 2s;
}
`;
document.head.appendChild(style);

// ================= AI CHATBOT LOGIC =================
document.addEventListener("DOMContentLoaded", () => {
    const chatBubble = document.getElementById("ai-chat-bubble");
    const chatWindow = document.getElementById("ai-chat-window");
    const closeChat = document.getElementById("close-chat");
    const sendBtn = document.getElementById("send-btn");
    const chatInput = document.getElementById("chat-input");
    const chatBody = document.getElementById("chat-body");

    // Toggle Chat Window
    if (chatBubble && chatWindow && closeChat) {
        chatBubble.addEventListener("click", () => {
            chatWindow.classList.remove("hidden");
            // Delay to allow display block to apply before animating opacity
            setTimeout(() => {
                chatWindow.classList.remove("scale-95", "opacity-0");
                chatWindow.classList.add("scale-100", "opacity-100");
                chatWindow.style.display = "flex";
            }, 10);
            chatBubble.classList.add("hidden");
        });

        closeChat.addEventListener("click", () => {
            chatWindow.classList.remove("scale-100", "opacity-100");
            chatWindow.classList.add("scale-95", "opacity-0");
            setTimeout(() => {
                chatWindow.classList.add("hidden");
                chatWindow.style.display = "none";
                chatBubble.classList.remove("hidden");
            }, 300);
        });
    }

    // Handle Sending Messages
    const handleSendMessage = () => {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addUserMessage(message);
        chatInput.value = "";

        // Mock AI response
        setTimeout(() => {
            addBotMessage(getBotResponse(message));
        }, 1000);
    };

    if (sendBtn && chatInput) {
        sendBtn.addEventListener("click", handleSendMessage);
        chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleSendMessage();
        });
    }

    function addUserMessage(text) {
        const msgHtml = `
            <div class="flex gap-3 max-w-[85%] self-end flex-row-reverse fade-in-anim">
                <div class="w-8 h-8 rounded-full bg-[#0f172a] flex items-center justify-center flex-shrink-0">
                    <i class="fa-solid fa-user text-white text-sm"></i>
                </div>
                <div class="bg-blue-600 p-3 rounded-2xl rounded-tr-none shadow-sm text-sm text-white">
                    ${escapeHTML(text)}
                </div>
            </div>
        `;
        chatBody.insertAdjacentHTML("beforeend", msgHtml);
        scrollToBottom();
    }

    function addBotMessage(text) {
        const msgHtml = `
            <div class="flex gap-3 max-w-[85%] fade-in-anim">
                <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <i class="fa-solid fa-robot text-blue-600 text-sm"></i>
                </div>
                <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-700 border border-gray-100 whitespace-pre-wrap">${text}</div>
            </div>
        `;
        chatBody.insertAdjacentHTML("beforeend", msgHtml);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g,
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    function getBotResponse(input) {
        const lowerInputStr = input.toLowerCase().trim();

        // Greetings
        if (/(hi|hello|hey|greetings|morning)/.test(lowerInputStr)) {
            return "Hello! 👋 I'm your VoteWise Assistant. I can help you with:\n1. Registration\n2. Login\n3. Voting\n4. Results\n\nWhat would you like to know?";
        }

        // Registration
        if (/(register|sign up|create account|new user|join)/.test(lowerInputStr)) {
            return "📝 To register: Click 'Register' at the top, fill in your details, and verify your Voter ID. It's quick and secure!";
        }

        // Login
        if (/(login|sign in|log in|access)/.test(lowerInputStr)) {
            return "🔐 To login: Go to the 'Login' page and enter your registered Voter ID and Password.";
        }

        // Process & How to vote
        if (/(how to vote|cast vote|voting|vote|process|steps)/.test(lowerInputStr) && !/(register|login)/.test(lowerInputStr)) {
            return "🗳️ How to vote:\n1. Login with your credentials\n2. View the candidate list on your dashboard\n3. Select your preferred candidate\n4. Click 'Submit Vote'.\nRemember: You can only vote once!";
        }

        // Security
        if (/(secure|safe|security|hack|privacy|fake)/.test(lowerInputStr)) {
            return "🛡️ Security: VoteWise uses end-to-end encryption. Your vote is 100% confidential and securely recorded.";
        }

        // Results
        if (/(result|winner|who won|stats|count|live|tracking)/.test(lowerInputStr)) {
            return "📊 Live Results: You can view real-time vote counts and the declared winner on the 'Live Results' page!";
        }

        // Project / Creator Info
        if (/(who made|creator|developer|project|mca|lpu)/.test(lowerInputStr)) {
            return "🎓 VoteWise is an MCA project designed for secure online e-voting.";
        }

        // Contact / Help / Reset
        if (/(password|forgot|reset|help|support|error|issue|problem)/.test(lowerInputStr)) {
            return "🆘 Help: If you forgot your password or faced an issue, please contact the admin desk or navigate to the login page for account recovery.";
        }

        // Fallback / Guidance
        return "🤔 I didn't quite catch that.\n\nHere is how I can guide you:\n- Type 'Register' to learn how to sign up.\n- Type 'Vote' to know the voting process.\n- Type 'Results' to see live tracking.";
    }
});