import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventRegistrations } from "../services/api";
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

        const data = await getEventRegistrations(eventId, authorizationToken);
        const registrationList = data.registrations || [];

        setRegistrations(registrationList);
        setEventDetails(registrationList[0]?.eventId || null);
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
    <div className="w-full min-h-screen bg-[#F0F1F8] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#6C63FF]">
              Event Registrations
            </p>
            <h1 className="mt-1 text-3xl font-extrabold text-gray-800">
              {eventDetails?.name || "Registered Students"}
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {eventDetails ? `${formatDate(eventDetails.date)} at ${eventDetails.venue}` : "Student registration list"}
            </p>
          </div>

          <Link
            to="/dashboard/admin"
            className="inline-flex items-center justify-center rounded-lg bg-[#1E2130] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Back to Dashboard
          </Link>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <p className="text-lg font-bold text-gray-800">Unable to load registrations</p>
            <p className="mt-2 text-sm text-gray-500">{error}</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-800">
                Students ({registrations.length})
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
                    registrations.map((registration) => (
                      <tr
                        key={registration._id}
                        className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-semibold text-gray-800">{registration.name}</td>
                        <td className="px-6 py-4 text-gray-600">{registration.email}</td>
                        <td className="px-6 py-4 text-gray-600">{registration.phone}</td>
                        <td className="px-6 py-4 text-gray-600">{registration.college}</td>
                        <td className="px-6 py-4 text-gray-600">{registration.branch}</td>
                        <td className="px-6 py-4 text-gray-600">{registration.year}</td>
                        <td className="px-6 py-4 text-gray-600">{formatDate(registration.registeredAt)}</td>
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
        )}
      </div>
    </div>
  );
}
