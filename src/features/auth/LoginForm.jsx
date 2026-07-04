import { Mail, Lock } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const LoginForm = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-[36px] shadow-xl p-10">
      <h2 className="text-3xl font-bold text-gray-900">Log In</h2>
      <p className="text-gray-500 mt-2">Access your volunteer account</p>

      <div className="mt-8">
        <label className="text-sm text-gray-600">Email</label>
        <div className="flex items-center gap-2 border rounded-full px-4 py-3 mt-2">
          <Mail size={18} className="text-gray-400" />
          <input type="email" placeholder="you@example.com" className="w-full outline-none" />
        </div>
      </div>

      <div className="mt-5">
        <label className="text-sm text-gray-600">Password</label>
        <div className="flex items-center gap-2 border rounded-full px-4 py-3 mt-2">
          <Lock size={18} className="text-gray-400" />
          <input type="password" placeholder="••••••••" className="w-full outline-none" />
        </div>
      </div>

      <button className="w-full mt-8 bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition">
        Log In
      </button>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{" "}
        <button onClick={() => navigate("/sign-up")} className="text-primary font-semibold">
          Sign Up
        </button>
      </p>
    </div>
  )
}
