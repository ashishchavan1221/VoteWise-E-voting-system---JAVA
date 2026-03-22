import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#0B1120] text-gray-400 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[100px] bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-[100%] blur-[80px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-full flex items-center justify-center overflow-hidden shadow-lg shadow-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                            <img src="/src/assets/images/images.png" className="w-full h-full object-cover p-1 rounded-full mix-blend-screen" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-white">Vote<span className="text-blue-400">Wise</span></span>
                    </div>
                    <p className="text-gray-400 max-w-sm leading-relaxed text-sm">Empowering the digital democracy of the future. VoteWise is a secure, verifiable, and transparent online e-voting system designed to modernize college and organization elections.</p>
                </div>
                
                <div>
                    <h4 className="text-white font-bold mb-6 tracking-wide">Quick Links</h4>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/login" className="hover:text-blue-400 transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-xs"></i> Voter Login</Link></li>
                        <li><Link to="/register" className="hover:text-blue-400 transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-xs"></i> New Registration</Link></li>
                        <li><Link to="/results" className="hover:text-blue-400 transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-xs"></i> Live Election Results</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6 tracking-wide">Connect</h4>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#0B1120] hover:scale-110 transition-all">
                            <i className="fa-brands fa-github text-lg"></i>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white hover:scale-110 transition-all">
                            <i className="fa-brands fa-twitter text-lg"></i>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white hover:scale-110 transition-all">
                            <i className="fa-brands fa-linkedin-in text-lg"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm font-medium">© 2026 VoteWise. An MCA Project.</p>
                <div className="text-xs bg-white/5 px-5 py-2.5 rounded-full border border-white/10 flex items-center gap-2 shadow-inner">
                    <span className="text-white font-bold">MCA Final Project</span> | Lovely Professional University
                </div>
            </div>
        </div>
    </footer>
  );
}

export default Footer;
