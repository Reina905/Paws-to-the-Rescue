import { HeartHandshake, Home } from "lucide-react";
import { Layout } from "./Layout/Layout";
import { motion } from "framer-motion";

export const JoinCommunity = () => {
  return (
    <section className="bg-white py-24">
      <Layout>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Ready to Make a Difference?
          </h2>

          <div className="w-24 h-1 bg-primary rounded-full mx-auto my-5"></div>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you want to volunteer your time or register your shelter,
            we'd love to welcome you to our growing community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Volunteer */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-tertiary-light rounded-3xl p-10 shadow-lg"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center">
              <HeartHandshake size={30} />
            </div>

            <h3 className="text-2xl font-bold mt-8">
              Become a Volunteer
            </h3>

            <p className="text-gray-600 mt-4 leading-7">
              Help rescued cats through feeding, cleaning, transportation,
              fostering, fundraising and many other meaningful activities.
            </p>

            <button className="mt-8 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition">
              Join as Volunteer
            </button>
          </motion.div>

          {/* Shelter */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-primary rounded-3xl p-10 shadow-lg text-white"
          >
            <div className="w-16 h-16 rounded-2xl bg-white text-primary flex items-center justify-center">
              <Home size={30} />
            </div>

            <h3 className="text-2xl font-bold mt-8">
              Register Your Shelter
            </h3>

            <p className="mt-4 leading-7 text-white/90">
              Connect with passionate volunteers, publish opportunities and
              receive support from people eager to help rescued cats.
            </p>

            <button className="mt-8 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Register Shelter
            </button>
          </motion.div>
        </div>
      </Layout>
    </section>
  );
};