import { CalendarCheck, List, Plus, Laptop, Theater, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="space-y-8">
            
            {/* 🔥 HERO SECTION */}
            <div className="bg-indigo-100/40 rounded-2xl p-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-indigo-600 flex items-center justify-center gap-2"><CalendarCheck size={32} />College Event Manager</h1>
                <p className="text-gray-600 mt-3">Organize, manage, and participate in exciting college events</p>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mt-6">

                    <Link
                        to="/events"
                        className="flex items-center gap-2 px-6 py-3 rounded-md bg-linear-to-r from-indigo-500 to-purple-500 text-white font-medium hover:opacity-90 transition"
                    >
                        <List size={18} />
                        Browse Events
                    </Link>

                    <Link
                        to="/create-event"
                        className="flex items-center gap-2 px-6 py-3 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition"
                    >
                        <Plus size={18} />
                        Create Event
                    </Link>
                </div>
            </div>

            {/* 🔥 CARDS SECTION */}
            <div className="grid md:grid-cols-3 gap-6">

                {/* Card 1 */}
                <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition">
                    <Laptop size={40} className="text-indigo-500 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold">Technical Events</h3>
                    <p className="text-gray-500 text-sm mt-2">Hackathons, workshops, and coding competitions</p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition">
                    <Theater size={40} className="text-pink-500 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold">Cultural Events</h3>
                    <p className="text-gray-500 text-sm mt-2">Music, dance, drama, and art festivals</p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition ">
                    <Trophy size={40} className="text-cyan-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold">Sports Events</h3>
                    <p className="text-gray-500 text-sm mt-2">Tournaments, matches, and athletic competitions</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
