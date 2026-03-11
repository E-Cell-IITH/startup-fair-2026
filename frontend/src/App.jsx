import { Route, Routes } from "react-router-dom"
import LoginScreen from "./pages/Auth/LoginScreen"
import StartupsPage from "./pages/Startup/StartupsPage"
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute"
function App() {
  return (
    <>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="*" element={<LoginScreen />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/startups" element={<StartupsPage />} />
        </Route>

      </Routes>
    </>
  )
}

export default App