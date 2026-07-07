import { useEffect } from "react"
import { useAuthStore } from "../store/authStore"

export const AuthInitializer = ({ children }) => {
  useEffect(() => {
    useAuthStore.getState().initialize()
  }, [])

  return children
}
