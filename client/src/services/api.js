const BASE_URL = "http://localhost:5000/api";

export const registerUser = async (user) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    if (!res.ok) {
        throw new Error("Registration failed");
    }

    return res.json();
};

export const loginUser = async (userData) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    return data;
};

export const getEvents = async (token) => {
    const response = await fetch(`${BASE_URL}/events`, {
        method: "GET",
        headers: {
            Authorization: `${token}`,
        },
    });
    return response.json();
};

export const createEvent = async (formData, token) => {
    const res = await fetch(`${BASE_URL}/admin/events/create`, {
        method: "POST",
        headers: {
            Authorization: `${token}`
        },
        body: formData
    });

    if (!res.ok) {
        throw new Error("Event creation failed");
    }

    return res.json();
};