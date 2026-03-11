import { Route, Routes } from "react-router-dom"
import LoginScreen from "./pages/Auth/LoginScreen"
import StartupsPage from "./pages/Startup/StartupsPage"
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute"
import AddStartup from "./pages/Startup/AddStartup"
function App() {
  return (
    <>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="*" element={<LoginScreen />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/startups" element={<StartupsPage />} />
          <Route path="/startups/add" element={<AddStartup />} />
        </Route>

      </Routes>
    </>
  )
}

export default App