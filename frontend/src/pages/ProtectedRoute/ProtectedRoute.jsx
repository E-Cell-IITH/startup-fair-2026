import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"

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

                    // console.log(data)
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
        return <div>Checking Authentication...</div>
    }

    if (!user) {
        return <Navigate to="/" replace />
    }

    return (
        <>

            <Navbar user={user} />
             <Outlet context={{ user }} /></>
    )

}

export default ProtectedRoute