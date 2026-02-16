import { NavLink } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function Error() {
    return (
        <div className="flex flex-col items-center justify-center text-center px-6 py-16">
            
            {/* Icon */}
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 mb-4">
                <AlertTriangle className="text-red-500" size={28} />
            </div>

            {/* 404 */}
            <h1 className="text-6xl font-bold text-gray-800">404</h1>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-700 mt-2">Page Not Found</h2>

            {/* Description */}
            <p className="text-gray-500 max-w-md mt-3">
                Oops! The page you're looking for doesn't exist or has been moved.
                If you think this is a mistake, you can report it.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-6 flex-wrap justify-center">
        
                <NavLink
                    to="/"
                    className="px-5 py-2 rounded-md bg-linear-to-r from-indigo-500 to-purple-500 text-white font-medium hover:opacity-90 transition"
                >
                    Return Home
                </NavLink>

                <NavLink
                    to="/contact"
                    className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                    Report Problem
                </NavLink>

            </div>
        </div>
    );
}
