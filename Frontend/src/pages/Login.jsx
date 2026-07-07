import { Link } from "react-router-dom"
import { PaddingLayout } from "../layouts/PaddingLayout"
import { LoginBranding } from "../features/auth/LoginBranding"
import { LoginForm } from "../features/auth/LoginForm"

export const Login = () => {
  return (
    <main className="min-h-screen flex items-center">
      <PaddingLayout>
        {/* Back to Home */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-semibold py-2 px-3 rounded-xl text-primary hover:bg-secondary-light transition-all duration-300 ease-in-out hover:-translate-y-0.5 text-sm"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <LoginBranding />
          <LoginForm />
        </div>
      </PaddingLayout>
    </main>
  )
}
