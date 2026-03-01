import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, IndianRupee, ImagePlus, Tag } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../utils/auth";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { authorizationToken } = useAuth();

  const [event, setEvent] = useState({
    name: "",
    description: "",
    date: "",
    venue: "",
    category: "",
    registrationFee: 0,
  });

  const [poster, setPoster] = useState(null);
  const [preview, setPreview] = useState(null);

  // handle input
  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  // handle image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPoster(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

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
      formData.append("poster", poster); // ⚠️ IMPORTANT
    }

    const response = await fetch("http://localhost:5000/api/events", {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        // ❌ Content-Type mat lagana
      },
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Event Created");
      navigate("/events");
    } else {
      toast.error(data.message || "Error");
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
            <Tag className="text-indigo-500" /> Create New Event
          </h2>
          <p className="text-gray-500 text-sm">
            Fill in the details to create an exciting event
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <Tag size={16} /> Event Name
            </label>
            <input
              type="text"
              name="name"
              value={event.name}
              onChange={handleChange}
              placeholder="Tech Fest 2025"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Description
            </label>
            <textarea
              name="description"
              value={event.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your event..."
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* Row */}
          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-1">
                <Calendar size={16} /> Date
              </label>
              <input
                type="date"
                name="date"
                value={event.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-1">
                <MapPin size={16} /> Venue
              </label>
              <input
                type="text"
                name="venue"
                value={event.venue}
                onChange={handleChange}
                placeholder="Main Auditorium"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium mb-1 block">
                Category
              </label>
              <select
                name="category"
                value={event.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
                required
              >
                <option value="">Select Category</option>
                <option value="Technical">💻 Technical</option>
                <option value="Cultural">🎭 Cultural</option>
                <option value="Sports">⚽ Sports</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-1">
                <IndianRupee size={16} /> Fee
              </label>
              <input
                type="number"
                name="registrationFee"
                value={event.registrationFee}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

          </div>

          {/* Image */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <ImagePlus size={16} /> Event Poster
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full"
              accept="image/*"
            />

            {/* Preview */}
            {preview && (
              <div className="mt-3 flex justify-center">
                <img
                  src={preview}
                  alt="preview"
                  className="w-40 h-40 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 py-2 rounded-md bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium hover:scale-105 hover:shadow-lg transition"
            >
              Create Event
            </button>

            <button
              type="button"
              onClick={() => navigate("/events")}
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateEvent;