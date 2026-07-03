import React from "react";
import { Layout } from "../components/Layout/Layout";
import { Heart, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-tertiary-light flex items-center">
      <Layout>
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="hidden md:block">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Join our
              <br />
              <span className="text-primary">
                volunteer community
              </span>
            </h1>

            <p className="mt-6 text-gray-600 leading-8">
              Create your account and start helping shelters, joining events,
              and making a real difference for rescued cats.
            </p>

            <div className="mt-10 text-6xl">
              ❤️ 🐱
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-[36px] shadow-xl p-10">

            <h2 className="text-3xl font-bold text-gray-900">
              Sign Up
            </h2>

            <p className="text-gray-500 mt-2">
              Create your volunteer account
            </p>

            {/* Name */}
            <div className="mt-8">
              <label className="text-sm text-gray-600">Full Name</label>

              <div className="flex items-center gap-2 border rounded-full px-4 py-3 mt-2">
                <User size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mt-5">
              <label className="text-sm text-gray-600">Email</label>

              <div className="flex items-center gap-2 border rounded-full px-4 py-3 mt-2">
                <Mail size={18} className="text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-5">
              <label className="text-sm text-gray-600">Password</label>

              <div className="flex items-center gap-2 border rounded-full px-4 py-3 mt-2">
                <Lock size={18} className="text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full outline-none"
                />
              </div>
            </div>

            {/* Button */}
            <button className="w-full mt-8 bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition">
              Create Account
            </button>

            {/* Link */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-primary font-semibold"
              >
                Log In
              </button>
            </p>

          </div>

        </div>
      </Layout>
    </main>
  );
};