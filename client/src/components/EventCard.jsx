import { Calendar, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
    const { _id, name, description, date, registrationFee, poster } = event;

    return (
        <Link to={`/events/${_id}`} className="block bg-white rounded-xl shadow-md overflow-hidden transform transition duration-200 ease-in-out hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg active:scale-95">
            
            {/* Image */}
            <img src={poster} alt={name} className="w-full h-60 object-fill" />

            {/* Content */}
            <div className="p-4">

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800">
                    {name}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm mt-1">
                    {description.length > 80 ? description.substring(0, 80) + "..." : description}
                </p>

                {/* Info */}
                <div className="mt-3 space-y-1 text-sm text-gray-600">

                    <p className="flex items-center gap-2">
                        <Calendar size={16} className="text-blue-500" />
                        <span><strong>Date:</strong> {new Date(date).toDateString()}</span>
                    </p>

                    <p className="flex items-center gap-2">
                        <IndianRupee size={16} className="text-green-600" />
                        <span><strong>Fee:</strong> ₹{registrationFee}</span>
                    </p>

                </div>

                {/* Button */}
                <div className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-md bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium hover:opacity-90 transition">
                    View Details
                </div>

            </div>
        </Link>
    );
};

export default EventCard;