import { useEffect, useState } from "react"

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/leaderboard`, {
          credentials: "include"
        })
        const data = await res.json()
        setLeaderboard(data.leaderboard || [])
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetchLeaderboard()
  }, [])

  const medals = ["🥇", "🥈", "🥉"]

  const rankColors = [
    { bg: "#fffbe6", border: "#ffd43b", text: "#e67700", badge: "linear-gradient(135deg,#ffd43b,#f59f00)" },
    { bg: "#f8f9fa", border: "#dee2e6", text: "#868e96", badge: "linear-gradient(135deg,#ced4da,#adb5bd)" },
    { bg: "#fff4f0", border: "#ffc9b5", text: "#d9480f", badge: "linear-gradient(135deg,#ff8c5a,#e8590c)" },
  ]

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
        .row { animation: fadeUp 0.4s ease both; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .row:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(80,100,200,0.12) !important; }
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

          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-4xl mb-3">🏆</div>
            <h1 className="font-lora text-3xl font-bold text-gray-900" style={{ letterSpacing: "-0.02em" }}>
              Leaderboard
            </h1>
            <p className="text-sm font-light mt-2" style={{ color: "#aab2cc" }}>
              {loading ? "Loading rankings…" : `${leaderboard.length} startup${leaderboard.length !== 1 ? "s" : ""} ranked`}
            </p>
          </div>

          {/* Skeleton */}
          {loading && (
            <div className="flex flex-col gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 flex items-center gap-4" style={{ boxShadow: "0 4px 20px rgba(80,100,200,0.07)" }}>
                  <div className="skeleton w-10 h-10 rounded-xl flex-shrink-0" />
                  <div className="flex-1">
                    <div className="skeleton h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && leaderboard.length === 0 && (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">📭</div>
              <p className="font-lora text-xl text-gray-700 mb-2">No rankings yet</p>
              <p className="text-sm font-light" style={{ color: "#aab2cc" }}>Invest in startups to see them appear here.</p>
            </div>
          )}

          {/* List */}
          {!loading && leaderboard.length > 0 && (
            <div className="flex flex-col gap-3">
              {leaderboard.map((item, i) => {
                const isTop3 = i < 3
                const colors = rankColors[i] || null

                return (
                  <div
                    key={i}
                    className="row bg-white rounded-2xl px-5 py-4 flex items-center gap-4"
                    style={{
                      boxShadow: isTop3
                        ? `0 4px 20px rgba(80,100,200,0.10), inset 0 0 0 1.5px ${colors.border}`
                        : "0 4px 20px rgba(80,100,200,0.07)",
                      background: isTop3 ? colors.bg : "white",
                      animationDelay: `${i * 0.05}s`
                    }}
                  >
                    {/* Rank badge */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                      style={{
                        background: isTop3
                          ? colors.badge
                          : "linear-gradient(135deg,#e9ecf8,#dce2f4)",
                        color: isTop3 ? "white" : "#8b96b8",
                        fontSize: isTop3 ? "1.2rem" : "0.85rem"
                      }}
                    >
                      {isTop3 ? medals[i] : `#${i + 1}`}
                    </div>

                    {/* Name */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-gray-900 truncate ${isTop3 ? "text-base" : "text-sm"}`}>
                        {item.startup_name}
                      </p>
                    </div>

                    {/* Rank label for top 3 */}
                    {isTop3 && (
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0"
                        style={{ background: colors.badge, color: "white" }}
                      >
                        #{i + 1}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Leaderboard