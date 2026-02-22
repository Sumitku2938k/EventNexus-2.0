import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/auth.jsx";

// 🔐 Private Route
export const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return children;
};

// 🔐 Admin Route
export const AdminRoute = ({ children }) => {
    const { user } = useAuth();

    if (user?.role !== "admin") {
        return <Navigate to="/" />;
    }

    return children;
};