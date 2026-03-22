export const chatbotIntents = [
    {
        keywords: ['register', 'registration', 'create', 'sign up', 'signup', 'required', 'document', 'need to', 'details', 'information', 'how to join'],
        response: "To register, you need: 1. Your Full Name (as per College ID), 2. Age (must be 18+), 3. Official College Name, 4. Active Email Address, 5. Phone Number, and 6. Your 10-digit Voter ID. Head over to the 'Register' page to get started!"
    },
    {
        keywords: ['how to vote', 'steps to vote', 'process to vote', 'cast vote', 'voting process', 'step by step', 'guide', 'tutorial'],
        response: "Voting is a simple 3-step process: \n1. Register with your college details.\n2. Login securely using your 10-digit Voter ID and password.\n3. Go to the Dashboard, select your candidate's party, and securely confirm your vote. Your vote will be instantly anonymized!"
    },
    {
        keywords: ['eligible', 'eligibility', 'can i vote', 'who can vote', 'age', 'requirements', 'who is allowed', 'am i allowed'],
        response: "Any college student aged 18+ studying away from their home constituency is eligible to register and vote remotely using our college-verified system."
    },
    {
        keywords: ['secure', 'security', 'safe', 'hack', 'tamper', 'privacy', 'anonymous', 'blockchain', 'encryption', 'trust', 'anonymity'],
        response: "Absolutely. VoteWise uses military-grade end-to-end encryption. Once cast, your vote is completely anonymized and locked into our secure database. No one (not even the administrators) can trace the vote to you, and it cannot be altered."
    },
    {
        keywords: ['change vote', 'modify vote', 'edit vote', 'cancel vote', 'wrong vote', 'voting twice', 'multiple times', 'accidentally voted'],
        response: "To maintain the strictest election integrity, you can only vote exactly ONCE per election. Once a vote is confirmed and submitted, it becomes permanently locked into the system database and cannot be changed, modified, or canceled."
    },
    {
        keywords: ['result', 'winner', 'who won', 'leading', 'analytics', 'statistics', 'dashboard', 'live data', 'count', 'see results', 'current status'],
        response: "You can view live, real-time analytics of the election by clicking 'Live Results' in the navigation bar. For transparency and security, you must be securely logged in to view the live dashboard data."
    },
    {
        keywords: ['about', 'project', 'votewise', 'what is this', 'purpose', 'goal', 'why', 'mca', 'mission'],
        response: "VoteWise is an MCA Final Project developed to solve the absentee voting problem for college students studying outside their home states in India. It empowers out-of-state students to easily exercise their constitutional democratic rights!"
    },
    {
        keywords: ['team', 'who made', 'developer', 'creator', 'founder', 'author', 'group', 'members', 'students'],
        response: "VoteWise was developed natively as an MCA Final Project by students at Lovely Professional University. The focus is on secure web technologies and building robust database architectures."
    },
    {
        keywords: ['forgot password', 'reset password', 'lost password', 'cant login', 'cannot login', 'issue logging', 'help login', 'login error'],
        response: "If you are having trouble logging in or have forgotten your password, please contact the college administration to verify your identity physically and reset your credentials."
    },
    {
        keywords: ['fake id', 'cheat', 'voter fraud', 'multiple accounts', 'scam', 'spam', 'duplicate'],
        response: "VoteWise completely prevents voter fraud by cross-matching the 10-digit Voter ID with the physical college registry records. Attempting to create duplicate accounts will instantly flag and fail."
    },
    {
        keywords: ['cost', 'price', 'payment', 'fee', 'free', 'money'],
        response: "VoteWise is completely, 100% free. Voting is a constitutional right, and our system ensures there are no monetary barriers to casting your ballot remotely!"
    },
    {
        keywords: ['contact', 'help', 'support', 'complaint', 'issue', 'problem', 'customer service'],
        response: "You can contact support directly through your college's election administration office. Our development team operates the backend but all administrative disputes must go through the college board."
    },
    {
        keywords: ['hello', 'hi', 'hey', 'greetings', 'namaste'],
        response: "Hi there! 👋 I am the VoteWise AI Assistant. I can help you with registration, voting rules, security protocols, or viewing live results. What do you need help with?"
    },
    {
        keywords: ['thank you', 'thanks', 'helpful', 'awesome', 'great', 'ok', 'okay', 'got it', 'perfect', 'cool', 'good'],
        response: "You're very welcome! If there is anything else you need, I am right here. Remember, every single vote shapes India's future! 🇮🇳"
    }
];
