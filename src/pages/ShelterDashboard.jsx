import React from "react";
import { Layout } from "../components/Layout/Layout";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  ClipboardList,
  Calendar,
  BarChart3,
  Settings,
  Plus,
  PawPrint,
  Heart,
  Building2,
  CheckCircle,
  Clock,
} from "lucide-react";

export const ShelterDashboard = () => {
  const shelter = {
    name: "Happy Paws Shelter",
    location: "San José, Costa Rica",
    totalAnimals: 78,
    volunteers: 54,
    activeOpportunities: 6,
    pendingApplications: 12,
  };

  return (
    <div className="flex min-h-screen bg-[#FFF8F6]">

      {/* SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col bg-[#F6E5DF] border-r border-[#D8C2BC]/40 fixed h-full">

        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">
            Shelter Panel
          </h1>
        </div>

        <nav className="flex-1 px-2 space-y-2">

          <SidebarItem icon={<Home size={18} />} active label="Overview" />
          <SidebarItem icon={<Users size={18} />} label="Volunteers" />
          <SidebarItem icon={<ClipboardList size={18} />} label="Applications" />
          <SidebarItem icon={<Calendar size={18} />} label="Opportunities" />
          <SidebarItem icon={<BarChart3 size={18} />} label="Analytics" />
          <SidebarItem icon={<Settings size={18} />} label="Settings" />

        </nav>

        <div className="p-6 border-t border-[#D8C2BC]/40">

          <div className="flex items-center gap-3">
            <Building2 className="text-primary" />

            <div>
              <p className="font-semibold text-sm">{shelter.name}</p>
              <p className="text-[10px] uppercase text-gray-500">
                Active Shelter
              </p>
            </div>
          </div>

        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 md:ml-64">

        {/* HEADER */}
        <header className="p-6 bg-white/70 backdrop-blur-md border-b flex justify-between items-center">

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Shelter Dashboard
            </h2>
            <p className="text-gray-500">
              Manage volunteers, opportunities and impact.
            </p>
          </div>

          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:opacity-90">
            <Plus size={18} />
            New Opportunity
          </button>

        </header>

        <Layout>

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-6 mt-10">

            <StatCard title="Animals in Care" value={shelter.totalAnimals} icon={<PawPrint />} />
            <StatCard title="Volunteers" value={shelter.volunteers} icon={<Users />} />
            <StatCard title="Active Opportunities" value={shelter.activeOpportunities} icon={<Calendar />} />
            <StatCard title="Pending Applications" value={shelter.pendingApplications} icon={<Clock />} />

          </div>

          {/* MAIN GRID */}
          <div className="grid lg:grid-cols-3 gap-8 mt-10">

            {/* Applications */}
            <div className="lg:col-span-2 space-y-6">

              <h3 className="text-2xl font-bold">Recent Applications</h3>

              <ApplicationCard
                name="Laura Martínez"
                role="Feeding Volunteer"
                time="2 hours ago"
              />

              <ApplicationCard
                name="Carlos Gómez"
                role="Cleaning Shift"
                time="Yesterday"
              />

              <ApplicationCard
                name="Ana López"
                role="Medical Support"
                time="2 days ago"
              />

            </div>

            {/* QUICK ACTIONS */}
            <div className="space-y-6">

              <h3 className="text-2xl font-bold">Quick Actions</h3>

              <QuickAction
                title="Create Opportunity"
                desc="Post a new volunteer shift"
              />

              <QuickAction
                title="Review Applications"
                desc="Approve pending volunteers"
              />

              <QuickAction
                title="View Analytics"
                desc="Check shelter performance"
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

const StatCard = ({ title, value, icon }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between"
  >
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
    <div className="text-primary">{icon}</div>
  </motion.div>
);

const ApplicationCard = ({ name, role, time }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm flex justify-between items-center">

    <div>
      <p className="font-bold">{name}</p>
      <p className="text-gray-500 text-sm">{role}</p>
    </div>

    <div className="text-right">
      <p className="text-gray-400 text-sm">{time}</p>

      <div className="flex gap-2 mt-2">
        <button className="text-green-600 font-semibold text-sm">
          Approve
        </button>
        <button className="text-red-500 font-semibold text-sm">
          Reject
        </button>
      </div>
    </div>

  </div>
);

const QuickAction = ({ title, desc }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
    <p className="font-bold">{title}</p>
    <p className="text-gray-500 text-sm mt-1">{desc}</p>
  </div>
);