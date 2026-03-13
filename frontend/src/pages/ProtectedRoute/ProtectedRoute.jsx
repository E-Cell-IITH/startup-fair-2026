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
    <div
      style={{
        fontFamily: "'Outfit', sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        background: "linear-gradient(145deg,#e9ecf8 0%,#dce2f4 55%,#e6eaf7 100%)"
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "2.5px solid #e0e4f0",
          borderTopColor: "#4c6ef5",
          animation: "spin 0.75s linear infinite"
        }}
      />
      <p style={{ color: "#aab2cc", fontSize: "0.875rem", fontWeight: 300, margin: 0 }}>
        Verifying your session…
      </p>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
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