import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [voterId, setVoterId] = useState('');
    const [aadharCard, setAadharCard] = useState('');
    const [password, setPassword] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaData, setCaptchaData] = useState({ id: '', text: '' });
    const [loading, setLoading] = useState(false);
    
    const canvasRef = useRef(null);
    const navigate = useNavigate();

    const fetchCaptcha = async () => {
        try {
            const API_BASE = import.meta.env.VITE_API_URL || "";
            const res = await fetch(`${API_BASE}/api/auth/captcha`);
            const data = await res.json();
            setCaptchaData({ id: data.captchaId, text: data.text });
            drawCaptcha(data.text);
        } catch (err) {
            console.error("Failed to load captcha", err);
        }
    };

    const drawCaptcha = (text) => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, 160, 54);
        // Background noise
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, 160, 54);
        
        ctx.font = 'bold 24px monospace';
        ctx.fillStyle = '#1e3a8a';
        // Assembled text drawing with slight rotation to make it Captcha-like
        for(let i=0; i<text.length; i++) {
            ctx.save();
            ctx.translate(20 + (i*20), 30);
            ctx.rotate((Math.random() - 0.5) * 0.4);
            ctx.fillText(text[i], 0, 0);
            ctx.restore();
        }
        // Draw interference lines
        for(let j=0; j<5; j++) {
            ctx.strokeStyle = '#9ca3af';
            ctx.beginPath();
            ctx.moveTo(Math.random()*150, Math.random()*50);
            ctx.lineTo(Math.random()*150, Math.random()*50);
            ctx.stroke();
        }
    };

    useEffect(() => {
        fetchCaptcha();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const API_BASE = import.meta.env.VITE_API_URL || "";
            const res = await fetch(`${API_BASE}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    voterId, 
                    aadharCard,
                    password,
                    captchaId: captchaData.id,
                    captchaAnswer: captchaInput
                })
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("currentUser", data.name);
                localStorage.setItem("voterId", data.voterId);
                alert("✅ Secure Login Successful!");
                navigate('/dashboard');
            } else {
                alert("❌ " + (data.error || "Login Failed"));
                fetchCaptcha(); // Refresh captcha on fail
                setCaptchaInput('');
            }
        } catch (err) {
            console.error(err);
            alert("Error: " + err.message + " (Check console for details)");
        }
        setLoading(false);
    };

    return (
        <div className="flex w-full min-h-screen bg-fuchsia-50">
            <div className="hidden lg:flex flex-col justify-center items-center w-1/2 relative overflow-hidden bg-[#310c3b]">
                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-overlay" style={{backgroundImage: "url('https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"}}></div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/80 to-[#310c3b]/95"></div>

                <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-blob"></div>
                <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center text-white">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-2xl">
                        <i className="fa-solid fa-lock text-3xl text-pink-300"></i>
                    </div>
                    <h2 className="text-4xl font-extrabold mb-4 drop-shadow-md">Secure. Anonymous. <br/>Verifiable.</h2>
                    <p className="text-lg text-gray-300 max-w-sm font-medium">Join the digital revolution of democracy. Your vote is protected by military-grade end-to-end encryption.</p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white shadow-xl lg:shadow-none max-w-2xl mx-auto rounded-3xl m-4 lg:m-0 z-10 relative">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-pink-600 transition mb-6 bg-fuchsia-50 px-4 py-2 rounded-full border border-fuchsia-100">
                            <i className="fa-solid fa-arrow-left"></i> Back to Home
                        </Link>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back! 👋</h2>
                        <p className="text-gray-500">Please enter your credentials to login and cast your vote.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Voter ID Number</label>
                            <input type="text" value={voterId} onChange={e=>setVoterId(e.target.value)} placeholder="00000000" className="w-full px-4 py-3 bg-fuchsia-50/50 border border-fuchsia-200 rounded-xl focus:ring-2 focus:ring-pink-500" required />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhar Card Number</label>
                            <input type="text" value={aadharCard} onChange={e=>setAadharCard(e.target.value)} placeholder="12 Digit Aadhar Number" maxLength="12" className="w-full px-4 py-3 bg-fuchsia-50/50 border border-fuchsia-200 rounded-xl focus:ring-2 focus:ring-pink-500 font-mono tracking-widest" required />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 bg-fuchsia-50/50 border border-fuchsia-200 rounded-xl focus:ring-2 focus:ring-pink-500" required />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-semibold text-gray-700">Security CAPTCHA</label>
                                <button type="button" onClick={fetchCaptcha} className="text-pink-600 font-bold text-xs flex items-center gap-1 hover:underline active:scale-95 transition">
                                    <i className="fa-solid fa-arrows-rotate"></i> Refresh CAPTCHA
                                </button>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                                <div className="border-2 border-fuchsia-200 rounded-xl overflow-hidden relative shadow-sm bg-white shrink-0 mx-auto sm:mx-0" style={{width: '160px', height: '54px'}}>
                                    <canvas ref={canvasRef} width="160" height="54" className="cursor-pointer" onClick={fetchCaptcha} title="Click to refresh"></canvas>
                                </div>
                                <input 
                                    type="text" 
                                    value={captchaInput} 
                                    onChange={e=>setCaptchaInput(e.target.value.toUpperCase())} 
                                    placeholder="Type Code" 
                                    maxLength="6" 
                                    className="w-full sm:flex-1 px-4 py-3 bg-fuchsia-50/50 border border-fuchsia-200 rounded-xl focus:ring-2 focus:ring-pink-500 font-mono font-bold tracking-widest text-center" 
                                    required 
                                />
                            </div>
                            <p className="text-[10px] md:text-xs text-gray-400">Can't read it? Use the <b>Refresh</b> link above to generate a new code.</p>
                        </div>

                        <button type="submit" disabled={loading} className="w-full mt-6 bg-pink-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-pink-600/30 hover:bg-pink-700 transition">
                            {loading ? "Authenticating..." : "Secure Login"}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-gray-600 font-medium">
                        Don't have an account yet? <Link to="/register" className="text-pink-600 font-bold hover:underline">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
