import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include"
        })
        if (!res.ok) {
          setUser(null)
        } else {
          const data = await res.json()
          setUser(data.user)
        }
      } catch (err) {
        console.error("Auth check error:", err)
        setUser(null)
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  if (loading) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400&display=swap');
          .font-outfit { font-family: 'Outfit', sans-serif; }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .spinner {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2.5px solid #e0e4f0;
            border-top-color: #4c6ef5;
            animation: spin 0.75s linear infinite;
          }
          .fade-in { animation: fadeIn 0.4s ease both; }
        `}</style>

        <div
          className="font-outfit min-h-screen flex flex-col items-center justify-center gap-4"
          style={{ background: "linear-gradient(145deg,#e9ecf8 0%,#dce2f4 55%,#e6eaf7 100%)" }}
        >
          <div className="spinner fade-in" />
          <p className="fade-in text-sm font-light" style={{ color: "#aab2cc", animationDelay: "0.1s" }}>
            Verifying your session…
          </p>
        </div>
      </>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <Navbar user={user} />
      <Outlet context={{ user }} />
      <Footer />
    </>
  )
}

export default ProtectedRoute