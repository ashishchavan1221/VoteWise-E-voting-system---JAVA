import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
                        <h1 className="text-6xl md:text-7xl font-extrabold text-[#0f172a] leading-tight tracking-tighter drop-shadow-sm">
                            Secure Online<br/>E-Voting System
                        </h1>
                        <p className="text-3xl font-bold text-blue-600 drop-shadow-sm">Your Vote. India’s Future — Now Online 🇮🇳</p>

                        <div className="flex gap-6">
                            <Link to="/login" className="px-10 py-5 bg-white text-[#0f172a] rounded-3xl font-bold text-xl flex items-center gap-3 shadow-xl hover:scale-105 transition">
                                Login to Vote
                            </Link>
                            <Link to="/register" className="px-10 py-5 border-2 border-white/80 rounded-3xl font-bold text-xl flex items-center gap-3 hover:bg-white hover:text-[#0f172a] transition">
                                Register Now
                            </Link>
                        </div>

                        {/* Trust badges */}
                        <div className="flex items-center gap-8 pt-6">
                            <div className="flex items-center gap-2"><i className="fa-solid fa-shield-halved text-3xl"></i> <span className="font-medium">100% Secure</span></div>
                            <div className="flex items-center gap-2"><i className="fa-solid fa-users text-3xl"></i> <span className="font-medium">New for College Students</span></div>
                            <div className="flex items-center gap-2"><i className="fa-solid fa-users-line text-3xl"></i> <span className="font-medium">For All Indian Voters</span></div>
                        </div>
                    </div>

                    <div className="relative flex justify-center">
                        <img src="/src/assets/images/icon 1.png" className="w-full max-w-4xl rounded-3xl shadow-lg" alt="VoteWise Ballot Box" />
                    </div>
                </div>
            </section>

            {/* WHY VOTING IS IMPORTANT */}
            <section className="py-24 bg-white relative overflow-hidden" data-aos="fade-up">
                <div className="absolute -right-20 top-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute -left-20 bottom-20 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative group rounded-3xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-blue-600/20 group-hover:bg-transparent transition duration-500 z-10"></div>
                            <img src="/src/assets/images/votewise_hero.png" alt="Importance of Voting" className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-out" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f172a] to-transparent pt-20 pb-8 px-8 z-20">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full font-semibold text-xs mb-3">VoteWise</div>
                                <h3 className="text-white text-3xl font-bold">Your Voice Matters</h3>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-semibold text-sm">
                                <i className="fa-solid fa-bolt"></i><span>Empowering Democracy</span>
                            </div>
                            <h2 className="text-5xl font-extrabold text-[#0f172a] leading-tight tracking-tight">Why We Vote & <br/>Why It Is Important</h2>
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
            <section className="py-24 bg-[#0f172a] relative border-t border-gray-800" data-aos="fade-up">
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm mb-4">
                            <i className="fa-solid fa-shoe-prints"></i><span>Simple Steps</span>
                        </div>
                        <h2 className="text-5xl font-extrabold text-[#0f172a] tracking-tight">How It Works</h2>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8 relative items-start">
                        <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"></div>
                        
                        {["Register", "Login Securely", "Cast Your Vote", "See Live Results"].map((step, i) => (
                           <div key={i} className="text-center relative z-10 group">
                                <div className="w-20 h-20 mx-auto bg-white border-4 border-blue-600 text-blue-600 shadow-xl rounded-full flex items-center justify-center text-3xl font-bold mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition">
                                    {i+1}
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full font-semibold text-sm mb-4">
                            <i className="fa-solid fa-circle-question"></i><span>Got Questions?</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
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
