import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            startup_name: form.name,
            startup_description: form.description
          })
        }
      )

      if (!res.ok) {
        console.error("Update failed")
        alert("Failed to update startup")
        return
      }

      onClose()
      fetchStartups()
    } catch (err) {
      console.error("Update error:", err)
    }
  }

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(20,24,60,0.35)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="modal-box bg-white rounded-2xl w-full font-outfit"
        style={{
          maxWidth: "460px",
          padding: "40px 36px 36px",
          boxShadow: "0 24px 64px rgba(60,80,200,0.18)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-7">
          <div>
            <h2 className="font-lora text-xl font-bold text-gray-900">
              Edit Startup
            </h2>
            <p className="text-xs font-light mt-1" style={{ color: "#aab2cc" }}>
              Changes will be saved immediately
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400"
            style={{ background: "#f6f8ff", border: "none", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-widest">
              Startup Name
            </label>

            <input
              type="text"
              className="modal-input w-full rounded-xl px-4 py-3 text-sm"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-widest">
              Description
            </label>

            <textarea
              className="modal-input w-full rounded-xl px-4 py-3 text-sm resize-none"
              style={{ minHeight: "110px" }}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex gap-3 mt-7">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-medium text-gray-500"
            style={{ border: "1.5px solid #e0e4f0", background: "white" }}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={!form.name.trim() || !form.description.trim()}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
            style={{
              background: "linear-gradient(135deg,#4c6ef5,#845ef7)",
              opacity:
                !form.name.trim() || !form.description.trim() ? 0.6 : 1
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

const StartupsPage = () => {
  const { user } = useOutletContext()

  const [startups, setStartups] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingStartup, setEditingStartup] = useState(null)

  const fetchStartups = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/startups`,
        { credentials: "include" }
      )

      const data = await res.json()
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

      fetchStartups()
    } catch (err) {
      console.error("Delete error:", err)
    }
  }

  return (
    <>
      {editingStartup && (
        <EditModal
          startup={editingStartup}
          onClose={() => setEditingStartup(null)}
          fetchStartups={fetchStartups}
        />
      )}

      <div className="min-h-screen px-6 py-12">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl font-bold mb-10">Startups</h1>

          {loading && <p>Loading...</p>}

          {!loading && startups.length === 0 && (
            <p>No startups yet.</p>
          )}

          {!loading && startups.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {startups.map((startup) => (

                <div
                  key={startup.startup_id}
                  className="bg-white rounded-2xl p-6 shadow flex flex-col"
                >

                  <div className="flex items-start justify-between mb-3">

                    <h2 className="font-semibold text-lg">
                      {startup.startup_name}
                    </h2>

                    {user?.is_admin && (
                      <div className="flex gap-2">

                        <button
                          onClick={() => setEditingStartup(startup)}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(startup.startup_id)
                          }
                        >
                          Delete
                        </button>

                      </div>
                    )}

                  </div>

                  <p className="text-sm text-gray-600">
                    {startup.startup_description}
                  </p>

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