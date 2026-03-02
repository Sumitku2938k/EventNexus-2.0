import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, IndianRupee, ImagePlus, Type, AlignLeft, Layers, X } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../utils/auth";
import { updateEvent, getEventById } from "../services/api"

const UpdateEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authorizationToken } = useAuth();

    const [event, setEvent] = useState({
        name: "",
        description: "",
        date: "",
        venue: "",
        category: "",
        registrationFee: "",
    });

    const [poster, setPoster] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch event data
    useEffect(() => {
        const getEventData = async () => {
            try {
                const data = await getEventById(id, authorizationToken);
                const { name, description, date, venue, category, registrationFee, poster } = data.event;
                
                // Format date for input field (YYYY-MM-DD)
                const formattedDate = date ? new Date(date).toISOString().split('T')[0] : "";

                setEvent({
                    name,
                    description,
                    date: formattedDate,
                    venue,
                    category,
                    registrationFee,
                });
                setPreview(poster); // Set existing poster as preview
            } catch (error) {
                console.error("Error fetching event:", error);
                toast.error("Error fetching event data");
            } finally {
                setLoading(false);
            }
        };

        getEventData();
    }, [id, authorizationToken, navigate]);

    // handle input
    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    // handle image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPoster(file);
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setPoster(null);
        setPreview(null);
    }

    // submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("name", event.name);
            formData.append("description", event.description);
            formData.append("date", event.date);
            formData.append("venue", event.venue);
            formData.append("registrationFee", event.registrationFee);
            formData.append("category", event.category);

            if (poster) {
                formData.append("poster", poster);
            }

            await updateEvent(id, formData, authorizationToken);

            toast.success("Event Updated Successfully");
            navigate(`/events/${id}`);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
        
                {/* Header */}
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Update Event</h2>
                    <p className="text-gray-500 mt-2">Edit the details of your event</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Type size={18} className="text-indigo-500" /> Event Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={event.name}
                        onChange={handleChange}
                        placeholder="e.g. Annual Tech Fest 2025"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none bg-gray-50 focus:bg-white"
                        required
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <AlignLeft size={18} className="text-indigo-500" /> Description
                    </label>
                    <textarea
                        name="description"
                        value={event.description}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Describe the event details, agenda, and highlights..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none bg-gray-50 focus:bg-white resize-y"
                        required
                    />
                </div>

                {/* Row */}
                <div className="grid md:grid-cols-2 gap-6">

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Calendar size={18} className="text-indigo-500" /> Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={event.date}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none bg-gray-50 focus:bg-white"
                            required
                        />  
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <MapPin size={18} className="text-indigo-500" /> Venue
                        </label>
                        <input
                            type="text"
                            name="venue"
                            value={event.venue}
                            onChange={handleChange}
                            placeholder="e.g. Main Auditorium"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none bg-gray-50 focus:bg-white"
                            required
                        />
                    </div>

                </div>

                {/* Row 2 */}
                <div className="grid md:grid-cols-2 gap-6">

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Layers size={18} className="text-indigo-500" /> Category
                        </label>
                        <select
                            name="category"
                            value={event.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none bg-gray-50 focus:bg-white"
                            required
                        >
                            <option value="" disabled>Select Category</option>
                            <option value="Technical">💻 Technical</option>
                            <option value="Cultural">🎭 Cultural</option>
                            <option value="Sports">⚽ Sports</option>
                            <option value="Workshop">🛠️ Workshop</option>
                            <option value="Seminar">📢 Seminar</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <IndianRupee size={18} className="text-indigo-500" /> Registration Fee
                        </label>
                        <input
                            type="number"
                            name="registrationFee"
                            value={event.registrationFee}
                            onChange={handleChange}
                            min="0"
                            placeholder="0"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none bg-gray-50 focus:bg-white"
                            required
                        />  
                    </div>

                </div>

                {/* Image */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <ImagePlus size={18} className="text-indigo-500" /> Event Poster
                    </label>
            
                    {!preview ? (
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-indigo-500 transition">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <ImagePlus className="w-10 h-10 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                            </div>
                            <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                        </label>
                    ) : (
                        <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                            <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                            <button 
                                type="button"
                                onClick={removeImage}
                                className="absolute top-2 right-2 p-1.5 bg-white text-red-500 rounded-full shadow-md hover:bg-red-50 transition"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="flex-1 py-3 cursor-pointer rounded-lg bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg hover:opacity-90 transform transition hover:-translate-y-0.5"
                    >
                        Update Event
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/events/${id}`)}
                        className="px-6 py-3 cursor-pointer rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
};

export default UpdateEvent
