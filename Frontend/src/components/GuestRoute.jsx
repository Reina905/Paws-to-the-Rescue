import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

export const GuestRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isLoading = useAuthStore((state) => state.isLoading)
  const role = useAuthStore((state) => state.role)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    if (role === "shelter") return <Navigate to="/shelter-dashboard" replace />
    if (role === "volunteer") return <Navigate to="/volunteer-dashboard" replace />
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
