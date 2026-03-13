import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TrendIcon = () => (
  <svg width="22" height="22" viewBox="0 0 44 44" fill="none">
    <polyline points="4,32 16,18 24,24 40,10" stroke="#3b5bdb" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <polyline points="32,10 40,10 40,18" stroke="#3b5bdb" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h3" />
    <path d="M18 9h2a2 2 0 0 0 2-2V5a1 1 0 0 0-1-1h-3" />
    <path d="M12 17v4" /><path d="M8 21h8" />
    <path d="M6 4v5a6 6 0 0 0 12 0V4" />
  </svg>
);

const RocketIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// Animated hamburger → X icon
const MenuIcon = ({ open }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    {/* Top bar */}
    <rect
      x="3" y="5.5" width="18" height="2" rx="1" fill="currentColor"
      style={{
        transformOrigin: "12px 6.5px",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        transform: open ? "rotate(45deg) translateY(5.5px)" : "rotate(0deg)",
      }}
    />
    {/* Middle bar */}
    <rect
      x="3" y="11" width="18" height="2" rx="1" fill="currentColor"
      style={{
        transformOrigin: "12px 12px",
        transition: "opacity 0.25s ease, transform 0.25s ease",
        opacity: open ? 0 : 1,
        transform: open ? "scaleX(0)" : "scaleX(1)",
      }}
    />
    {/* Bottom bar */}
    <rect
      x="3" y="16.5" width="18" height="2" rx="1" fill="currentColor"
      style={{
        transformOrigin: "12px 17.5px",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        transform: open ? "rotate(-45deg) translateY(-5.5px)" : "rotate(0deg)",
      }}
    />
  </svg>
);
const Navbar = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      { label: "Profile", to: "/profile", icon: <UserIcon /> },
    ];

  const handleLogout = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      alert("Logout Failed")
      return
    }
    navigate("/");
  };

  const initials = user?.username?.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Outfit:wght@300;400;500;600&display=swap');
        .font-lora { font-family: 'Lora', Georgia, serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }

        .nav-link { transition: all 0.18s ease; }
        .nav-link:hover { background: #eef1fb; color: #3b5bdb; }

        .avatar-btn { transition: box-shadow 0.2s ease, transform 0.2s ease; }
        .avatar-btn:hover { transform: scale(1.06); box-shadow: 0 4px 16px rgba(76,110,245,0.45) !important; }

        .profile-dropdown { 
          animation: dropIn 0.2s cubic-bezier(0.4,0,0.2,1) both; 
          transform-origin: top right; 
        }
        @keyframes dropIn {
          from { opacity: 0; transform: scale(0.94) translateY(-8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);     }
        }

        .logout-btn:hover { background: #fff1f1 !important; color: #e03131; }
        .logout-btn { transition: all 0.15s ease; }

        /* Mobile drawer */
        .mobile-drawer {
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
          overflow: hidden;
        }
        .mobile-drawer.closed { max-height: 0; opacity: 0; }
        .mobile-drawer.open   { max-height: 500px; opacity: 1; }

        .mobile-link { transition: all 0.18s ease; }
        .mobile-link:hover { background: #eef1fb !important; color: #3b5bdb; }

        .hamburger-btn { transition: background 0.15s ease; }
        .hamburger-btn:hover { background: #eef1fb !important; }
      `}</style>

      <nav
        className="sticky top-0 z-50 w-full font-outfit"
        style={{
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid #e8ecf8",
          boxShadow: "0 1px 16px rgba(80,100,200,0.07)",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/startups" className="flex items-center gap-2 no-underline shrink-0">
            <TrendIcon />
            <span className="font-lora font-bold text-gray-900 text-lg" style={{ letterSpacing: "-0.01em" }}>
              Startup Fair
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium no-underline ${active ? "text-indigo-600 font-semibold" : "text-gray-500"}`}
                  style={active ? { background: "#eef1fb" } : {}}
                >
                  <span className={active ? "text-indigo-600" : "text-gray-400"}>{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">

            <div className="hidden md:block text-right">
              <div className="text-xs font-light" style={{ color: "#aab2cc" }}>Username</div>
              <div className="text-sm font-semibold text-indigo-600">
                {user?.username}
              </div>
            </div>

            {/* Avatar + dropdown (desktop) */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setProfileOpen(p => !p)}
                className="avatar-btn w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold focus:outline-none"
                style={{
                  background: "linear-gradient(135deg,#4c6ef5,#845ef7)",
                  boxShadow: "0 2px 8px rgba(76,110,245,0.35)",
                  border: "2px solid white",
                  cursor: "pointer",
                }}
              >
                {initials}
              </button>

              {profileOpen && (
                <div
                  className="profile-dropdown absolute right-0 w-56 rounded-xl bg-white py-1"
                  style={{
                    boxShadow: "0 8px 32px rgba(80,100,200,0.14)",
                    border: "1px solid #eef0fa",
                    top: "calc(100% + 10px)",
                  }}
                >
                  <div className="px-4 py-3 border-b" style={{ borderColor: "#f0f2fa" }}>
                    <p className="text-sm font-semibold text-gray-800 truncate">{user?.username}</p>
                    <p className="text-xs font-light truncate" style={{ color: "#aab2cc" }}>{user?.email}</p>
                    {isAdmin && (
                      <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "#fff0e6", color: "#e8590c" }}>
                        Admin
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="logout-btn w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 text-left rounded-b-xl"
                    style={{ background: "transparent", border: "none", cursor: "pointer" }}
                  >
                    <LogoutIcon /> Sign out
                  </button>
                </div>
              )}
            </div>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="hamburger-btn md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 focus:outline-none"
              style={{ background: "transparent", border: "none", cursor: "pointer" }}
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`mobile-drawer md:hidden ${mobileOpen ? "open" : "closed"}`}>
          <div
            className="px-5 pb-5 pt-2 flex flex-col gap-1"
            style={{ borderTop: mobileOpen ? "1px solid #eef0fa" : "none" }}
          >
            {/* User info strip */}
            <div className="flex items-center gap-3 px-3 py-3 mb-1 rounded-xl" style={{ background: "#f6f8ff" }}>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                style={{ background: "linear-gradient(135deg,#4c6ef5,#845ef7)" }}
              >
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{user?.username}</p>
                <p className="text-xs font-light truncate" style={{ color: "#aab2cc" }}>{user?.email}</p>
              </div>
            </div>

            {/* Nav links */}
            {navLinks.map(link => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`mobile-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium no-underline ${active ? "text-indigo-600 font-semibold" : "text-gray-600"}`}
                  style={active ? { background: "#eef1fb" } : { background: "transparent" }}
                >
                  <span className={active ? "text-indigo-600" : "text-gray-400"}>{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}

            {/* Divider */}
            <div className="my-1" style={{ borderTop: "1px solid #eef0fa" }} />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="logout-btn flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-600 text-left w-full"
              style={{ background: "transparent", border: "none", cursor: "pointer" }}
            >
              <LogoutIcon /> Sign out
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {(profileOpen || mobileOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setProfileOpen(false); setMobileOpen(false); }}
        />
      )}
    </>
  );
};

export default Navbar;