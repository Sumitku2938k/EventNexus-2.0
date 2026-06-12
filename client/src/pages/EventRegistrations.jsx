import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventById, getEventRegistrations } from "../services/api";
import { useAuth } from "../utils/auth";

function formatDate(dateValue) {
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

export default function EventRegistrations() {
  const { eventId } = useParams();
  const { authorizationToken } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const handlePrint = () => window.print();

  useEffect(() => {
    const loadRegistrations = async () => {
      if (!authorizationToken) {
        setError("Authorization token missing. Please log in again.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const eventData = await getEventById(eventId, authorizationToken);

        try {
          const data = await getEventRegistrations(eventId, authorizationToken);
          const registrationList = data.registrations || [];

          setRegistrations(registrationList);
          setEventDetails(registrationList[0]?.eventId || eventData.event || eventData);
        } catch (registrationError) {
          const isEmptyState = registrationError.message?.toLowerCase().includes("no registrations");

          if (!isEmptyState) {
            throw registrationError;
          }

          setRegistrations([]);
          setEventDetails(eventData.event || eventData);
        }
      } catch (fetchError) {
        setRegistrations([]);
        setError(fetchError.message || "Failed to load registrations.");
      } finally {
        setIsLoading(false);
      }
    };

    loadRegistrations();
  }, [authorizationToken, eventId]);

  if (isLoading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center bg-[#F0F1F8]">
        <div className="text-center text-gray-600">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#6C63FF] border-t-transparent" />
          Loading registrations...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F0F1F8] px-4 py-8 font-sans sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/dashboard/admin"
          className="mb-6 inline-flex items-center gap-2 rounded-xl bg-[#4B5563] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#374151] print:hidden"
        >
          ← Back to Dashboard
        </Link>

        {error ? (
          <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <p className="text-lg font-bold text-gray-800">Unable to load registrations</p>
            <p className="mt-2 text-sm text-gray-500">{error}</p>
          </div>
        ) : (
          <>
            <div className="mb-6 rounded-2xl bg-white px-8 py-7 shadow-sm">
              <h1 className="mb-2 text-3xl font-extrabold leading-tight text-[#1a1a2e]">
                {eventDetails?.name || "Registered Students"}
              </h1>
              <div className="mb-4 h-1 w-14 rounded-full bg-[#6C63FF]" />
              <p className="mb-5 text-sm leading-relaxed text-gray-500">
                {eventDetails?.description || "Students who have registered for this event are listed below."}
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3B82F6] px-3 py-1.5 text-xs font-semibold text-white">
                  📅 {formatDate(eventDetails?.date)}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10B981] px-3 py-1.5 text-xs font-semibold text-white">
                  📍 {eventDetails?.venue || "-"}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#06B6D4] px-3 py-1.5 text-xs font-semibold text-white">
                  👥 {registrations.length} Registered
                </span>
              </div>
            </div>

            <div className="mb-6 overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="px-8 py-5">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
                  <span className="text-[#6C63FF]">👥</span> Registered Students
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#1E2130] text-left text-xs uppercase tracking-wider text-white">
                      <th className="px-6 py-3 font-semibold">Name</th>
                      <th className="px-6 py-3 font-semibold">Email</th>
                      <th className="px-6 py-3 font-semibold">Phone</th>
                      <th className="px-6 py-3 font-semibold">College</th>
                      <th className="px-6 py-3 font-semibold">Branch</th>
                      <th className="px-6 py-3 font-semibold">Year</th>
                      <th className="px-6 py-3 font-semibold">Registered On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.length > 0 ? (
                      registrations.map((registration, index) => (
                        <tr
                          key={registration._id}
                          className={`border-b border-gray-100 transition-colors ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          } hover:bg-[#F5F4FF]`}
                        >
                          <td className="px-6 py-4 font-semibold text-gray-800">
                            <span className="inline-flex items-center gap-2">
                              <span className="text-base text-blue-500">👤</span>
                              {registration.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            <span className="inline-flex items-center gap-2">
                              <span className="text-gray-400">✉️</span>
                              {registration.email}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{registration.phone}</td>
                          <td className="px-6 py-4 text-gray-600">{registration.college}</td>
                          <td className="px-6 py-4 text-gray-600">{registration.branch}</td>
                          <td className="px-6 py-4 text-gray-600">{registration.year}</td>
                          <td className="px-6 py-4 text-gray-600">
                            <span className="inline-flex items-center gap-2">
                              <span className="text-green-500">🕐</span>
                              {formatDate(registration.registeredAt)}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                          No students have registered for this event yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end print:hidden">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-xl bg-[#4B5563] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#374151]"
              >
                🖨️ Print List
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
