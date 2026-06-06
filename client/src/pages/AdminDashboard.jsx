import { useEffect, useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../utils/auth";
import { getAdminDashboardSummary } from "../services/api";

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

const PIE_COLORS = ["#8B85E8", "#00E5FF"];

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

function formatEventDate(dateValue) {
  if (!dateValue) return "-";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ stat }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm flex items-center gap-5 px-6 py-5 flex-1 min-w-50"
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

// Dashboard Page
function DashboardPage({ summary, categoryBreakdown, recentEvents }) {
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
          <StatCard
            key={stat.id}
            stat={{
              ...stat,
              value: summary[stat.id] ?? 0,
            }}
          />
        ))}
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-2xl mx-auto mb-8">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          📊 Registrations by Category
        </h2>
        {categoryBreakdown.length > 0 ? (
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={categoryBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={140}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryBreakdown.map((entry, index) => (
                  <Cell key={`${entry.name}-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-80 flex items-center justify-center text-gray-500 text-sm border border-dashed border-gray-200 rounded-2xl bg-gray-50">
            No registration data available yet.
          </div>
        )}
      </div>

      {/* Events Table */}
      <EventsTable events={recentEvents} />
    </div>
  );
}

// ── Events Table ──────────────────────────────────────────────────────────────
function EventsTable({ events }) {
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
            {events.length > 0 ? events.map((event) => (
              <tr
                key={event._id || `${event.name}-${event.date}`}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-semibold text-gray-800">{event.name}</td>
                <td className="px-6 py-4">
                  <CategoryBadge category={event.category} />
                </td>
                <td className="px-6 py-4 text-gray-600">{formatEventDate(event.date)}</td>
                <td className="px-6 py-4 text-gray-600">{event.venue}</td>
                <td className="px-6 py-4">
                  <span className="bg-[#3B82F6] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {event.registrationCount ?? 0} Students
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="bg-[#00E5FF] hover:bg-cyan-400 active:bg-cyan-500 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-md hover:shadow-xl cursor-pointer transition-all duration-200 text-gray-900 text-xs font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1">
                    👥 View
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// App Root
export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    summary: {
      events: 0,
      students: 0,
      registrations: 0,
    },
    categoryBreakdown: [],
    recentEvents: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { authorizationToken } = useAuth();

  useEffect(() => {
    const loadDashboard = async () => {
      if (!authorizationToken) {
        setIsLoading(false);
        setError("Authorization token missing. Please log in again.");
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const data = await getAdminDashboardSummary(authorizationToken);

        setDashboardData({
          summary: {
            events: data.summary?.totalEvents ?? 0,
            students: data.summary?.totalStudents ?? 0,
            registrations: data.summary?.totalRegistrations ?? 0,
          },
          categoryBreakdown: data.categoryBreakdown ?? [],
          recentEvents: (data.recentEvents ?? []).slice().sort((a, b) => {
            const aCount = Number(a.registrationCount || 0);
            const bCount = Number(b.registrationCount || 0);
            return bCount - aCount; // highest registrations first
          }),
        });
      } catch (fetchError) {
        setError(fetchError.message || "Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, [authorizationToken]);

  const activeContent = useMemo(() => {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-[#F0F1F8] px-6 py-10 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#6C63FF] border-t-transparent" />
            Loading dashboard data...
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen bg-[#F0F1F8] px-6 py-10 flex items-center justify-center">
          <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm border border-red-100">
            <p className="text-lg font-bold text-gray-800 mb-2">Unable to load dashboard</p>
            <p className="text-sm text-gray-500 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-[#6C63FF] px-4 py-2 text-white font-semibold hover:bg-[#5a52e0] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return (
      <DashboardPage
        summary={dashboardData.summary}
        categoryBreakdown={dashboardData.categoryBreakdown}
        recentEvents={dashboardData.recentEvents}
      />
    );
  }, [dashboardData, error, isLoading]);

  return (
    <div className="font-sans min-h-screen bg-[#F0F1F8]">
      {activeContent}
    </div>
  );
}
