import { useNavigate } from "react-router-dom"

const TrendIcon = () => (
    <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
        <polyline points="4,32 16,18 24,24 40,10" stroke="#4c6ef5" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <polyline points="32,10 40,10 40,18" stroke="#4c6ef5" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
)

const HomeScreen = () => {
    const navigate = useNavigate()

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,600&family=Outfit:wght@300;400;500;600&display=swap');
        .font-lora  { font-family: 'Lora', Georgia, serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .a1 { animation: fadeUp 0.5s ease both; }
        .a2 { animation: fadeUp 0.5s 0.1s ease both; }
        .a3 { animation: fadeUp 0.5s 0.2s ease both; }
        .a4 { animation: fadeUp 0.5s 0.3s ease both; }
        .a5 { animation: fadeUp 0.5s 0.4s ease both; }

        .enter-btn {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .enter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(76,110,245,0.38) !important;
        }
        .enter-btn:active { transform: translateY(0); }

        .detail-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .detail-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(80,100,200,0.12) !important;
        }

        .divider-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: #c8d0e8; display: inline-block; margin: 0 10px; vertical-align: middle;
        }
      `}</style>

            <div
                className="font-outfit min-h-screen flex flex-col"
                style={{ background: "linear-gradient(145deg,#e9ecf8 0%,#dce2f4 55%,#e6eaf7 100%)" }}
            >
                {/* Subtle blobs */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div style={{ position: "absolute", top: "15%", left: "10%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,#a5b4fc,transparent)", filter: "blur(72px)", opacity: 0.25 }} />
                    <div style={{ position: "absolute", bottom: "20%", right: "8%", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle,#818cf8,transparent)", filter: "blur(72px)", opacity: 0.18 }} />
                </div>

                {/* Main content */}
                <main className="relative flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">

                    {/* Logo mark */}
                    <div className="a1 mb-5">
                        <TrendIcon />
                    </div>

                    {/* E-Cell label */}
                    <div className="a2 mb-4">
                        <span
                            className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                            style={{ background: "#eef1fb", color: "#4c6ef5", letterSpacing: "0.12em" }}
                        >
                            E-Cell IIT Hyderabad
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="a3 font-lora font-bold text-gray-900 mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", letterSpacing: "-0.03em", lineHeight: 1.15, maxWidth: 640 }}>
                        The Startup Fair<br />
                        <span style={{ color: "#4c6ef5" }}>Investment Game</span>
                    </h1>

                    {/* Subtext */}
                    <p className="a3 font-light text-gray-500 mb-10" style={{ maxWidth: 480, lineHeight: 1.75, fontSize: "0.97rem" }}>
                        You get <span className="font-semibold text-gray-700">₹10,000 in virtual capital</span> to invest in startups
                        showcasing at the fair. Evaluate the ventures, spot the winners, and allocate wisely.
                    </p>

                    {/* Event details cards */}
                    <div className="a4 flex flex-wrap justify-center gap-3 mb-12">
                        {[
                            { label: "Date", value: "14 March 2026" },
                            { label: "Time", value: "3:00 PM – 8:00 PM" },
                            { label: "Venue", value: "Old Mess Grounds" },
                        ].map(d => (
                            <div
                                key={d.label}
                                className="detail-card flex items-center gap-3 px-5 py-3 rounded-2xl bg-white"
                                style={{ boxShadow: "0 4px 20px rgba(80,100,200,0.08)", border: "1px solid #eef0fa" }}
                            >
                                <div className="text-left">
                                    <p className="text-xs font-medium" style={{ color: "#aab2cc" }}>{d.label}</p>
                                    <p className="text-sm font-semibold text-gray-800">{d.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="a5 flex flex-col items-center">
                        <button
                            onClick={() => navigate("/startups")}
                            className="enter-btn flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold text-base"
                            style={{
                                background: "linear-gradient(135deg,#4c6ef5,#845ef7)",
                                border: "none",
                                cursor: "pointer",
                                boxShadow: "0 4px 20px rgba(76,110,245,0.3)",
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                            </svg>
                            Enter the Fair
                        </button>
                        <p className="text-xs font-light mt-4" style={{ color: "#b8c0d8" }}>
                            Sign in with Google to receive your ₹10,000 balance
                        </p>
                    </div>

                </main>

                {/* Footer */}
                <footer className="relative text-center pb-8">
                    <p className="text-xs font-light" style={{ color: "#b8c0d8" }}>
                        © {new Date().getFullYear()} Startup Fair
                        <span className="divider-dot" />
                        Made with <span style={{ color: "#e03131" }}>♥</span> by E-Cell IIT Hyderabad
                    </p>
                </footer>
            </div>
        </>
    )
}

export default HomeScreen   