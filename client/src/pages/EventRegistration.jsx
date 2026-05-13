import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Calendar, IndianRupee, ArrowLeft, User, Mail, Phone, School, BookOpen, GraduationCap } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../utils/auth";
import { getEventById, registerForEvent } from "../services/api";

const EventRegistration = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authorizationToken, user } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        college: "",
        branch: "",
        year: "",
    })    ;

    useEffect(() => {
        if (user?.role === "admin") {
            navigate("/events", { replace: true });
            return;
        }

        setFormData((current) => ({
            ...current,
            name: user?.name || current.name,
            email: user?.email || current.email,
        }));
    }, [navigate, user]);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await getEventById(id, authorizationToken);
                setEvent(data.event);
            } catch (error) {
                toast.error(error.message || "Unable to load event details");
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [authorizationToken, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((current) => ({
            ...current, [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);
            await registerForEvent(id, formData, authorizationToken);
            toast.success("Registration submitted successfully");
            navigate("/events");
        } catch (error) {
            toast.error(error.message || "Failed to register for the event");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-700">Event not found</h2>
                <Link to="/events" className="mt-4 inline-block text-indigo-600 hover:underline">
                    Back to Events
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <Link to={`/events/${id}`} className="mb-6 inline-flex items-center text-gray-600 transition hover:text-indigo-600">
                <ArrowLeft size={20} className="mr-2" /> Back to Event Details
            </Link>

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100">
                    <div className="relative flex h-72 items-center justify-center bg-gray-100">
                        <img src={event.poster} alt={event.name} className="max-h-full max-w-full object-contain" />
                    </div>

                    <div className="p-6 md:p-8 space-y-5">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">Event Registration</p>
                            <h1 className="mt-2 text-3xl font-bold text-gray-900">{event.name}</h1>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                                    <Calendar size={22} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Date</p>
                                    <p className="font-semibold text-gray-800">{new Date(event.date).toDateString()}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                <div className="rounded-xl bg-green-100 p-3 text-green-600">
                                    <IndianRupee size={22} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Fee</p>
                                    <p className="font-semibold text-gray-800">{event.registrationFee > 0 ? `₹${event.registrationFee}` : "Free"}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-3 text-xl font-bold text-gray-900">About the Event</h2>
                            <p className="whitespace-pre-line leading-relaxed text-gray-600">{event.description}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl bg-white p-6 md:p-8 shadow-xl border border-gray-100">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Student Details</h2>
                        <p className="mt-2 text-sm text-gray-500">Fill in your information to confirm your registration.</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-700" htmlFor="name">
                                <User size={16} /> Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                type="text"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                placeholder="Your full name"
                            />
                        </div>

                        <div>
                            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-700" htmlFor="email">
                                <Mail size={16} /> Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                type="email"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                placeholder="your.email@college.edu"
                            />
                        </div>

                        <div>
                            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-700" htmlFor="phone">
                                <Phone size={16} /> Phone Number
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                type="tel"
                                maxLength={10}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                placeholder="10 digit mobile number"
                            />
                        </div>

                        <div>
                            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-700" htmlFor="college">
                                <School size={16} /> College
                            </label>
                            <input
                                id="college"
                                name="college"
                                value={formData.college}
                                onChange={handleChange}
                                required
                                type="text"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                placeholder="Your college name"
                            />
                        </div>

                        <div>
                            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-700" htmlFor="branch">
                                <BookOpen size={16} /> Branch
                            </label>
                            <input
                                id="branch"
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                required
                                type="text"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                placeholder="e.g. Computer Science"
                            />
                        </div>

                        <div>
                            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-700" htmlFor="year">
                                <GraduationCap size={16} /> Year of Study
                            </label>
                            <select
                                id="year"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            >
                                <option value="">Select your year</option>
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="mt-2 w-full rounded-xl bg-linear-to-r cursor-pointer from-indigo-600 to-purple-600 px-6 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {submitting ? "Submitting..." : "Submit Registration"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventRegistration;