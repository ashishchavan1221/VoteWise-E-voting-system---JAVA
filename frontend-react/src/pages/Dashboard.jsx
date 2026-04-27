import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [hasVoted, setHasVoted] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [loading, setLoading] = useState(true);

    const currentUser = localStorage.getItem('currentUser');
    const voterId = localStorage.getItem('voterId');
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser || !voterId) {
            alert('❌ Please login to access the dashboard');
            navigate('/login');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                const API_BASE = import.meta.env.VITE_API_URL || "";

                // 1. Check if user already voted
                const voteRes = await fetch(`${API_BASE}/api/vote/check`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ voterId })
                });
                const voteData = await voteRes.json();
                if (voteData.voted) setHasVoted(true);

                // 2. Fetch all candidates
                const candRes = await fetch(`${API_BASE}/api/candidates`);
                const candData = await candRes.json();
                setCandidates(candData);
            } catch (err) {
                console.error("Failed to fetch dashboard data");
            }
            setLoading(false);
        };

        fetchDashboardData();
    }, [currentUser, voterId, navigate]);

    const handleVote = async () => {
        if (!selectedCandidate) return;

        try {
            const API_BASE = import.meta.env.VITE_API_URL || "";
            const res = await fetch(`${API_BASE}/api/vote`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ voterId, candidateId: selectedCandidate.id })
            });

            if (res.ok) {
                setHasVoted(true);
                setSelectedCandidate(null);
            } else {
                const data = await res.json();
                alert(data.error || "Failed to vote");
            }
        } catch (err) {
            alert("Connection error while casting vote!");
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-xl font-bold">Loading secure portal...</div>;
    }

    if (hasVoted) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 md:p-10 bg-gradient-to-br from-[#121212] to-[#050505]">
                <div className="bg-white/5 backdrop-blur-2xl p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border border-white/10 max-w-3xl w-full text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-fuchsia-600/20 rounded-full blur-[100px] animate-pulse delay-700"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-tr from-fuchsia-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl md:text-5xl shadow-[0_0_30px_rgba(217,70,239,0.3)] mb-8 animate-bounce">
                            <i className="fa-solid fa-check"></i>
                        </div>
                        
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                            Thank You <br className="sm:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400">For Voting!</span>
                        </h2>
                        
                        <div className="bg-white/5 p-5 md:p-8 rounded-3xl mb-10 border border-white/10 shadow-inner max-w-xl">
                            <h3 className="text-lg md:text-xl font-bold text-fuchsia-300 mb-3 uppercase tracking-widest">Election Integrity Secured</h3>
                            <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-medium">
                                Your voice has been cryptographically secured in our database. By participating today, you've strengthened our democracy. Every vote is a stepping stone to a better future.
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto">
                            <button onClick={() => navigate('/results')} className="flex-1 bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg md:text-xl shadow-xl hover:shadow-indigo-500/20 hover:scale-[1.02] transition active:scale-95">
                                <i className="fa-solid fa-chart-pie mr-2"></i> Live Results
                            </button>
                            <button onClick={() => { localStorage.clear(); navigate('/'); }} className="flex-1 bg-zinc-900 border border-zinc-800 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition active:scale-95">
                                <i className="fa-solid fa-right-from-bracket mr-2"></i> Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-fuchsia-50 min-h-screen">
            <header className="bg-[#310c3b] text-white pt-24 pb-16 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen blur-3xl opacity-30 animate-blob"></div>
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <p className="inline-block px-4 py-1.5 bg-fuchsia-500/20 text-fuchsia-300 rounded-full text-sm font-semibold mb-4 border border-fuchsia-500/30 backdrop-blur-md shadow-sm">
                            <i className="fa-solid fa-shield-check mr-2"></i>Secure Standard Voting
                        </p>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Welcome back, <span className="text-pink-400">{currentUser}</span>!</h1>
                        <p className="text-lg text-gray-300 max-w-2xl">Please review the 10 candidate manifestos carefully. Your vote is confidential and can only be cast exactly once.</p>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20 pb-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {candidates.map(candidate => (
                        <div key={candidate.id} className="bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300 p-6 flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-inner text-4xl">
                                    {candidate.symbol}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{candidate.name}</h3>

                            <hr className="border-fuchsia-100 my-4 mt-auto" />

                            <button onClick={() => setSelectedCandidate(candidate)} className="w-full py-3 bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-800 font-bold rounded-xl hover:bg-pink-600 hover:text-white hover:border-pink-600 hover:shadow-lg hover:shadow-pink-500/30 transition flex items-center justify-center gap-2">
                                <i className="fa-solid fa-check-to-slot"></i> Vote
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {selectedCandidate && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#310c3b]/80 backdrop-blur-md" onClick={() => setSelectedCandidate(null)}></div>
                    <div className="bg-white rounded-3xl shadow-2xl border border-fuchsia-100 w-full max-w-md relative z-10 overflow-hidden transform transition-all p-8 scale-100">
                        <div className="w-20 h-20 mx-auto bg-fuchsia-50 text-fuchsia-600 rounded-full flex items-center justify-center mb-6 text-4xl shadow-inner border border-fuchsia-100">
                            {selectedCandidate.symbol}
                        </div>
                        <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">Confirm Your Vote</h3>
                        <p className="text-center text-gray-600 mb-8 leading-relaxed">
                            You are placing a legal vote for <strong className="text-fuchsia-900 text-lg">{selectedCandidate.name}</strong>. This is permanently encrypted.
                        </p>
                        <div className="flex gap-4">
                            <button onClick={() => setSelectedCandidate(null)} className="flex-1 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition">Cancel</button>
                            <button onClick={handleVote} className="flex-1 py-4 bg-pink-600 text-white font-bold rounded-2xl shadow-lg shadow-pink-500/30 hover:bg-pink-700 transition">Submit Vote</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
