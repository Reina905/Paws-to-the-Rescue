import { Link } from "react-router-dom";
import VolunteerFeedingCats from "/src/assets/VolunteerFeedingCats.PNG";
import { AuthLayout } from "../components/Auth/AuthLayout";

export const Login = () => {
  return (
    <AuthLayout
      image={VolunteerFeedingCats}
      title="Welcome Back"
      subtitle="Sign in to continue helping shelters and rescued cats."
    >
      <form className="space-y-5">

        <div>
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="name@email.com"
            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex justify-between text-sm">

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="text-primary hover:underline"
          >
            Forgot password?
          </Link>

        </div>

        <button
          className="w-full bg-primary text-white rounded-xl py-3 font-semibold hover:bg-primary-dark transition"
        >
          Log In
        </button>

      </form>

      <div className="my-8 flex items-center">
        <div className="flex-1 border-t"></div>
        <span className="px-4 text-gray-500 text-sm">OR</span>
        <div className="flex-1 border-t"></div>
      </div>

      <button className="w-full border rounded-xl py-3 hover:bg-gray-50 transition">
        Continue with Google
      </button>

      <p className="text-center mt-8">
        Don't have an account?{" "}
        <Link
          to="/sign-up"
          className="text-primary font-semibold hover:underline"
        >
          Sign Up
        </Link>
      </p>

    </AuthLayout>
  );
}