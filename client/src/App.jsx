import Home from './pages/Home';
import Login from './pages/Login';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import AdminDashboard from './pages/AdminDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './pages/SignUp';
import Error from './pages/Error';
import Logout from './pages/Logout';

function App() {

  return (
    <>
    <Router>
      
      {/* Navbar */}
      <Navbar />

      {/* 🔥 FULL PAGE BACKGROUND */}
      <div className="min-h-screen bg-linear-to-r from-indigo-500 to-purple-600">

        {/* 🔥 WHITE MAIN CONTAINER */}
        <div className="px-20 py-5 mx-auto max-w-11xl">
          <div className="bg-white rounded-2xl min-h-[85vh] p-6 shadow-xl border border-gray-200 flex items-center justify-center">

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/create-event" element={<CreateEvent />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path='*' element={<Error />} />
            </Routes>
          </div>
        </div>
      </div>

    </Router>
    </>
  )
}

export default App
