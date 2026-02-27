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
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, idx) => (
        <EventCard key={idx} event={event} />
      ))}
    </div>
  )
}

export default Events
