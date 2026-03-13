import { useEffect, useState } from "react"

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include"
        })

        const data = await res.json()
      
        setUser(data.user)
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetchProfile()
  }, [])

  const totalInvested = user?.user_investments?.reduce((sum, inv) => sum + inv.investment_price, 0) || 0
  const initials = user?.username?.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Outfit:wght@300;400;500;600&display=swap');
        .font-lora { font-family: 'Lora', Georgia, serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.4s ease both; }
        .inv-row { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .inv-row:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(80,100,200,0.12) !important; }
        .skeleton {
          background: linear-gradient(90deg, #eef0fa 25%, #e4e8f7 50%, #eef0fa 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 10px;
        }
        @keyframes shimmer {
          from { background-position: 200% 0; }
          to { background-position: -200% 0; }
        }
      `}</style>

      <div
        className="min-h-screen font-outfit px-6 py-12"
        style={{ background: "linear-gradient(145deg,#e9ecf8 0%,#dce2f4 55%,#e6eaf7 100%)" }}
      >
        <div className="max-w-2xl mx-auto">

          {/* Skeleton */}
          {loading && (
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4" style={{ boxShadow: "0 6px 30px rgba(80,100,200,0.08)" }}>
                <div className="skeleton w-20 h-20 rounded-full" />
                <div className="skeleton h-5 w-40" />
                <div className="skeleton h-3 w-56" />
              </div>
              <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 6px 30px rgba(80,100,200,0.08)" }}>
                {[...Array(3)].map((_, i) => <div key={i} className="skeleton h-12 mb-3" />)}
              </div>
            </div>
          )}

          {!loading && user && (
            <>
              {/* Profile card */}
              <div className="fade-up bg-white rounded-2xl p-8 mb-5 text-center" style={{ boxShadow: "0 6px 30px rgba(80,100,200,0.08)" }}>
                {/* Avatar */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4"
                  style={{
                    background: "linear-gradient(135deg,#4c6ef5,#845ef7)",
                    boxShadow: "0 4px 20px rgba(76,110,245,0.35)"
                  }}
                >
                  {initials}
                </div>

                <h1 className="font-lora text-2xl font-bold text-gray-900 mb-1" style={{ letterSpacing: "-0.02em" }}>
                  {user.username}
                </h1>
                <p className="text-sm font-light mb-5" style={{ color: "#aab2cc" }}>{user.email}</p>

                {/* Admin badge */}
                {user.is_admin && (
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-5" style={{ background: "#fff0e6", color: "#e8590c" }}>
                    Admin
                  </span>
                )}

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="rounded-xl px-4 py-4" style={{ background: "#f6f8ff" }}>
                    <p className="text-xs font-medium mb-1" style={{ color: "#aab2cc" }}>Balance</p>
                    <p className="text-xl font-semibold" style={{ color: "#2f9e44" }}>₹{user.amount_left.toLocaleString()}</p>
                  </div>
                  <div className="rounded-xl px-4 py-4" style={{ background: "#f6f8ff" }}>
                    <p className="text-xs font-medium mb-1" style={{ color: "#aab2cc" }}>Total Invested</p>
                    <p className="text-xl font-semibold" style={{ color: "#4c6ef5" }}>₹{totalInvested.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Investments */}
              <div className="fade-up bg-white rounded-2xl p-6" style={{ boxShadow: "0 6px 30px rgba(80,100,200,0.08)", animationDelay: "0.08s" }}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-lora text-lg font-bold text-gray-900">Investments</h2>
                  <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: "#f0f2ff", color: "#4c6ef5" }}>
                    {user.user_investments?.length || 0} total
                  </span>
                </div>

                {user.user_investments?.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-sm font-light" style={{ color: "#aab2cc" }}>No investments yet</p>
                  </div>
                )}

                {user.user_investments?.length > 0 && (
                  <div className="flex flex-col gap-3">
                    {user.user_investments.map((inv, i) => (
                      <div
                        key={i}
                        className="inv-row flex items-center justify-between rounded-xl px-4 py-4"
                        style={{
                          background: "#fafbff",
                          border: "1.5px solid #eef0fa",
                          animationDelay: `${0.1 + i * 0.05}s`
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: "linear-gradient(135deg,#4c6ef5,#845ef7)" }}
                          >
                            {inv.startup_name?.[0]?.toUpperCase()}
                          </div>
                          <p className="text-sm font-medium text-gray-800">{inv.startup_name}</p>
                        </div>
                        <p className="text-sm font-semibold" style={{ color: "#2f9e44" }}>
                          ₹{inv.investment_price.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ProfilePage