import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"

const EditModal = ({ startup, onClose, fetchStartups }) => {
  const [form, setForm] = useState({
    name: startup.startup_name,
    description: startup.startup_description
  })

  const handleSave = async () => {

    try {

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/startups/${startup.startup_id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            startup_name: form.name,
            startup_description: form.description
          })
        }
      )

      if (!res.ok) {
        console.error("Update failed")
        return
      }

      console.log("Startup updated")

      onClose()

      // refresh list from DB
      fetchStartups()

    } catch (err) {
      console.error("Update error:", err)
    }

  }

  return (
    <>
      <style>{`
        @keyframes backdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-backdrop { animation: backdropIn 0.2s ease both; }
        .modal-box { animation: modalIn 0.25s ease both; }
        .modal-input:focus { outline: none; border-color: #4c6ef5; box-shadow: 0 0 0 3px rgba(76,110,245,0.1); }
        .modal-input { transition: border-color 0.2s, box-shadow 0.2s; }
      `}</style>

      {/* Backdrop */}
      <div
        className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ background: "rgba(20,24,60,0.35)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="modal-box bg-white rounded-2xl w-full font-outfit"
          style={{
            maxWidth: "460px",
            padding: "40px 36px 36px",
            boxShadow: "0 24px 64px rgba(60,80,200,0.18)",
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-7">
            <div>
              <h2 className="font-lora text-xl font-bold text-gray-900" style={{ letterSpacing: "-0.02em" }}>
                Edit Startup
              </h2>
              <p className="text-xs font-light mt-1" style={{ color: "#aab2cc" }}>
                Changes will be saved immediately
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600"
              style={{ background: "#f6f8ff", border: "none", cursor: "pointer", transition: "all 0.15s" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "#8b96b8" }}>
                Startup Name
              </label>
              <input
                type="text"
                className="modal-input w-full rounded-xl px-4 py-3 text-sm text-gray-800 font-outfit"
                style={{ border: "1.5px solid #e0e4f0", background: "#fafbff" }}
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "#8b96b8" }}>
                Description
              </label>
              <textarea
                className="modal-input w-full rounded-xl px-4 py-3 text-sm text-gray-800 font-outfit resize-none"
                style={{ border: "1.5px solid #e0e4f0", background: "#fafbff", minHeight: "110px" }}
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-7">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-medium text-gray-500"
              style={{ border: "1.5px solid #e0e4f0", background: "white", cursor: "pointer", transition: "all 0.2s" }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!form.name.trim() || !form.description.trim()}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg,#4c6ef5,#845ef7)",
                border: "none",
                cursor: !form.name.trim() || !form.description.trim() ? "not-allowed" : "pointer",
                opacity: !form.name.trim() || !form.description.trim() ? 0.6 : 1,
                transition: "all 0.2s",
                boxShadow: "0 2px 12px rgba(76,110,245,0.25)"
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const StartupsPage = () => {
  const { user } = useOutletContext()
  const [startups, setStartups] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingStartup, setEditingStartup] = useState(null)
  const navigate = useNavigate()
  const fetchStartups = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/startups`, {
        credentials: "include"
      })
      const data = await res.json()
      // console.log(data.startups)
      setStartups(data.startups || [])
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchStartups()
  }, [])

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this startup?")) return

    try {

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/startups/${id}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      )

      if (!res.ok) {
        console.error("Delete failed")
        return
      }

      console.log("Startup deleted")

      fetchStartups()

    } catch (err) {
      console.error("Delete error:", err)
    }

  }
  const handleSave = (updated) => {
    setStartups(prev => prev.map(s => s.startup_id === updated.startup_id ? updated : s))
  }

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
        .card {
          animation: fadeUp 0.4s ease both;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(80,100,200,0.14) !important;
        }
        .action-btn { transition: all 0.18s ease; }
        .edit-btn:hover { background: #eef1fb !important; color: #4c6ef5; }
        .delete-btn:hover { background: #fff1f1 !important; color: #e03131; }
        .invest-btn { transition: all 0.2s ease; }
        .invest-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(76,110,245,0.3); }
        .skeleton {
          background: linear-gradient(90deg, #eef0fa 25%, #e4e8f7 50%, #eef0fa 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 12px;
        }
        @keyframes shimmer {
          from { background-position: 200% 0; }
          to { background-position: -200% 0; }
        }
      `}</style>

      {/* Edit Modal */}
      {editingStartup && (
        <EditModal
          startup={editingStartup}
          onClose={() => setEditingStartup(null)}
          fetchStartups={fetchStartups}
        />
      )}

      <div
        className="min-h-screen font-outfit px-6 py-12"
        style={{ background: "linear-gradient(145deg,#e9ecf8 0%,#dce2f4 55%,#e6eaf7 100%)" }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <h1 className="font-lora text-3xl font-bold text-gray-900" style={{ letterSpacing: "-0.02em" }}>
                Startups
              </h1>
              <p className="text-sm font-light mt-1" style={{ color: "#aab2cc" }}>
                {loading ? "Fetching startups…" : `${startups.length} compan${startups.length === 1 ? "y" : "ies"} listed`}
              </p>
            </div>
          </div>

          {/* Skeleton */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 6px 30px rgba(80,100,200,0.07)" }}>
                  <div className="skeleton h-5 w-2/3 mb-3" />
                  <div className="skeleton h-3 w-full mb-2" />
                  <div className="skeleton h-3 w-4/5 mb-2" />
                  <div className="skeleton h-3 w-1/2 mb-6" />
                  <div className="skeleton h-4 w-1/3 mb-5" />
                  <div className="skeleton h-9 w-full" />
                </div>
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && startups.length === 0 && (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🚀</div>
              <p className="font-lora text-xl text-gray-700 mb-2">No startups yet</p>
              <p className="text-sm font-light" style={{ color: "#aab2cc" }}>Check back soon or add the first one.</p>
            </div>
          )}

          {/* Grid */}
          {!loading && startups.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {startups.map((startup, i) => (
                <div
                  key={startup.startup_id}
                  className="card bg-white rounded-2xl p-6 flex flex-col"
                  style={{ boxShadow: "0 6px 30px rgba(80,100,200,0.08)", animationDelay: `${i * 0.06}s` }}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                        style={{ background: "linear-gradient(135deg,#4c6ef5,#845ef7)" }}
                      >
                        {startup.startup_name?.[0]?.toUpperCase()}
                      </div>
                      <h2 className="font-semibold text-base text-gray-900 leading-tight">
                        {startup.startup_name}
                      </h2>
                    </div>

                    {user?.is_admin && (
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          className="action-btn edit-btn w-8 h-8 rounded-lg flex items-center justify-center text-gray-400"
                          style={{ background: "transparent", border: "none", cursor: "pointer" }}
                          onClick={() => setEditingStartup(startup)}
                          title="Edit"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button
                          className="action-btn delete-btn w-8 h-8 rounded-lg flex items-center justify-center text-gray-400"
                          style={{ background: "transparent", border: "none", cursor: "pointer" }}
                          onClick={() => handleDelete(startup.startup_id)}
                          title="Delete"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 font-light leading-relaxed flex-1 mb-5" style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {startup.startup_description}
                  </p>

                  <div className="flex items-center justify-between rounded-xl px-4 py-3 mb-4" style={{ background: "#f6f8ff" }}>
                    <span className="text-xs font-medium" style={{ color: "#aab2cc" }}>Valuation</span>
                    <span className="text-sm font-semibold" style={{ color: "#2f9e44" }}>
                      ₹{Number(startup.current_valuation).toLocaleString()}
                    </span>
                  </div>

                  {!user?.is_admin && (
                    <button
                      className="invest-btn w-full py-2.5 rounded-xl text-sm font-semibold text-white"
                      style={{
                        background: "linear-gradient(135deg,#4c6ef5,#845ef7)",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 2px 10px rgba(76,110,245,0.2)"
                      }}
                      onClick={() => navigate(`/startups/${startup.startup_id}`)}
                    >
                      Invest
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default StartupsPage