import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import { useAuth } from '../utils/auth';
import { getEvents } from "../services/api";

const Events = () => {
  const [events, setEvents] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllEvents = async () => {
    try {
        const data = await getEvents(authorizationToken);
        console.log("Fetched events data successfully");
        setEvents(data.events);
    } catch (error) {
      console.error("Error in fetching events : ", error);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="space-y-8">
    
      {/* 🔥 HEADER (separate) */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          🎉 All College Events
        </h2>
        <p className="text-gray-500 mt-3">
          Discover and manage exciting events happening on campus
        </p>
      </div>

      {/* 🔥 GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

    </div>
  );
}

export default Events;