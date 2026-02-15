import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ user }) => {
    const [open, setOpen] = useState(false);

    return (
        <header className="bg-gray-800 border-b border-gray-800 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">

                {/* Logo */}
                <NavLink to="/" className="text-lg font-semibold tracking-wide hover:text-blue-400 transition">College Event Manager</NavLink>

                {/* Right Side */}
                <div className="flex items-center gap-6 text-sm font-medium">
                    <NavLink to="/events" className={({ isActive }) =>`hover:text-blue-400 transition ${isActive ? "text-blue-400" : "text-gray-300"}`}>All Events</NavLink>

                    {/* 🔥 AUTH BASED UI */}
                    {user ? (
                        <>
                            {/* Student */}
                            {user.role === "student" && ( <NavLink to="/dashboard/student" className="hover:text-blue-400 text-gray-300" >My Registrations</NavLink>)}

                            {/* Admin */}
                            {user.role === "admin" && (
                                <>
                                    <NavLink to="/dashboard/admin" className="hover:text-blue-400 text-gray-300">Dashboard</NavLink>
                                    <NavLink to="/events/new" className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-black transition">+ New Event</NavLink>
                                </>
                            )}

                            {/* Dropdown */}
                            <div className="relative">
                                <button onClick={() => setOpen(!open)} className="flex items-center gap-2 hover:text-blue-400">👤 {user.name}</button>

                                {open && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                                        <div className="px-4 py-2 text-sm text-gray-500 border-b">Logged in as {user.role}</div>
                                        <button onClick={() => console.log("logout")} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Guest */}
                            <NavLink to="/login" className="hover:text-blue-400 text-gray-300">Login</NavLink>
                            <NavLink to="/signup" className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-black transition">Sign Up</NavLink>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
