import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        /* ====================================================
           BACKEND TEAM INSTRUCTIONS: 
           Implement a POST endpoint at /api/auth/register
           Input JSON:  { voterId, name, age, college, email, phone, password, confirmPassword }
           Output JSON (Success 201): { message: "Registered Successfully", voterId }
           Output Error (400/500): Pure string error message or JSON { error: "msg" }
           ==================================================== */

        window.showAlert("✅ Test Registration Simulated!");
        setTimeout(() => navigate('/login'), 1500);
    };

    return (
        <div className="flex w-full min-h-screen bg-gray-50">
            {/* Left Box (Branding) */}
            <div className="hidden lg:flex flex-col justify-center items-center w-1/3 fixed top-0 left-0 bottom-0 bg-[#0f172a] overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                
                <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center text-white">
                    <div className="mb-10 w-4/5 max-w-sm mx-auto">
                        <img src="/src/assets/images/auth_bg.png" className="w-full h-auto drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]" alt="New Voter Registration" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Your Vote, Your Future</h2>
                    <p className="text-gray-300 max-w-sm mb-8 text-sm leading-relaxed">Join thousands of students exercising their democratic right through our secure platform.</p>
                </div>
            </div>

            {/* Right Form */}
            <div className="w-full lg:w-2/3 lg:ml-[33.333%] flex items-center justify-center py-12 px-6 sm:px-12 bg-gray-50 min-h-screen">
                <div className="w-full max-w-3xl bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 relative">
                    <div className="mb-10 text-center relative">
                        <div className="absolute left-0 top-0">
                            <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition bg-gray-50 hover:bg-blue-50 px-4 py-2 rounded-full border border-gray-200 hover:border-blue-200 shadow-sm">
                                <i className="fa-solid fa-arrow-left"></i> Home
                            </Link>
                        </div>
                        
                        <Link to="/" className="text-4xl font-bold cursor-pointer block mb-4 lg:hidden mt-12">Vote<span className="text-blue-600">Wise</span></Link>
                        <h2 className="text-3xl font-bold text-gray-900 mb-3 mt-4">Create Voter Account 🛂</h2>
                        <p className="text-gray-500">Register once to cast your vote securely and remotely.</p>
                    </div>

                    <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Legal Name</label>
                            <div className="relative">
                                <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input type="text" placeholder="As per your College ID" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                            <div className="relative">
                                <i className="fa-solid fa-calendar absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input type="number" min="18" placeholder="Must be 18+" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">College / Institution</label>
                            <div className="relative">
                                <i className="fa-solid fa-building-columns absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input type="text" placeholder="Enter your college name" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition" required />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input type="email" placeholder="example@college.edu" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                            <div className="relative">
                                <i className="fa-solid fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input type="tel" placeholder="+91 00000 00000" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition" required />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Voter ID</label>
                            <div className="relative">
                                <i className="fa-solid fa-id-card absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input type="text" placeholder="10 Digit ID" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Secure Password</label>
                            <div className="relative">
                                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input type="password" placeholder="••••••••" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                            <div className="relative">
                                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input type="password" placeholder="••••••••" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition" required />
                            </div>
                        </div>

                        <div className="md:col-span-2 mt-4">
                            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition duration-300 flex items-center justify-center gap-2 group">
                                <span>Create Voter Profile</span>
                                <i className="fa-solid fa-user-plus group-hover:scale-110 transition-transform"></i>
                            </button>
                        </div>
                    </form>

                    <p className="text-center mt-8 text-gray-600 font-medium">
                        Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log in securely</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
