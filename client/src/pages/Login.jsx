import { LogIn, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {useAuth} from '../utils/auth.jsx';

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const Navigate = useNavigate();
    const { storeTokenInLS, storeUserInLS } = useAuth();

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("User logged in: ",user);
        //Handling the form submission
        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            console.log("login form data : ", response);

            if (response.ok) {
                const res_data = await response.json();
                console.log("Response from Server while login: ", res_data);
                // Store token and user data (assuming res_data contains token and user object)
                // Adjust 'res_data.token' and 'res_data.user' based on your actual API response
                storeTokenInLS(res_data.token);
                storeUserInLS(res_data.user);
                
                setUser({ email: "", password: "" });
                setTimeout(() => Navigate("/"), 3000);
                toast.success("Login Successful");
            } else {
                console.log("Error in response while trying to login");
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log("Login Error: ", error);
        }
    };
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="w-full max-w-md bg-gray-50 rounded-xl shadow p-6 ">
        
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <LogIn size={40} className="text-indigo-500" />
                        <h2 className="text-2xl font-semibold">Welcome Back</h2>
                    </div>

                    <div className="w-14 h-1 bg-indigo-500 mx-auto rounded mb-2"></div>
                    <p className="text-gray-500 text-sm">Login to manage college events</p>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>

                    {/* Email */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-1"><Mail size={16} /> Email Address</label>
                        <input type="email" onChange={handleInputChange} name="email" value={user.email} placeholder="your.email@college.edu" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-1"><Lock size={16} /> Password</label>
                        <input type="password" onChange={handleInputChange} name="password" value={user.password} placeholder="Enter your password" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
                    </div>

                    {/* Button */}
                    <button type="submit" className="w-full py-2 rounded-md bg-linear-to-r from-indigo-600 to-purple-600 cursor-pointer text-white font-medium flex items-center justify-center gap-2 transform transition duration-200 ease-in-out hover:scale-101 hover:shadow-lg hover:opacity-90"><LogIn size={18} />Login</button>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-500">Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-600 hover:text-blue-700">Sign up here</Link>
                    </p>
                </form> 
            </div>
        </div>
    );
};

export default Login;
