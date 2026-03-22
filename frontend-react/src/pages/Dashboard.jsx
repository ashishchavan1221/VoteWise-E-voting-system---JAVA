import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [hasVoted, setHasVoted] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const currentUser = localStorage.getItem('currentUser');
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            window.showAlert('❌ Please login to access the dashboard', 'error');
            navigate('/login');
            return;
        }

        // Check Vote Status Mock
        const votedMock = localStorage.getItem(`voted_${currentUser}`);
        if(votedMock === "true") setHasVoted(true);

        // Fetch Mock Candidates
        setCandidates([
            { id: 1, name: "Arun Sharma", party: "Party A", symbol: "🟢", position: "President" },
            { id: 2, name: "Priya Desai", party: "Party B", symbol: "🟠", position: "President" },
            { id: 3, name: "Rahul Singh", party: "Party C", symbol: "🔵", position: "President" }
        ]);
    }, [currentUser, navigate]);

    const handleVote = () => {
        if(!selectedCandidate) return;

        // Backend Mock Process
        localStorage.setItem(`voted_${currentUser}`, "true");
        let results = JSON.parse(localStorage.getItem("mock_results") || "{}");
        results[selectedCandidate.id] = (results[selectedCandidate.id] || 0) + 1;
        localStorage.setItem("mock_results", JSON.stringify(results));
        
        setHasVoted(true);
        setSelectedCandidate(null);
        window.showAlert("✅ Test Vote Registered!");
    };

    if(hasVoted) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center p-6 bg-gray-50">
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 max-w-lg w-full text-center">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fa-solid fa-check text-5xl text-green-500"></i>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Vote Recorded</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">Thank you for participating in the election! Your vote has been securely anonymized and recorded successfully.</p>
                    <button onClick={() => navigate('/results')} className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition">
                        View Live Results
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="bg-[#0f172a] text-white pt-24 pb-16 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <p className="inline-block px-4 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-4 border border-blue-500/30 backdrop-blur-md">
                            <i className="fa-solid fa-shield-check mr-2"></i>Secure Standard Voting
                        </p>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Welcome back, <span className="text-blue-400">{currentUser}</span>!</h1>
                        <p className="text-lg text-gray-300 max-w-2xl">Please review the candidate manifestos carefully. Your vote is confidential and can only be cast exactly once.</p>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20 pb-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {candidates.map(candidate => (
                        <div key={candidate.id} className="bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300 p-8 flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-inner text-3xl">
                                    {candidate.symbol}
                                </div>
                                <span className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase tracking-wider">{candidate.party}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{candidate.name}</h3>
                            <p className="text-blue-600 font-semibold mb-4">{candidate.position}</p>
                            
                            <hr className="border-gray-100 my-4"/>
                            
                            <button onClick={() => setSelectedCandidate(candidate)} className="mt-auto w-full py-4 bg-gray-50 border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-lg transition flex items-center justify-center gap-2">
                                <i className="fa-solid fa-check-to-slot"></i> Vote for {candidate.name.split(' ')[0]}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {selectedCandidate && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm" onClick={() => setSelectedCandidate(null)}></div>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden transform transition-all p-8 scale-100">
                        <div className="w-20 h-20 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-iner text-4xl">
                            <i className="fa-solid fa-fingerprint"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">Confirm Your Vote</h3>
                        <p className="text-center text-gray-600 mb-8 leading-relaxed">
                            You are about to securely cast your vote for <strong className="text-gray-900">{selectedCandidate.name}</strong> from <strong>{selectedCandidate.party}</strong>. This action is final.
                        </p>
                        <div className="flex gap-4">
                            <button onClick={() => setSelectedCandidate(null)} className="flex-1 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition">Cancel</button>
                            <button onClick={handleVote} className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-0.5 transition flex items-center justify-center gap-2">
                                <i className="fa-solid fa-lock"></i> Submit Vote
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
