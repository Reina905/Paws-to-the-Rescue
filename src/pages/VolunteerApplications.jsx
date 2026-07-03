import React, { useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { motion } from "framer-motion";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  MapPin,
} from "lucide-react";

export const VolunteerApplications = () => {
  const [filter, setFilter] = useState("all");

  const applications = [
    {
      id: 1,
      title: "Kitten Socialization Session",
      shelter: "Happy Paws Shelter",
      location: "Barcelona",
      date: "2026-01-10",
      hours: 3,
      status: "pending",
    },
    {
      id: 2,
      title: "Cleaning Shift",
      shelter: "Casa Felina BCN",
      location: "Barcelona",
      date: "2026-01-05",
      hours: 4,
      status: "approved",
    },
    {
      id: 3,
      title: "Medical Support Assistance",
      shelter: "Northside Rescue",
      location: "Madrid",
      date: "2025-12-28",
      hours: 5,
      status: "rejected",
    },
    {
      id: 4,
      title: "Feeding & Care Morning Shift",
      shelter: "Happy Paws Shelter",
      location: "Barcelona",
      date: "2025-12-20",
      hours: 2,
      status: "approved",
    },
  ];

  const filtered =
    filter === "all"
      ? applications
      : applications.filter((a) => a.status === filter);

  return (
    <main className="min-h-screen bg-tertiary-light">
      <Layout>

        {/* HEADER */}
        <div className="pt-10 pb-6">
          <h1 className="text-4xl font-bold text-gray-900">
            My Applications
          </h1>
          <p className="text-gray-500 mt-2">
            Track the status of your volunteer opportunities
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex gap-3 flex-wrap mb-10">

          <FilterButton
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label="All"
          />

          <FilterButton
            active={filter === "pending"}
            onClick={() => setFilter("pending")}
            label="Pending"
            icon={<Clock size={14} />}
          />

          <FilterButton
            active={filter === "approved"}
            onClick={() => setFilter("approved")}
            label="Approved"
            icon={<CheckCircle size={14} />}
          />

          <FilterButton
            active={filter === "rejected"}
            onClick={() => setFilter("rejected")}
            label="Rejected"
            icon={<XCircle size={14} />}
          />

        </div>

        {/* LIST */}
        <div className="grid md:grid-cols-2 gap-6">

          {filtered.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-3xl shadow-md p-6 hover:shadow-lg transition"
            >

              {/* TOP */}
              <div className="flex justify-between items-start">

                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {app.title}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {app.shelter}
                  </p>
                </div>

                <StatusBadge status={app.status} />

              </div>

              {/* INFO */}
              <div className="mt-5 space-y-2 text-gray-600 text-sm">

                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  {app.location}
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  {app.date}
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  {app.hours} hours
                </div>

              </div>

              {/* FOOTER */}
              <div className="mt-6 flex justify-end gap-2">

                {app.status === "pending" && (
                  <>
                    <button className="px-4 py-2 text-sm rounded-full bg-green-100 text-green-700 font-semibold">
                      Edit
                    </button>
                    <button className="px-4 py-2 text-sm rounded-full bg-red-100 text-red-600 font-semibold">
                      Cancel
                    </button>
                  </>
                )}

                {app.status === "approved" && (
                  <button className="px-4 py-2 text-sm rounded-full bg-primary text-white font-semibold">
                    View Details
                  </button>
                )}

                {app.status === "rejected" && (
                  <button className="px-4 py-2 text-sm rounded-full bg-gray-100 text-gray-600 font-semibold">
                    Apply Again
                  </button>
                )}

              </div>

            </motion.div>
          ))}

        </div>

      </Layout>
    </main>
  );
};

/* ======================
   COMPONENTES UI
====================== */

const FilterButton = ({ active, label, icon, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition
      ${
        active
          ? "bg-primary text-white"
          : "bg-white text-gray-600 hover:bg-gray-100"
      }
    `}
  >
    {icon}
    {label}
  </button>
);

const StatusBadge = ({ status }) => {
  const map = {
    pending: {
      icon: <AlertCircle size={14} />,
      className: "bg-yellow-100 text-yellow-700",
      label: "Pending",
    },
    approved: {
      icon: <CheckCircle size={14} />,
      className: "bg-green-100 text-green-700",
      label: "Approved",
    },
    rejected: {
      icon: <XCircle size={14} />,
      className: "bg-red-100 text-red-600",
      label: "Rejected",
    },
  };

  const s = map[status];

  return (
    <span
      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${s.className}`}
    >
      {s.icon}
      {s.label}
    </span>
  );
};