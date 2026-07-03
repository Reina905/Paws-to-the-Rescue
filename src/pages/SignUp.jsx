import { Link } from "react-router-dom";
import VolunteerFeedingCats from "/src/assets/VolunteerFeedingCats.PNG";
import { AuthLayout } from "../components/Auth/AuthLayout";

export const SignUp = () => {
  return (
    <AuthLayout
      image={VolunteerFeedingCats}
      title="Create Account"
      subtitle="Join our community and start making a difference."
    >
      <form className="space-y-5">

        <div>
          <label className="block mb-2 font-medium">
            Full Name
          </label>

          <input
            className="w-full rounded-xl border p-3 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            className="w-full rounded-xl border p-3 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            className="w-full rounded-xl border p-3 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            className="w-full rounded-xl border p-3 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div>

          <label className="block mb-3 font-medium">
            I am a...
          </label>

          <div className="grid grid-cols-2 gap-4">

            <button
              type="button"
              className="border rounded-2xl p-5 hover:border-primary hover:bg-primary/5 transition"
            >
              <h3 className="font-semibold">
                Volunteer
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Help shelters through volunteering.
              </p>
            </button>

            <button
              type="button"
              className="border rounded-2xl p-5 hover:border-primary hover:bg-primary/5 transition"
            >
              <h3 className="font-semibold">
                Shelter
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Publish volunteer opportunities.
              </p>
            </button>

          </div>

        </div>

        <button
          className="w-full bg-primary text-white rounded-xl py-3 font-semibold hover:bg-primary-dark transition"
        >
          Create Account
        </button>

      </form>

      <p className="text-center mt-8">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary font-semibold hover:underline"
        >
          Log In
        </Link>
      </p>

    </AuthLayout>
  );
}