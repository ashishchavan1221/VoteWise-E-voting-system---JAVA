import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, RadialLinearScale } from 'chart.js';
import { Bar, Doughnut, Line, PolarArea } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, RadialLinearScale);

function Results() {
    const [chartData, setChartData] = useState(null);
    const [doughnutData, setDoughnutData] = useState(null);
    const [lineData, setLineData] = useState(null);
    const [polarData, setPolarData] = useState(null);
    const [totalVotes, setTotalVotes] = useState(0);
    const [avgVotes, setAvgVotes] = useState(0);
    const [candidateStats, setCandidateStats] = useState([]);
    const [expandedChart, setExpandedChart] = useState(null);
    
    const navigate = useNavigate();
    const currentUser = localStorage.getItem('currentUser');

    const chartColors = [
        "#ff4d4d", "#ff944d", "#ffd633", "#ff66b3", "#33ccff", 
        "#4dff88", "#b366ff", "#ff5050", "#ffcc00", "#3399ff"
    ];

    useEffect(() => {
        // Security Check
        if (!currentUser) {
            alert('❌ Please login to view secure results.');
            navigate('/login');
            return;
        }

        const fetchResults = async () => {
            try {
                const API_BASE = import.meta.env.VITE_API_URL || "";
                const candRes = await fetch(`${API_BASE}/api/candidates`);
                let stats = await candRes.json();
                
                // Sort by highest votes
                stats.sort((a, b) => b.votes - a.votes);

                // Assign colors dynamically for chart matching
                stats = stats.map((c, index) => ({
                    ...c,
                    color: chartColors[index % chartColors.length]
                }));

                setCandidateStats(stats);

                const labels = stats.map(c => c.name);
                const dataCounts = stats.map(c => c.votes);
                const bgColors = stats.map(c => c.color);

                setTotalVotes(dataCounts.reduce((a, b) => a + b, 0));
                setAvgVotes(stats.length ? (dataCounts.reduce((a, b) => a + b, 0) / stats.length).toFixed(1) : 0);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Total Votes Verified',
                            data: dataCounts,
                            backgroundColor: bgColors,
                            borderRadius: 8,
                            borderWidth: 0,
                            barThickness: 'flex',
                            maxBarThickness: 60
                        }
                    ]
                });

                // Top 5 for Doughnut
                setDoughnutData({
                    labels: labels.slice(0, 5),
                    datasets: [{
                        data: dataCounts.slice(0, 5),
                        backgroundColor: bgColors.slice(0, 5),
                        borderWidth: 0,
                        hoverOffset: 10
                    }]
                });

                // Polar Radar Graph for Distribution
                setPolarData({
                    labels: labels.slice(0, 5),
                    datasets: [{
                        data: dataCounts.slice(0, 5),
                        backgroundColor: bgColors.slice(0, 5).map(c => c + 'cc'), // Increased opacity (80% instead of 50%)
                        borderColor: bgColors.slice(0, 5),
                        borderWidth: 2
                    }]
                });

                // Simulated Trend Data
                const trendFactor = dataCounts.reduce((a, b) => a + b, 1);
                setLineData({
                    labels: ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', 'Now'],
                    datasets: [{
                        label: 'Network Velocity',
                        data: [trendFactor * 0.1, trendFactor * 0.3, trendFactor * 0.45, trendFactor * 0.6, trendFactor * 0.8, trendFactor],
                        fill: true,
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.15)',
                        tension: 0.4,
                        borderWidth: 3,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#6366f1',
                        pointBorderWidth: 2,
                        pointRadius: 4
                    }]
                });

            } catch(e) {
                console.error("Error fetching live results");
            }
        };

        fetchResults();
        const interval = setInterval(fetchResults, 2000); // Live poll every 2s
        return () => clearInterval(interval);
    }, [currentUser, navigate]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                titleFont: { size: 14, family: "'Public Sans', sans-serif" },
                bodyFont: { size: 16, weight: 'bold', family: "'Public Sans', sans-serif" },
                padding: 12,
                displayColors: false,
                callbacks: { label: (ctx) => `${ctx.raw} Votes` }
            }
        },
        scales: {
            y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)', drawBorder: false }, ticks: { color: '#e2e8f0', font: { family: "'Public Sans', sans-serif" }, stepSize: 1 } },
            x: { grid: { display: false, drawBorder: false }, ticks: { color: '#e2e8f0', font: { family: "'Public Sans', sans-serif", weight: 'bold' } } }
        },
        animation: { duration: 1000, easing: 'easeOutQuart' }
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { backgroundColor: '#1e293b', bodyFont: { size: 14 } }
        },
        cutout: '75%'
    };

    const polarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { r: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { display: false, backdropColor: 'transparent' } } }
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6366f1' } },
            x: { grid: { display: false }, ticks: { color: '#6366f1' } }
        }
    };

    // Component for rendering chart blocks
    const ChartBlock = ({ id, title, icon, children }) => (
        <div 
            onClick={() => setExpandedChart(id)}
            className="bg-[#121212] p-4 md:p-6 rounded-2xl shadow-xl border border-zinc-800/80 relative overflow-hidden group cursor-pointer hover:border-indigo-500/50 hover:shadow-indigo-500/10 transition-all duration-300"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/5 to-transparent pointer-events-none"></div>
            <div className="flex justify-between items-center mb-4 relative z-10 w-full">
                <h3 className="text-sm md:text-lg font-bold text-zinc-100 flex items-center gap-2">
                    <i className={`fa-solid ${icon} text-indigo-500`}></i> {title}
                </h3>
                <i className="fa-solid fa-expand text-zinc-600 group-hover:text-indigo-400 transition"></i>
            </div>
            <div className="h-[300px] md:h-[280px] lg:h-[250px] relative z-10 w-full">
                {children}
            </div>
        </div>
    );

    return (
        <div className="bg-[#050505] min-h-[90vh] py-4 md:py-8 relative overflow-x-hidden font-sans">
            <div className="max-w-[1400px] mx-auto px-4 relative z-10">
                {/* Header & Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-[#121212] p-4 rounded-2xl border border-zinc-800 shadow-2xl mb-6">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-500/20">
                            <i className="fa-solid fa-bolt"></i>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight">Analytics <span className="text-indigo-400">Dashboard</span></h1>
                            <div className="text-xs text-zinc-400 font-mono flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live Instance: {currentUser}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-3 mt-4 md:mt-0">
                        <div className="bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-700 text-center hidden md:block">
                            <p className="text-[10px] text-zinc-400 font-bold uppercase">Avg/Cand</p>
                            <p className="text-xl font-black text-indigo-400">{avgVotes}</p>
                        </div>
                        <div className="bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-700 text-center hidden md:block">
                            <p className="text-[10px] text-zinc-400 font-bold uppercase">Candidates</p>
                            <p className="text-xl font-black text-indigo-400">{candidateStats.length}</p>
                        </div>
                        <div className="bg-zinc-900 px-6 py-2 rounded-lg border border-zinc-700 text-center min-w-[120px]">
                            <p className="text-[10px] text-indigo-400 font-bold uppercase">Sum Turnout</p>
                            <p className="text-2xl font-black text-white">{totalVotes}</p>
                        </div>
                    </div>
                </div>

                {/* Top Centered Winner Card */}
                {candidateStats.length > 0 && (
                    <div className="bg-[#121212] p-6 rounded-2xl shadow-xl border border-yellow-500/50 mb-6 flex flex-col items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent pointer-events-none"></div>
                        {(() => {
                            const topVotes = candidateStats[0].votes;
                            const winners = candidateStats.filter(c => c.votes === topVotes && topVotes > 0);
                            
                            if (winners.length === 0) return <p className="text-zinc-600">Awaiting Valid Data...</p>;
                            if (winners.length === 1) {
                                return (
                                    <>
                                        <div className="text-yellow-500 font-black tracking-widest text-xs uppercase mb-2 animate-pulse">👑 Top Trending Winner</div>
                                        <div className="flex flex-col md:flex-row items-center gap-6 z-10 w-full justify-center">
                                            <div className="w-20 h-20 bg-zinc-950 rounded-full border-4 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(255,215,0,0.3)]" style={{borderColor: winners[0].color, color: winners[0].color}}>
                                                <i className="fa-solid fa-crown"></i>
                                            </div>
                                            <div className="text-center md:text-left">
                                                <h2 className="text-3xl font-black text-zinc-100">{winners[0].name}</h2>
                                                <p className="text-zinc-400 font-mono text-sm leading-tight mt-1">Leading heavily with <span className="text-yellow-500 font-bold">{winners[0].votes}</span> total verified votes.</p>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            return (
                                <>
                                    <div className="text-yellow-500 font-black tracking-widest text-xs uppercase mb-2 animate-pulse">⚔️ Neck & Neck Tie!</div>
                                    <div className="flex flex-wrap items-center justify-center gap-8 z-10 w-full mx-auto my-2">
                                        {winners.map(w => (
                                            <div key={w.name} className="flex flex-col items-center gap-2">
                                                <div className="w-16 h-16 bg-zinc-950 rounded-full border-4 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(255,215,0,0.2)]" style={{borderColor: w.color, color: w.color}}>
                                                    <i className="fa-solid fa-bolt"></i>
                                                </div>
                                                <h2 className="text-lg font-black text-zinc-100">{w.name}</h2>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-zinc-400 font-mono text-sm mt-2 z-10 text-center">Currently locked in a historic tie at <span className="text-yellow-500 font-bold">{topVotes}</span> votes each.</p>
                                </>
                            )
                        })()}
                    </div>
                )}

                <div className="grid lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                        <div className="grid md:grid-cols-2 gap-4">
                            <ChartBlock id="bar" title="Polling Volume Matrix" icon="fa-chart-simple">
                                {chartData ? <Bar data={chartData} options={options} /> : <p className="text-zinc-600">Syncing Matrix...</p>}
                            </ChartBlock>

                            <ChartBlock id="doughnut" title="Primary Share Dominance" icon="fa-circle-notch">
                                {doughnutData ? (
                                    <div className="flex flex-col sm:flex-row h-full items-center gap-4 overflow-y-auto sm:overflow-hidden p-1">
                                        <div className="w-full sm:w-1/2 h-[180px] sm:h-full relative shrink-0">
                                            <Doughnut data={doughnutData} options={doughnutOptions} />
                                        </div>
                                        <div className="w-full sm:w-1/2 flex flex-col justify-center gap-2 pr-2 py-4 sm:py-0">
                                            {doughnutData.labels.map((label, i) => {
                                                const val = doughnutData.datasets[0].data[i];
                                                const total = doughnutData.datasets[0].data.reduce((a,b)=>a+b, 0) || 1;
                                                const pct = ((val / total) * 100).toFixed(1);
                                                const color = doughnutData.datasets[0].backgroundColor[i];
                                                return (
                                                    <div key={i} className="flex justify-between items-center bg-zinc-900/50 p-2 rounded-xl border border-zinc-800/50 hover:bg-zinc-800 transition-colors">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]" style={{backgroundColor: color, color: color}}></div>
                                                            <span className="text-zinc-300 text-xs font-bold truncate max-w-[100px]">{label}</span>
                                                        </div>
                                                        <span className="text-zinc-100 font-black text-xs">{pct}%</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ) : <p className="text-zinc-600">Calculating Shares...</p>}
                            </ChartBlock>

                            <ChartBlock id="line" title="Network Velocity Trend" icon="fa-arrow-trend-up">
                                {lineData ? <Line data={lineData} options={lineOptions} /> : <p className="text-zinc-600">Tracking Velocity...</p>}
                            </ChartBlock>

                            <ChartBlock id="polar" title="Node Distribution Radar" icon="fa-satellite">
                                {polarData ? <PolarArea data={polarData} options={polarOptions} /> : <p className="text-zinc-600">Rendering Orbit...</p>}
                            </ChartBlock>
                        </div>
                    </div>

                    {/* Compressed Leaderboard */}
                    <div className="bg-[#121212] p-4 rounded-2xl shadow-2xl border border-zinc-800 flex flex-col h-[520px] lg:col-span-1">
                        <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2 border-b border-zinc-800 pb-2">
                            <i className="fa-solid fa-list-ol text-indigo-400"></i> Leaderboard
                        </h3>
                        <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-1">
                            {candidateStats.map((c, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 transition">
                                    <div className="flex items-center gap-3">
                                        {(() => {
                                            const symbols = ["fa-bolt", "fa-fire", "fa-leaf", "fa-star", "fa-sun", "fa-moon", "fa-droplet", "fa-wind", "fa-gem", "fa-cube"];
                                            const sym = symbols[i % symbols.length];
                                            return (
                                                <div className="w-8 h-8 rounded-full bg-zinc-950 flex items-center justify-center text-sm shadow border border-zinc-700 transition transform hover:scale-110" style={{ color: c.color, borderColor: c.color }}>
                                                    <i className={`fa-solid ${sym}`}></i>
                                                </div>
                                            )
                                        })()}
                                        <div>
                                            <h4 className="font-bold text-zinc-100 text-sm truncate w-[90px]">{c.name}</h4>
                                        </div>
                                    </div>
                                    <div className="text-lg font-black" style={{ color: c.color }}>{c.votes}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* FULL SCREEN MODAL ZOOM OVERLAY */}
            {expandedChart && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-zinc-950/95 backdrop-blur-xl">
                    <div className="bg-[#121212] w-full max-w-6xl h-full max-h-[90vh] md:max-h-[80vh] rounded-3xl border border-indigo-500/40 shadow-2xl relative flex flex-col overflow-hidden">
                        <button 
                            onClick={() => setExpandedChart(null)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-zinc-800 hover:bg-red-500 hover:text-white rounded-xl flex items-center justify-center text-zinc-300 text-xl transition-all cursor-pointer z-[110] hover:rotate-90"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                                        <div className="p-6 md:p-10 flex-1 overflow-y-auto custom-scrollbar">
                            <h2 className="text-2xl md:text-3xl font-black text-white mb-6 md:mb-10 border-b border-white/5 pb-4 md:pb-6">
                                {expandedChart.toUpperCase()} Analysis <span className="text-indigo-400">View</span>
                            </h2>

                            <div className="w-full relative min-h-[300px] md:min-h-[400px]">
                                {expandedChart === 'bar' && (chartData ? <Bar data={chartData} options={{...options, maintainAspectRatio: false}} /> : null)}
                                {expandedChart === 'doughnut' && (doughnutData ? (
                                    <div className="flex flex-col lg:flex-row h-full w-full items-center justify-center gap-8 md:gap-12 pb-10 lg:pb-0">
                                        <div className="w-full lg:w-1/2 h-[300px] md:h-[450px] relative">
                                            <Doughnut data={doughnutData} options={doughnutOptions} />
                                        </div>
                                        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-3 md:gap-4 max-w-md">
                                            {doughnutData.labels.map((label, i) => {
                                                const val = doughnutData.datasets[0].data[i];
                                                const total = doughnutData.datasets[0].data.reduce((a,b)=>a+b, 0) || 1;
                                                const pct = ((val / total) * 100).toFixed(1);
                                                const color = doughnutData.datasets[0].backgroundColor[i];
                                                return (
                                                    <div key={i} className="flex justify-between items-center bg-[#050505] p-3 md:p-5 rounded-2xl border border-white/5 shadow-2xl hover:border-indigo-500/30 transition-all">
                                                        <div className="flex items-center gap-3 md:gap-4">
                                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full shadow-[0_0_15px_currentColor] flex items-center justify-center text-white" style={{backgroundColor: color, color: color}}>
                                                                <i className="fa-solid fa-user text-xs md:text-sm"></i>
                                                            </div>
                                                            <span className="text-white text-lg md:text-xl font-bold">{label}</span>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-zinc-500 text-[10px] md:text-xs font-mono uppercase tracking-widest">{val} Votes</p>
                                                            <p className="text-white font-black text-xl md:text-2xl leading-none">{pct}%</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ) : null)}
                                {expandedChart === 'line' && (lineData ? <Line data={lineData} options={{...lineOptions, maintainAspectRatio: false}} /> : null)}
                                {expandedChart === 'polar' && (polarData ? <PolarArea data={polarData} options={{...polarOptions, maintainAspectRatio: false}} /> : null)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Results;
