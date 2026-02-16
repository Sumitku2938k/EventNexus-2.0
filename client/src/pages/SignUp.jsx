import { UserPlus, User, Mail, Lock, UserCog } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const Navigate = useNavigate();

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if(response.ok){
        
      }
    } catch (error) {
      
    }
    console.log("User registered: ",user);
    setUser({name: "", email: "", password: "", role: "student",});
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      
      <div className="w-full max-w-md bg-gray-50 rounded-xl shadow p-6 ">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <UserPlus size={40} className="text-indigo-500" />
            <h2 className="text-2xl font-semibold">Create Account</h2>
          </div>
          <div className="w-12 h-1 bg-indigo-500 mx-auto rounded mb-2"></div>
          <p className="text-gray-500 text-sm">Join our college event community</p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1" htmlFor="Full Name"><User size={16} />Full Name</label>
            <input type="text" onChange={handleInputChange} name="name" value={user.name} placeholder="Enter your full name" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1"><Mail size={16} /> Email Address</label>
            <input type="email" onChange={handleInputChange} name="email" value={user.email} placeholder="your.email@college.edu" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1"><Lock size={16} /> Password</label>
            <input type="password" onChange={handleInputChange} name="password" value={user.password} placeholder="Minimum 6 characters" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
          </div>

          {/* Role */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1"><UserCog size={16} /> I am a</label>
            <select className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <option value="student">🎓 Student</option>
              <option value="admin">👨‍💼 Admin</option>
            </select>
          </div>

          {/* Button */}
          <button type="submit" className="w-full py-2 rounded-md bg-linear-to-r from-indigo-600 to-purple-600 cursor-pointer text-white font-medium flex items-center justify-center gap-2 transform transition duration-200 ease-in-out hover:scale-101 hover:shadow-lg hover:opacity-90"><UserPlus size={18} />Sign Up</button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-700">
              Login here
            </a>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Signup;
