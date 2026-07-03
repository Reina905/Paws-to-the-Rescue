import React from "react";
import { Layout } from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-tertiary-light flex items-center">
      <Layout>

        <div className="flex flex-col items-center text-center">

          {/* ANIMATION CARD */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl px-10 py-12 max-w-lg"
          >

            {/* BIG NUMBER */}
            <h1 className="text-7xl font-bold text-primary">
              404
            </h1>

            <p className="text-2xl font-bold text-gray-900 mt-4">
              Oops! Page not found
            </p>

            <p className="text-gray-500 mt-4 leading-7">
              It looks like the page you’re looking for doesn’t exist or has been moved.
              Don’t worry — even lost cats find their way home 🐱
            </p>

            {/* ILLUSTRATION */}
            <div className="text-6xl mt-8">
              🐾 🐱 🐾
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">

              <button
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
              >
                <Home size={18} />
                Go Home
              </button>

              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
              >
                <ArrowLeft size={18} />
                Go Back
              </button>

            </div>

          </motion.div>

          {/* SOFT FOOT NOTE */}
          <p className="text-gray-400 text-sm mt-8">
            If you think this is a mistake, please contact support.
          </p>

        </div>

      </Layout>
    </main>
  );
};