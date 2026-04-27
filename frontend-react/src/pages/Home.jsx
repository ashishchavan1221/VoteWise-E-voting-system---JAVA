import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import heroCollage from '../assets/images/image.png';
import voterIcon from '../assets/images/vote logo.png';

function Home() {
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const faqs = [
        {
            q: "Is online voting completely secure?",
            a: "Absolutely. VoteWise uses military-grade end-to-end encryption. Once cast, your vote is completely anonymized and locked into our secure database. No one can trace the vote to you."
        },
        {
            q: "Who is eligible to vote on this platform?",
            a: "Any college student aged 18 or older who is studying away from their home registered constituency is eligible to register and vote remotely using our college-verified system."
        },
        {
            q: "Can I change my vote after submitting it?",
            a: "No. To maintain strict election integrity, you can only vote exactly ONCE per election. Once a vote is confirmed and submitted, it becomes permanently locked into the system."
        },
        {
            q: "Is there any fee to use VoteWise?",
            a: "No, VoteWise is 100% free. Voting is a fundamental constitutional right, and our system ensures there are no monetary barriers to casting your ballot safely."
        }
    ];

    return (
        <div className="bg-gray-50 overflow-hidden">
            {/* HERO SECTION */}
            <section className="hero-bg relative">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="space-y-8">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#310c3b] leading-tight tracking-tighter drop-shadow-sm text-center md:text-left">
                            Secure Online<br className="hidden md:block" /> E-Voting System
                        </h1>
                        <p className="text-xl md:text-2xl lg:text-3xl font-bold text-pink-600 drop-shadow-sm text-center md:text-left">Your Vote. India’s Future — Now Online 🇮🇳</p>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
                            <Link to="/login" className="px-8 md:px-10 py-4 md:py-5 bg-pink-600 text-white rounded-2xl md:rounded-3xl font-bold text-lg md:text-xl flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition">
                                Login to Vote
                            </Link>
                            <Link to="/register" className="px-8 md:px-10 py-4 md:py-5 border-2 border-pink-200 text-pink-700 bg-white rounded-2xl md:rounded-3xl font-bold text-lg md:text-xl flex items-center justify-center gap-3 hover:bg-pink-50 transition text-center">
                                Register Now
                            </Link>
                        </div>

                        {/* Trust badges */}
                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 md:gap-8 pt-6">
                            <div className="flex items-center gap-2"><i className="fa-solid fa-shield-halved text-2xl md:text-3xl text-blue-600"></i> <span className="font-semibold text-sm md:text-base">100% Secure</span></div>
                            <div className="flex items-center gap-2"><i className="fa-solid fa-users text-2xl md:text-3xl text-indigo-600"></i> <span className="font-semibold text-sm md:text-base">New for College</span></div>
                            <div className="flex items-center gap-2"><i className="fa-solid fa-users-line text-2xl md:text-3xl text-emerald-600"></i> <span className="font-semibold text-sm md:text-base">For All Voters</span></div>
                        </div>
                    </div>

                    <div className="relative flex justify-center w-full mt-10 md:mt-16">
                        <div className="relative z-20 w-full max-w-2xl transform hover:scale-105 transition duration-700 animate-float">
                            <div className="relative p-2 md:p-4 bg-white/20 backdrop-blur-md rounded-[2.5rem] md:rounded-[4rem] border-2 border-white/40 shadow-2xl overflow-hidden group">
                                <img
                                    src={heroCollage}
                                    alt="Artistic Voting Collage"
                                    className="w-full h-auto rounded-[2rem] md:rounded-[3.5rem] shadow-inner group-hover:scale-110 transition duration-700"
                                />

                                {/* Artistic Floating Overlays to match the collage look */}
                                <div className="absolute top-10 left-10 transform -rotate-12 bg-pink-600 text-white px-5 py-2 rounded-xl font-black shadow-2xl border border-white/20 animate-pulse">
                                    VOTE!
                                </div>
                                <div className="absolute bottom-20 left-12 transform rotate-3 bg-[#310c3b] text-white px-6 py-2 rounded-xl font-bold shadow-2xl border border-fuchsia-500/30">
                                    Your Voice Matters
                                </div>
                                <div className="absolute top-20 right-10 transform rotate-45 bg-indigo-600 text-white p-3 rounded-2xl shadow-2xl animate-bounce-slow">
                                    <i className="fa-solid fa-check text-2xl"></i>
                                </div>
                            </div>

                            {/* Main Floating Detail Badge */}
                            <div className="absolute -bottom-6 -left-4 md:-left-8 bg-white/95 backdrop-blur-2xl p-4 md:p-5 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.2)] border border-white flex items-center gap-4 md:gap-5 animate-float" style={{ animationDelay: '-2s' }}>
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white rounded-[1.2rem] md:rounded-[1.5rem] flex items-center justify-center text-xl md:text-2xl shadow-lg shadow-fuchsia-500/20">
                                    <i className="fa-solid fa-stamp"></i>
                                </div>
                                <div>
                                    <p className="text-[10px] md:text-[11px] uppercase font-black text-fuchsia-600 tracking-[0.2em] leading-none mb-1.5">Verified Selection</p>
                                    <p className="text-gray-900 font-black text-lg md:text-xl leading-none tracking-tight">Vote Wise!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Decorative floating elements */}
                    <div className="absolute top-10 -left-10 md:-left-20 w-32 h-32 bg-pink-500/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute bottom-10 -right-10 w-32 h-32 bg-blue-500/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                </div>
            </section>

            {/* WHY VOTING IS IMPORTANT */}
            <section className="py-24 bg-white relative overflow-hidden" data-aos="fade-up">
                <div className="absolute -right-20 top-20 w-72 h-72 bg-fuchsia-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute -left-20 bottom-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative group rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] bg-gradient-to-br from-indigo-900 via-[#1b0b2e] to-fuchsia-900 border border-fuchsia-800/50 flex flex-col items-center justify-center">
                            {/* Abstract Digital Identity Visual */}
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNHYtbDItMi0ybC0yLTIuNXYxMS41aC0xNXYtMTEuNWwtMi0yLjVsLTItMmwtMiAyVjM0SDZ2MTVoMTVWMzhsMi0yLjVsMi0ybDIgMi41djExaDE1di0xMS41bDItMi41bDItMmw0IDJWNDloMTVWNDloLTE1VjM4bDItMi41bDItMmwyIDIuNVYzNEgzNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1b0b2e] via-transparent to-transparent z-10"></div>

                            <div className="relative z-20 flex flex-col items-center justify-center p-8 text-center group-hover:scale-105 transition duration-700 pointer-events-none">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-fuchsia-500/50 flex items-center justify-center bg-white/5 backdrop-blur-sm shadow-[0_0_50px_rgba(217,70,239,0.2)] mb-8 relative">
                                    <div className="absolute inset-2 border-2 border-dashed border-indigo-400/50 rounded-full animate-[spin_20s_linear_infinite]"></div>
                                    <i className="fa-solid fa-fingerprint text-6xl md:text-7xl text-fuchsia-400 drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]"></i>
                                </div>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-fuchsia-500/20 border border-fuchsia-500/40 text-fuchsia-100 rounded-full font-bold text-xs uppercase tracking-widest mb-4">
                                    <i className="fa-solid fa-lock text-[10px]"></i> Cryptographic Verification
                                </div>
                                <h3 className="text-white text-2xl md:text-3xl font-black tracking-tight">Your Identity, Secured.</h3>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-full font-semibold text-sm">
                                <i className="fa-solid fa-bolt"></i><span>Empowering Democracy</span>
                            </div>
                            <h2 className="text-5xl font-extrabold text-[#310c3b] leading-tight tracking-tight">Why We Vote & <br />Why It Is Important</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">Voting is not just a constitutional right; it is our primary instrument to shape the future of our nation. By voting, we elect leaders who reflect our values, solve our community's challenges, and protect our freedoms.</p>

                            <ul className="space-y-6 mt-8">
                                <li className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex justify-center items-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                                        <i className="fa-solid fa-scale-balanced text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-[#0f172a]">Democratic Equality</h4>
                                        <p className="text-gray-600 mt-1">Every vote carries the same weight. It guarantees that the voice of every citizen is heard, regardless of background.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100">
                                    <div className="w-12 h-12 rounded-2xl bg-green-500 text-white flex justify-center items-center flex-shrink-0 shadow-lg shadow-green-500/30">
                                        <i className="fa-solid fa-hands-holding-child text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-[#0f172a]">Future Generations</h4>
                                        <p className="text-gray-600 mt-1">The decisions made today shape the economy, environment, and opportunities for the future of India.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-24 bg-[#310c3b] relative border-t border-fuchsia-900" data-aos="fade-up">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <h2 className="text-5xl font-extrabold text-white tracking-tight mb-6">Powerful Features</h2>
                        <p className="text-xl text-gray-400">Experience a modern voting system engineered for maximum security, speed, and reliability.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* 4 Feature cards abstracted directly */}
                        {["End-to-End Secure", "Vote from Hostel", "Live Results", "Mobile Friendly"].map((t, i) => (
                            <div key={i} className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl hover:bg-gray-800 p-8 text-center transition shadow-2xl hover:-translate-y-2">
                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl shadow-lg flex items-center justify-center mb-6 text-4xl text-white transform group-hover:scale-110">
                                    <i className={`fa-solid ${["fa-shield-halved", "fa-laptop", "fa-chart-line", "fa-mobile-screen"][i]}`}></i>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{t}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" className="py-24 bg-gray-50 relative" data-aos="fade-up">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-full font-semibold text-sm mb-4">
                            <i className="fa-solid fa-shoe-prints"></i><span>Simple Steps</span>
                        </div>
                        <h2 className="text-5xl font-extrabold text-[#310c3b] tracking-tight">How It Works</h2>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8 relative items-start">
                        <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"></div>

                        {["Register", "Login Securely", "Cast Your Vote", "See Live Results"].map((step, i) => (
                            <div key={i} className="text-center relative z-10 group">
                                <div className="w-20 h-20 mx-auto bg-white border-4 border-blue-600 text-blue-600 shadow-xl rounded-full flex items-center justify-center text-3xl font-bold mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition">
                                    {i + 1}
                                </div>
                                <h4 className="font-bold text-2xl text-[#0f172a] mb-3">{step}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-24 bg-white border-t border-gray-100" data-aos="fade-up">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-50 text-fuchsia-600 rounded-full font-semibold text-sm mb-4">
                            <i className="fa-solid fa-circle-question"></i><span>Got Questions?</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#310c3b]">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-4 max-w-3xl mx-auto text-left">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                onClick={() => toggleFaq(index)}
                                className={`border border-gray-200 rounded-2xl p-4 sm:p-6 transition-all duration-300 cursor-pointer ${openFaqIndex === index ? 'bg-white shadow-xl shadow-blue-900/5 border-blue-200 scale-[1.02]' : 'bg-gray-50/50 hover:bg-white hover:shadow-md'}`}
                            >
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 group flex justify-between items-center select-none gap-4">
                                    {faq.q}
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${openFaqIndex === index ? 'bg-blue-600 text-white rotate-[135deg] shadow-md' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'}`}>
                                        <i className="fa-solid fa-plus text-sm"></i>
                                    </div>
                                </h3>
                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaqIndex === index ? 'max-h-60 sm:max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
