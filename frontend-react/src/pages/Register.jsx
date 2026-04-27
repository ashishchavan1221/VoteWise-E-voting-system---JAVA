import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ voterId: '', aadharCard: '', name: '', age: '', college: '', email: '', phone: '', password: '', confirmPassword: '' });
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            const API_BASE = import.meta.env.VITE_API_URL || "";
            const res = await fetch(`${API_BASE}/api/auth/register-init`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            
            if (res.ok || res.status === 201) {
                alert("Registration Successful!");
                navigate('/login');
            } else {
                alert(data.error || "Failed to register");
            }
        } catch (err) {
            alert("Server connection failed. Is the Java backend running?");
        }
        setLoading(false);
    };

    return (
        <div className="flex w-full min-h-screen bg-fuchsia-50">
            <div className="hidden lg:flex flex-col justify-center items-center w-1/3 fixed top-0 left-0 bottom-0 bg-[#310c3b] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-overlay" style={{backgroundImage: "url('https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"}}></div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-900/90 to-[#310c3b]/90"></div>

                <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-blob"></div>
                <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center text-white space-y-6">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
                        <i className="fa-solid fa-fingerprint text-2xl text-pink-300"></i>
                    </div>
                    <h2 className="text-3xl font-extrabold mb-2 drop-shadow-lg">Your Voice,<br/>Your Choice</h2>
                    <p className="text-pink-100 max-w-sm text-sm leading-relaxed font-medium">Join thousands exercising their democratic right through our highly secure platform.</p>
                </div>
            </div>

            <div className="w-full lg:w-2/3 lg:ml-[33.333%] flex items-center justify-center py-12 px-6 sm:px-12 bg-fuchsia-50 min-h-screen">
                <div className="w-full max-w-3xl bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-fuchsia-100 relative">
                    <div className="mb-10 text-center relative">
                        <Link to="/" className="text-4xl font-bold cursor-pointer block mb-4 lg:hidden mt-12">Vote<span className="text-pink-600">Wise</span></Link>
                        <h2 className="text-3xl font-bold text-gray-900 mb-3 mt-4">Create Voter Account 🛂</h2>
                        <p className="text-gray-500">Register once to cast your vote securely.</p>
                    </div>

                    <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Legal Name</label>
                            <input type="text" name="name" onChange={handleInputChange} placeholder="As per ID" className="w-full px-4 py-3 bg-fuchsia-50/50 border border-fuchsia-200 rounded-xl focus:ring-2 focus:ring-pink-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Voter ID</label>
                            <input type="text" name="voterId" onChange={handleInputChange} placeholder="Unique 10 Digit ID" className="w-full px-4 py-3 bg-fuchsia-50/50 border border-fuchsia-200 rounded-xl focus:ring-2 focus:ring-pink-500" required />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhar Card Number</label>
                            <input type="text" name="aadharCard" onChange={handleInputChange} placeholder="12 Digit Aadhar Number" maxLength="12" className="w-full px-4 py-3 bg-fuchsia-50/50 border border-fuchsia-200 rounded-xl focus:ring-2 focus:ring-pink-500 font-mono tracking-widest" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                            <input type="number" name="age" onChange={handleInputChange} min="18" placeholder="Must be 18+" className="w-full px-4 py-3 bg-fuchsia-50/50 border border-fuchsia-200 rounded-xl focus:ring-2 focus:ring-pink-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">College / Institution</label>
                            <input type="text" name="college" onChange={handleInputChange} placeholder="Your college" className="w-full px-4 py-3 bg-fuchsia-50/50 border border-fuchsia-200 rounded-xl focus:ring-2 focus:ring-pink-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <input type="email" name="email" onChange={handleInputChange} placeholder="example@college.edu" className="w-full px-4 py-3 bg-fuchsia-50/50 border border-fuchsia-200 rounded-xl focus:ring-2 focus:ring-pink-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Secure Password</label>
                            <input type="password" name="password" onChange={handleInputChange} placeholder="••••••••" className="w-full px-4 py-3 bg-fuchsia-50/50 border border-fuchsia-200 rounded-xl focus:ring-2 focus:ring-pink-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                            <input type="password" name="confirmPassword" onChange={handleInputChange} placeholder="••••••••" className="w-full px-4 py-3 bg-fuchsia-50/50 border border-fuchsia-200 rounded-xl focus:ring-2 focus:ring-pink-500" required />
                        </div>
                        <div className="md:col-span-2 mt-4">
                            <button type="submit" disabled={loading} className="w-full bg-pink-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-pink-600/30 hover:bg-pink-700 transition">
                                {loading ? "Registering..." : "Create Account"}
                            </button>
                        </div>
                    </form>

                    <p className="text-center mt-8 text-gray-600 font-medium">Already have an account? <Link to="/login" className="text-pink-600 font-bold hover:underline">Log in</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;
