import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ── Mock Data ────────────────────────────────────────────────────────────────
const STATS = [
  {
    id: "events",
    value: 25,
    label: "Total Events",
    icon: "📅",
    borderColor: "#6C63FF",
    iconBg: "#EEF0FF",
    iconColor: "#6C63FF",
  },
  {
    id: "students",
    value: 3,
    label: "Total Students",
    icon: "🎓",
    borderColor: "#00BFA6",
    iconBg: "#E0F7F4",
    iconColor: "#00BFA6",
  },
  {
    id: "registrations",
    value: 5,
    label: "Total Registrations",
    icon: "📋",
    borderColor: "#FF4D6D",
    iconBg: "#FFE9ED",
    iconColor: "#FF4D6D",
  },
];

const PIE_DATA = [
  { name: "Technical", value: 3 },
  { name: "Sports", value: 2 },
];
const PIE_COLORS = ["#8B85E8", "#00E5FF"];

const EVENTS = [
  { name: "Rangmanch - Drama Competition", category: "Cultural", date: "Tue Nov 18 2025", venue: "Auditorium Stage", registrations: 0 },
  { name: "Natyanjali - Classical Dance Festival", category: "Cultural", date: "Thu Oct 30 2025", venue: "Cultural Center", registrations: 0 },
  { name: "Robotics Workshop", category: "Technical", date: "Mon Nov 10 2025", venue: "Electronics Lab", registrations: 0 },
  { name: "Battle of Bands", category: "Cultural", date: "Fri Nov 28 2025", venue: "Open Air Theatre", registrations: 0 },
  { name: "Cybersecurity Summit", category: "Technical", date: "Mon Dec 15 2025", venue: "Auditorium Hall", registrations: 0 },
  { name: "CodeSprint Challenge", category: "Technical", date: "Fri Dec 05 2025", venue: "Central Computer Lab", registrations: 0 },
  { name: "Stand-Up Comedy Night", category: "Cultural", date: "Sat Nov 22 2025", venue: "Mini Auditorium", registrations: 0 },
  { name: "AI/ML Workshop Series", category: "Technical", date: "Sat Oct 25 2025", venue: "Seminar Hall A", registrations: 1 },
  { name: "Web Development Bootcamp", category: "Technical", date: "Thu Nov 20 2025", venue: "IT Lab, 2nd Floor", registrations: 0 },
  { name: "Euphoria - Cultural Fest 2025", category: "Cultural", date: "Mon Dec 01 2025", venue: "College Ground & Main Auditorium", registrations: 0 },
];

// ── Category Badge ────────────────────────────────────────────────────────────
function CategoryBadge({ category }) {
  const styles = {
    Cultural: "bg-gradient-to-r from-pink-400 to-purple-400 text-white",
    Technical: "bg-gradient-to-r from-indigo-400 to-violet-500 text-white",
    Sports: "bg-gradient-to-r from-green-400 to-teal-400 text-white",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[category] || "bg-gray-200 text-gray-700"}`}>
      {category}
    </span>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ stat }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm flex items-center gap-5 px-6 py-5 flex-1 min-w-[200px]"
      style={{ borderLeft: `4px solid ${stat.borderColor}` }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
        style={{ backgroundColor: stat.iconBg }}
      >
        {stat.icon}
      </div>
      <div>
        <p className="text-3xl font-extrabold text-gray-800 leading-none">{stat.value}</p>
        <div className="w-8 h-0.5 rounded-full my-1.5" style={{ backgroundColor: stat.borderColor }} />
        <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ activePage, setActivePage }) {
  return (
    <nav className="bg-[#1E2130] text-white flex items-center justify-between px-6 py-3 sticky top-0 z-50">
      <div className="flex items-center gap-2 text-[#6C63FF] font-bold text-lg">
        <span>📅</span>
        <span>College Event Manager</span>
      </div>
      <div className="flex items-center gap-6 text-sm font-medium">
        <button
          onClick={() => setActivePage("events")}
          className={`flex items-center gap-1 transition-colors ${activePage === "events" ? "text-white" : "text-gray-400 hover:text-white"}`}
        >
          ☰ All Events
        </button>
        <button
          onClick={() => setActivePage("dashboard")}
          className={`flex items-center gap-1 transition-colors ${activePage === "dashboard" ? "text-white" : "text-gray-400 hover:text-white"}`}
        >
          📈 Dashboard
        </button>
        <button className="flex items-center gap-1 bg-[#6C63FF] hover:bg-[#5a52e0] text-white px-4 py-1.5 rounded-lg transition-colors">
          + New Event
        </button>
        <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
          👤 Admin User ▾
        </button>
      </div>
    </nav>
  );
}

// ── Dashboard Page ────────────────────────────────────────────────────────────
function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F0F1F8] px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
          👨‍💼 Admin Dashboard
        </h1>
        <div className="w-16 h-1 bg-[#6C63FF] rounded-full mx-auto mt-2 mb-3" />
        <p className="text-gray-500 text-sm">Manage events and track registrations</p>
      </div>

      {/* Stat Cards */}
      <div className="flex flex-wrap gap-5 justify-center mb-8">
        {STATS.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-2xl mx-auto mb-8">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          📊 Registrations by Category
        </h2>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={PIE_DATA}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={140}
              paddingAngle={2}
              dataKey="value"
            >
              {PIE_DATA.map((entry, index) => (
                <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Events Table */}
      <EventsTable />
    </div>
  );
}

// ── Events Table ──────────────────────────────────────────────────────────────
function EventsTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden max-w-6xl mx-auto">
      <div className="px-6 py-5">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          📋 Recent Events &amp; Registrations
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#1E2130] text-white text-xs uppercase tracking-wider">
              <th className="px-6 py-3 text-left font-semibold">Event Name</th>
              <th className="px-6 py-3 text-left font-semibold">Category</th>
              <th className="px-6 py-3 text-left font-semibold">Date</th>
              <th className="px-6 py-3 text-left font-semibold">Venue</th>
              <th className="px-6 py-3 text-left font-semibold">Registrations</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {EVENTS.map((event, i) => (
              <tr
                key={i}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-semibold text-gray-800">{event.name}</td>
                <td className="px-6 py-4">
                  <CategoryBadge category={event.category} />
                </td>
                <td className="px-6 py-4 text-gray-600">{event.date}</td>
                <td className="px-6 py-4 text-gray-600">{event.venue}</td>
                <td className="px-6 py-4">
                  <span className="bg-[#3B82F6] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {event.registrations} Students
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="bg-[#00E5FF] hover:bg-cyan-400 text-gray-900 text-xs font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                    👥 View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── All Events Page ───────────────────────────────────────────────────────────
function AllEventsPage() {
  return (
    <div className="min-h-screen bg-[#F0F1F8] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
          📅 All Events
        </h1>
        <EventsTable />
      </div>
    </div>
  );
}

// ── App Root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="font-sans min-h-screen" style={{ background: "linear-gradient(135deg, #6C63FF 0%, #A78BFA 100%)" }}>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <div className="mx-4 my-4 rounded-3xl overflow-hidden shadow-2xl bg-[#F0F1F8]">
        {activePage === "dashboard" ? <DashboardPage /> : <AllEventsPage />}
      </div>
    </div>
  );
}