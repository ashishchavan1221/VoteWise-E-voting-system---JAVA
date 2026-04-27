import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/vote logo.png';

function Header() {
    const location = useLocation();
    const currentUser = localStorage.getItem('currentUser');

    if (location.pathname === '/dashboard' || location.pathname === '/results') {
        return (
            <nav className="bg-[#0f172a] text-white py-4 px-6 border-b border-white/5 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
                    <Link to="/" className="flex items-center gap-2 md:gap-3 hover:scale-[1.02] transition-transform">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl flex items-center justify-center overflow-hidden shadow-lg border border-white/20 transform -rotate-6">
                            <img src={logo} className="w-full h-full object-contain p-1" alt="Logo" />
                        </div>
                        <span className="text-xl md:text-2xl font-extrabold tracking-tight text-white transition-all">Vote<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400">Wise</span></span>
                    </Link>
                    <div className="flex items-center gap-2 md:gap-6">
                        <Link to="/results" className="font-semibold text-gray-300 hover:text-white transition group flex items-center gap-1 md:gap-2 text-xs md:text-base">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500 animate-pulse"></span>
                            Live Data
                        </Link>
                        <div className="flex items-center gap-2 md:gap-3 bg-gray-800/50 px-2 md:px-4 py-1.5 md:py-2 rounded-full border border-gray-700 shadow-inner">
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs md:text-sm font-bold shadow-[0_0_10px_rgba(37,99,235,0.6)]">
                                {currentUser ? currentUser.charAt(0) : 'U'}
                            </div>
                            <span className="font-semibold text-xs md:text-sm hidden sm:inline">{currentUser || 'Guest'}</span>
                        </div>
                        <button onClick={() => { localStorage.removeItem('currentUser'); window.location.href = '/'; }} className="w-8 h-8 md:w-10 md:h-10 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition shadow-lg">
                            <i className="fa-solid fa-power-off text-xs md:text-base"></i>
                        </button>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="sticky top-0 left-0 right-0 z-50 bg-[#0f172a] border-b border-white/5 shadow-xl">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <Link to="/" className="flex items-center gap-3 bg-[#1e293b] border border-white/10 px-5 py-2.5 rounded-full shadow-lg hover:-translate-y-1 transition duration-300 group hover:shadow-fuchsia-500/20">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-lg border border-white/20 transform group-hover:-rotate-12 transition-transform duration-300">
                        <img src={logo} className="w-full h-full object-contain p-1" alt="Logo" />
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight text-white pr-2 transition-all">Vote<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400">Wise</span></span>
                </Link>

                <div className="hidden md:flex items-center gap-1 bg-[#1e293b] border border-white/10 p-1.5 rounded-full shadow-inner">
                    <a href="#how-it-works" className="px-5 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all flex items-center gap-2"><i className="fa-solid fa-shoe-prints text-xs"></i> How It Works</a>
                    <a href="#faq" className="px-5 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all">FAQ</a>
                    <Link to={currentUser ? "/results" : "/login"} className="px-5 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse hidden md:block"></span> Live Results
                    </Link>
                </div>

                <div className="flex items-center gap-2 bg-[#1e293b] border border-white/10 p-1.5 rounded-full shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300">
                    <Link to="/login" className="px-6 py-2.5 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors">Login</Link>
                    <Link to="/register" className="px-6 py-2.5 text-sm font-bold bg-white text-[#0f172a] rounded-full shadow-md hover:bg-blue-50 hover:-translate-y-0.5 transition-all flex items-center gap-2">Register <i className="fa-solid fa-arrow-right-to-bracket"></i></Link>
                </div>
            </div>
        </nav>
    );
}

export default Header;
