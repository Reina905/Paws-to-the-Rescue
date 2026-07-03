import React from "react";
import { Layout } from "../components/Layout/Layout";
import { Heart, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-tertiary-light flex items-center">
      <Layout>
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT - Branding */}
          <div className="hidden md:block">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Welcome back
              <br />
              to{" "}
              <span className="text-primary">
                Paws to the Rescue
              </span>
            </h1>

            <p className="mt-6 text-gray-600 leading-8">
              Log in to continue helping shelters, discovering opportunities,
              and making a real impact in the lives of rescued cats.
            </p>

            <div className="mt-10 text-6xl">
              🐾
            </div>
          </div>

          {/* RIGHT - Form */}
          <div className="bg-white rounded-[36px] shadow-xl p-10">

            <h2 className="text-3xl font-bold text-gray-900">
              Log In
            </h2>

            <p className="text-gray-500 mt-2">
              Access your volunteer account
            </p>

            {/* Email */}
            <div className="mt-8">
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
              Log In
            </button>

            {/* Link */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Don’t have an account?{" "}
              <button
                onClick={() => navigate("/sign-up")}
                className="text-primary font-semibold"
              >
                Sign Up
              </button>
            </p>

          </div>

        </div>
      </Layout>
    </main>
  );
};