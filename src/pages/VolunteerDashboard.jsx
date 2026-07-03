import React from "react";
import { Layout } from "../components/Layout/Layout";
import { motion } from "framer-motion";
import {
  Home,
  ClipboardList,
  CalendarCheck,
  Store,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
  PawPrint,
  Heart,
  Star,
  MapPin,
  Camera,
  Award,
  CheckCircle,
} from "lucide-react";

export const VolunteerDashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#FFF8F6]">

      {/* SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col bg-[#F6E5DF] border-r border-[#D8C2BC]/40 fixed h-full">

        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">Paws Hub</h1>
        </div>

        <nav className="flex-1 px-2 space-y-2">

          <SidebarItem icon={<Home size={18} />} active label="Dashboard" />
          <SidebarItem icon={<ClipboardList size={18} />} label="Applications" />
          <SidebarItem icon={<CalendarCheck size={18} />} label="My Shifts" />
          <SidebarItem icon={<Store size={18} />} label="Shelter Portal" />
          <SidebarItem icon={<Settings size={18} />} label="Settings" />

        </nav>

        <div className="p-6 border-t border-[#D8C2BC]/40">

          <div className="flex items-center gap-3 mb-6">
            <img
              src="https://i.pravatar.cc/100"
              className="w-10 h-10 rounded-full"
            />

            <div>
              <p className="text-sm font-semibold">Sarah Jenkins</p>
              <p className="text-[10px] uppercase text-gray-500">
                Kitten Guardian
              </p>
            </div>
          </div>

          <SidebarItem icon={<HelpCircle size={18} />} label="Help Center" />
          <SidebarItem icon={<LogOut size={18} />} label="Logout" />
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 md:ml-64">

        {/* HEADER */}
        <header className="sticky top-0 bg-white/70 backdrop-blur-md p-6 flex justify-between items-center border-b">

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Volunteer Dashboard
            </h2>
            <p className="text-gray-500">
              Welcome back, Sarah! You've made a huge difference this month.
            </p>
          </div>

          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:opacity-90">
            <Plus size={18} />
            Find a Shift
          </button>

        </header>

        <Layout>

          {/* STATS */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">

            {/* Profile */}
            <motion.div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-md flex gap-6 items-center">

              <img
                src="https://i.pravatar.cc/150"
                className="w-32 h-32 rounded-full border-4 border-[#F2A28C]"
              />

              <div>
                <h3 className="text-2xl font-bold">Sarah Jenkins</h3>
                <p className="text-gray-500 mb-3">
                  Dedicated Volunteer since Oct 2023
                </p>

                <div className="flex gap-3 flex-wrap">
                  <Badge icon={<PawPrint size={14} />} text="Kitten Guardian" />
                  <Badge icon={<Heart size={14} />} text="Super Socializer" />
                  <Badge icon={<Star size={14} />} text="Top Contributor" />
                </div>
              </div>
            </motion.div>

            {/* Impact */}
            <div className="bg-primary text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">

              <h4 className="uppercase text-sm opacity-70 mb-6">
                Personal Impact
              </h4>

              <p className="text-4xl font-bold">128</p>
              <p className="text-sm opacity-70 mb-4">Total Hours</p>

              <p className="text-4xl font-bold">12</p>
              <p className="text-sm opacity-70">Shelters Assisted</p>

              <Award className="absolute -bottom-10 -right-10 opacity-10 w-40 h-40" />

            </div>

          </div>

          {/* CONTENT GRID */}
          <div className="grid lg:grid-cols-3 gap-8 mt-10">

            {/* HISTORY */}
            <div className="lg:col-span-2 space-y-6">

              <h3 className="text-2xl font-bold">Recent History</h3>

              <HistoryItem
                title="Socialization Session"
                location="Cat Haven"
                time="2 days ago"
                hours="3 hours"
                note="Helped Luna gain confidence and get adopted!"
              />

              <HistoryItem
                title="Medical Record Updates"
                location="Northside Rescue"
                time="Last week"
                hours="5 hours"
                note="Digitized 50+ records for vet team."
              />

            </div>

            {/* RECOMMENDATIONS */}
            <div className="space-y-6">

              <h3 className="text-2xl font-bold">
                Recommended for You
              </h3>

              <RecommendationCard
                title="Kitten Nursery Night Shift"
                location="Whiskers Way"
                description="High-need shift for experienced kitten volunteers."
                tag="New"
              />

              <RecommendationCard
                title="Pet Portrait Session"
                location="Valley Rescue"
                description="Help take photos of 15 new cats."
                simple
              />

            </div>

          </div>

        </Layout>

      </main>
    </div>
  );
};

/* =========================
   COMPONENTES INTERNOS
========================= */

const SidebarItem = ({ icon, label, active }) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${
      active
        ? "bg-white text-primary font-bold"
        : "text-gray-600 hover:bg-white/60"
    }`}
  >
    {icon}
    {label}
  </div>
);

const Badge = ({ icon, text }) => (
  <span className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm">
    {icon}
    {text}
  </span>
);

const HistoryItem = ({ title, location, time, hours, note }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <div className="flex justify-between">
      <h4 className="font-bold">{title}</h4>
      <span className="text-gray-400 text-sm">{time}</span>
    </div>

    <p className="text-gray-500 text-sm">
      {location} • {hours}
    </p>

    <p className="mt-3 text-sm bg-primary/10 p-3 rounded-lg border-l-4 border-primary">
      {note}
    </p>
  </div>
);

const RecommendationCard = ({ title, location, description, tag, simple }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6">

    {tag && (
      <span className="text-xs bg-primary text-white px-3 py-1 rounded-full">
        {tag}
      </span>
    )}

    <h4 className="font-bold mt-3">{title}</h4>

    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
      <MapPin size={14} />
      {location}
    </div>

    <p className="text-gray-500 text-sm mt-3">
      {description}
    </p>

    <button className="mt-5 w-full bg-primary text-white py-2 rounded-xl font-semibold hover:opacity-90">
      {simple ? "I'm Interested" : "Claim Shift"}
    </button>

  </div>
);