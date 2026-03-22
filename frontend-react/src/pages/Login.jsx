import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [voterId, setVoterId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        /* ====================================================
           BACKEND TEAM INSTRUCTIONS: 
           Implement a POST endpoint at /api/auth/login
           Input JSON:  { "voterId": "...", "password": "..." }
           Output JSON (Success 200/201): { "voterId": "...", "token": "..." }
           Output Error (400/401/500): Pure string error message or JSON { "error": "msg" }
           ==================================================== */

        console.log("Simulating Login for:", voterId);
        localStorage.setItem("currentUser", voterId);
        window.showAlert("✅ Test Login Simulated!");
        setTimeout(() => navigate('/dashboard'), 1500);
    };

    return (
        <div className="flex w-full min-h-screen bg-gray-50">
            {/* Left Box (Branding) */}
            <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-[#0f172a] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                
                <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center text-white">
                    <div className="mb-10 w-4/5 max-w-md mx-auto">
                        <img src="/src/assets/images/auth_bg.png" className="w-full h-auto drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]" alt="Secure Voting" />
                    </div>
                    <h2 className="text-4xl font-bold mb-4">Secure. Anonymous. Verifiable.</h2>
                    <p className="text-lg text-gray-300 max-w-sm">Join the digital revolution of democracy. Your vote is protected by military-grade encryption.</p>
                </div>
            </div>

            {/* Right Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white shadow-xl lg:shadow-none w-full max-w-2xl mx-auto rounded-3xl m-4 lg:m-0 z-10 relative">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition mb-8 bg-gray-50 hover:bg-blue-50 px-4 py-2 rounded-full border border-gray-200 hover:border-blue-200 shadow-sm">
                            <i className="fa-solid fa-arrow-left"></i> Back to Home
                        </Link>
                        
                        <Link to="/" className="text-4xl font-bold cursor-pointer block mb-6 lg:hidden">Vote<span className="text-blue-600">Wise</span></Link>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back! 👋</h2>
                        <p className="text-gray-500">Please enter your credentials to login and cast your vote.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Voter ID Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i className="fa-solid fa-id-card text-gray-400"></i>
                                </div>
                                <input type="text" value={voterId} onChange={e=>setVoterId(e.target.value)} placeholder="Enter your 8-digit Voter ID" className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i className="fa-solid fa-lock text-gray-400"></i>
                                </div>
                                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition" required />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition duration-300 flex items-center justify-center gap-2 group">
                            <span>Secure Login</span>
                            <i className="fa-solid fa-arrow-right-to-bracket group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    </form>

                    <p className="text-center mt-8 text-gray-600 font-medium">
                        Don't have an account yet? <Link to="/register" className="text-blue-600 font-bold hover:underline">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
