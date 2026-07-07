import { useState } from "react"
import { Mail, Lock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../services/supabaseAuth"
import { useAuthStore } from "../../store/authStore"

export const LoginForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // Update auth store — GuestRoute will handle the redirect
    useAuthStore.getState().setSession(data.session)
  }

  return (
    <div className="bg-white rounded-[36px] shadow-xl p-10">
      <h2 className="text-3xl font-bold text-gray-900">Log In</h2>
      <p className="text-gray-500 mt-2">Access your volunteer account</p>

      <form onSubmit={handleSubmit}>
        <div className="mt-8">
          <label className="text-sm text-gray-600">Email</label>
          <div className="flex items-center gap-2 border rounded-full px-4 py-3 mt-2">
            <Mail size={18} className="text-gray-400" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-5">
          <label className="text-sm text-gray-600">Password</label>
          <div className="flex items-center gap-2 border rounded-full px-4 py-3 mt-2">
            <Lock size={18} className="text-gray-400" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-4">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{" "}
        <button onClick={() => navigate("/sign-up")} className="text-primary font-semibold">
          Sign Up
        </button>
      </p>
    </div>
  )
}
