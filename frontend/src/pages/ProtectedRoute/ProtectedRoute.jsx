import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const ProtectedRoute = () => {
  const [status, setStatus] = useState("loading")
  const [user, setUser] = useState(null)

  useEffect(() => {
    alert("ProtectedRoute mounted")

    const checkAuth = async () => {
      alert("Starting auth check")

      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
          {
            method: "GET",
            credentials: "include",
          }
        )

        alert("Auth API responded with status: " + res.status)

        if (res.status === 401) {
          alert("User unauthenticated (401)")
          setStatus("unauthenticated")
          return
        }

        if (!res.ok) {
          alert("Auth request failed: " + res.status)
          throw new Error("Auth request failed")
        }

        const data = await res.json()

        alert("User authenticated. User ID: " + data.user?.user_id)

        setUser(data.user)
        setStatus("authenticated")

      } catch (err) {
        alert("Auth check error: " + err.message)
        console.error("Auth check error:", err)
        setStatus("unauthenticated")
      }
    }

    checkAuth()
  }, [])

  if (status === "loading") {
    alert("Status = loading")

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

  if (status === "unauthenticated") {
    alert("Redirecting to login page")
    return <Navigate to="/" replace />
  }

  alert("User authenticated → rendering protected content")

  return (
    <>
      <Navbar user={user} />
      <Outlet context={{ user }} />
      <Footer />
    </>
  )
}

export default ProtectedRoute