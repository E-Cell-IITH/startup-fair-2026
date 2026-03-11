import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TrendIcon = () => (
  <svg width="22" height="22" viewBox="0 0 44 44" fill="none">
    <polyline points="4,32 16,18 24,24 40,10" stroke="#3b5bdb" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <polyline points="32,10 40,10 40,18" stroke="#3b5bdb" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const TrophyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h3"/>
    <path d="M18 9h2a2 2 0 0 0 2-2V5a1 1 0 0 0-1-1h-3"/>
    <path d="M12 17v4"/>
    <path d="M8 21h8"/>
    <path d="M6 4v5a6 6 0 0 0 12 0V4"/>
  </svg>
);

const RocketIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const Navbar = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const isAdmin = user?.is_admin;
  const balance = user?.amount_left ?? 10000;

  const navLinks = isAdmin
    ? [
        { label: "All Startups", to: "/startups", icon: <RocketIcon /> },
        { label: "Add Startup", to: "/startups/add", icon: <PlusIcon /> },
        { label: "Leaderboard", to: "/leaderboard", icon: <TrophyIcon /> },
      ]
    : [
        { label: "All Startups", to: "/startups", icon: <RocketIcon /> },
        { label: "Leaderboard", to: "/leaderboard", icon: <TrophyIcon /> },
      ];

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    navigate("/");
  };

  const initials = user?.username
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Outfit:wght@300;400;500;600&display=swap');
        .font-lora { font-family: 'Lora', Georgia, serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .nav-link { transition: all 0.18s ease; }
        .nav-link:hover { background: #eef1fb; color: #3b5bdb; }
        .dropdown { animation: dropIn 0.18s ease both; transform-origin: top right; }
        @keyframes dropIn {
          from { opacity: 0; transform: scale(0.95) translateY(-6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .logout-btn:hover { background: #fff1f1; color: #e03131; }
        .logout-btn { transition: all 0.15s ease; }
      `}</style>

      <nav
        className="sticky top-0 z-50 w-full font-outfit"
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #e8ecf8",
          boxShadow: "0 1px 16px rgba(80,100,200,0.07)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: Logo */}
          <Link to="/startups" className="flex items-center gap-2 no-underline">
            <TrendIcon />
            <span className="font-lora font-bold text-gray-900 text-lg" style={{ letterSpacing: "-0.01em" }}>
              Startup Fair
            </span>
          </Link>

          {/* Center: Nav Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium no-underline ${
                    active
                      ? "text-indigo-600 font-semibold"
                      : "text-gray-500"
                  }`}
                  style={active ? { background: "#eef1fb" } : {}}
                >
                  <span className={active ? "text-indigo-600" : "text-gray-400"}>
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right: Balance + Avatar */}
          <div className="flex items-center gap-4">
            {/* Balance */}
            <div className="text-right hidden sm:block">
              <div className="text-xs font-light" style={{ color: "#aab2cc" }}>Balance</div>
              <div className="text-sm font-semibold" style={{ color: "#2f9e44" }}>
                ${balance.toLocaleString()}
              </div>
            </div>

            {/* Avatar + Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold focus:outline-none"
                style={{
                  background: "linear-gradient(135deg, #4c6ef5, #845ef7)",
                  boxShadow: "0 2px 8px rgba(76,110,245,0.35)",
                  border: "2px solid white",
                  cursor: "pointer",
                }}
              >
                {initials}
              </button>

              {profileOpen && (
                <div
                  className="dropdown absolute right-0 mt-2 w-56 rounded-xl bg-white py-1"
                  style={{
                    boxShadow: "0 8px 32px rgba(80,100,200,0.14)",
                    border: "1px solid #eef0fa",
                    top: "calc(100% + 8px)",
                  }}
                >
                  {/* User info */}
                  <div className="px-4 py-3 border-b" style={{ borderColor: "#f0f2fa" }}>
                    <p className="text-sm font-semibold text-gray-800 truncate">{user?.username}</p>
                    <p className="text-xs font-light truncate" style={{ color: "#aab2cc" }}>{user?.email}</p>
                    {isAdmin && (
                      <span
                        className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ background: "#fff0e6", color: "#e8590c" }}
                      >
                        Admin
                      </span>
                    )}
                  </div>

                  {/* SM balance (mobile) */}
                  <div className="px-4 py-2 flex items-center justify-between sm:hidden border-b" style={{ borderColor: "#f0f2fa" }}>
                    <span className="text-xs" style={{ color: "#aab2cc" }}>Balance</span>
                    <span className="text-sm font-semibold" style={{ color: "#2f9e44" }}>${balance.toLocaleString()}</span>
                  </div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="logout-btn w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 text-left rounded-b-xl"
                    style={{ background: "transparent", border: "none", cursor: "pointer" }}
                  >
                    <LogoutIcon />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop to close dropdown */}
      {profileOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
      )}
    </>
  );
};

export default Navbar;