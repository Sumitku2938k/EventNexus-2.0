import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import { Calendar, IndianRupee, ArrowLeft, Edit, Trash2, Users } from "lucide-react";

const EventDetail = () => {
  const { id } = useParams();
  const { authorizationToken, user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  let Navigate = useNavigate();

  const getEventData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEvent(data.event);
      } else {
        console.error("Failed to fetch event data");
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-700">Event not found</h2>
        <Link to="/events" className="text-indigo-600 hover:underline mt-4 inline-block">
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/events" className="inline-flex items-center text-gray-600 hover:text-indigo-600 mb-6 transition">
        <ArrowLeft size={20} className="mr-2" /> Back to Events
      </Link>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-72 md:h-105 w-full bg-gray-100 flex items-center justify-center">
          <img 
            src={event.poster} 
            alt={event.name} 
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{event.name}</h1>
            <span className="px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full font-medium text-sm">
              Open for Registration
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Date</p>
                <p className="text-lg font-semibold text-gray-800">
                  {new Date(event.date).toDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                <IndianRupee size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Registration Fee</p>
                <p className="text-lg font-semibold text-gray-800">
                  {event.registrationFee > 0 ? `₹${event.registrationFee}` : 'Free'}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">About the Event</h3>
            <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
              {event.description}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
            {user?.role === "admin" ? (
              <>
                <button className="flex-1 bg-blue-500 text-white py-3.5 px-6 rounded-xl font-bold shadow-md hover:bg-blue-600 transition duration-200 cursor-pointer flex items-center justify-center gap-2" onClick={() => Navigate(`/events/${id}/edit`)}>
                  <Edit size={20} /> Edit Event
                </button>
                <button className="flex-1 bg-red-500 text-white py-3.5 px-6 rounded-xl font-bold shadow-md hover:bg-red-600 transition duration-200 cursor-pointer flex items-center justify-center gap-2">
                  <Trash2 size={20} /> Delete Event
                </button>
                <button className="flex-1 bg-green-500 text-white py-3.5 px-6 rounded-xl font-bold shadow-md hover:bg-green-600 transition duration-200 cursor-pointer flex items-center justify-center gap-2">
                  <Users size={20} /> Registrations
                </button>
              </>
            ) : (
              <button className="flex-1 bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3.5 px-8 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 cursor-pointer">
                Register Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
