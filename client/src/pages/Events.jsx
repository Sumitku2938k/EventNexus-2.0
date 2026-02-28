import React from 'react'
import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import { useAuth } from '../utils/auth';

const Events = () => {
  const [events, setEvents] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllEvents = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/events`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched events data successfully");
        setEvents(data.events);
      } else {
        console.error("Failed to fetch events");
      }
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

export default Events
