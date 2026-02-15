import { NavLink } from "react-router-dom";
import { CalendarDays, List, LogIn, UserPlus, UserCircle, LogOut, Plus, LayoutDashboard, GraduationCap } from "lucide-react";
import { useState } from "react";

const Navbar = ({ currentUser }) => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
            <div className="max-w-7xl mx-auto py-6 flex items-center justify-between text-white">
        
                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-2 text-lg font-semibold text-indigo-400"><CalendarDays size={20} />College Event Manager</NavLink>

                {/* Right Side */}
                <div className="flex items-center gap-5 text-sm font-medium">

                    {/* Common */}
                    <NavLink to="/events" className="flex items-center gap-1 text-gray-300 hover:text-indigo-400 transition"><List size={16} />All Events</NavLink>

                    {/* Logged In */}
                    {currentUser?.isLoggedIn ? (
                        <>
                            {/* Student */}
                            {currentUser.role === "student" && (
                                <NavLink to="/dashboard/student" className="flex items-center gap-1 text-gray-300 hover:text-indigo-400"><GraduationCap size={16} />My Registrations</NavLink>
                            )}

                            {/* Admin */}
                            {currentUser.role === "admin" && (
                                <>
                                    <NavLink to="/dashboard/admin" className="flex items-center gap-1 text-gray-300 hover:text-indigo-400"><LayoutDashboard size={16} />Dashboard</NavLink>
                                    <NavLink to="/events/new" className="flex items-center gap-1 px-3 py-1 border border-gray-600 rounded-md hover:bg-gray-800"><Plus size={16} />New Event</NavLink>
                                </>
                            )}

                            {/* User Dropdown */}
                            <div className="relative">
                                <button onClick={() => setOpen(!open)} className="flex items-center gap-1 text-gray-300 hover:text-indigo-400"><UserCircle size={18} />{currentUser.name}</button>
                                {open && (
                                    <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-md shadow-lg">
                                        <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-800">Logged in as {currentUser.role}</div>
                                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-800"><LogOut size={16} />Logout</button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Guest */}
                            <NavLink to="/login" className="flex items-center gap-1 text-gray-300 hover:text-indigo-400"><LogIn size={16} />Login</NavLink>
                            <NavLink to="/signup" className="flex items-center gap-1 px-3 py-1 border border-gray-600 rounded-md hover:bg-gray-800"><UserPlus size={16} />Sign Up</NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
