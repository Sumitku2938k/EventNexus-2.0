import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    //Store token in local storage
    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };
    //Store user data in local storage
    const storeUserInLS = (serverUser) => {
        setUser(serverUser);
        localStorage.setItem("user", JSON.stringify(serverUser));
    };

    let isLoggedIn = !!token; //if token is present then true else false
    console.log("isLoggedIn : ", isLoggedIn);

    //Tackling the Logout functionality
    const LogoutUser = () => {
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, storeUserInLS }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    
    if(!authContextValue){
        throw new Error(" useAuth used outside of the Provider");
    }

    return authContextValue;
};

