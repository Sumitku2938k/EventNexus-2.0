import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, IndianRupee, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../utils/auth";
import { getMyRegistrations } from "../services/api";

const MyRegistrations = () => {
    const { authorizationToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        const fetchRegs = async () => {
            try {
                const data = await getMyRegistrations(authorizationToken);
                setRegistrations(data.registrations || []);
            } catch (error) {
                toast.error(error.message || "Unable to load registrations");
            } finally {
                setLoading(false);
            }
        };

        fetchRegs();
    }, [authorizationToken]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!registrations || registrations.length === 0) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-700">No Registrations Found</h2>
                <p className="mt-3 text-gray-500">You haven't registered for any events yet.</p>
                <Link to="/events" className="mt-4 inline-block text-indigo-600 hover:underline">Browse Events</Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">My Registrations</h1>
                <p className="mt-2 text-sm text-gray-500">Events you have signed up for.</p>
            </div>

            <div className="grid gap-6">
                {registrations.map((reg) => {
                    const ev = reg.eventId || {};
                    return (
                        <div key={reg._id} className="bg-white rounded-2xl shadow p-5 border border-gray-100 flex items-center gap-6">
                            <div className="w-28 h-20 bg-gray-100 flex items-center justify-center rounded-xl overflow-hidden">
                                {ev.poster ? <img src={ev.poster} alt={ev.name} className="max-h-full max-w-full object-contain"/> : <div className="text-gray-400">No Image</div>}
                            </div>

                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-900">{ev.name}</h2>
                                <p className="text-sm text-gray-500 mt-1">{ev.description ? ev.description.slice(0,120) + (ev.description.length>120?"...":"") : "No description"}</p>
                                <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2"><Calendar size={16}/> {ev.date ? new Date(ev.date).toDateString() : 'TBD'}</div>
                                    <div className="flex items-center gap-2"><IndianRupee size={16}/> {ev.registrationFee>0 ? `₹${ev.registrationFee}` : 'Free'}</div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <Link to={`/events/${ev._id}`} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700">View Event</Link>
                                <span className="text-xs text-gray-400">Registered on {new Date(reg.registeredAt).toDateString()}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyRegistrations;
