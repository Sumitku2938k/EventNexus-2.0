import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const storeTokenInLS = (serverToken) => {
        localStorage.setItem("token", serverToken);
    };
    const storeUserInLS = (serverUser) => {
        localStorage.setItem("user", JSON.stringify(serverUser));
    };

    return (
        <AuthContext.Provider value={{ storeTokenInLS, storeUserInLS }}>
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

