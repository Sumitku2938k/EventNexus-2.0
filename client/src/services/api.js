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

export const getAdminDashboardSummary = async (token) => {
    const response = await fetch(`${BASE_URL}/admin/dashboard`, {
        method: "GET",
        headers: {
            Authorization: `${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch dashboard summary");
    }

    return data;
};

export const getEventById = async (id, token) => {
    const response = await fetch(`${BASE_URL}/events/${id}`, {
        method: "GET",
        headers: {
            Authorization: `${token}`
        },
    });

    if (!response.ok) {
        throw new Error("Event fetch failed");
    }

    return response.json();
};

export const registerForEvent = async (eventId, registrationData, token) => {
    const response = await fetch(`${BASE_URL}/events/${eventId}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify(registrationData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Event registration failed");
    }

    return data;
};

export const deleteEventById = async (id, token) => {
    const response = await fetch(`${BASE_URL}/admin/events/delete/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `${token}`
        },
    });

    if (!response.ok) {
        throw new Error("Event deletion failed");
    }

    return response.json();
};

export const updateEvent = async (id, formData, token) => {
    const res = await fetch(`${BASE_URL}/admin/events/update/${id}`, {
        method: "PATCH",  
        headers: {
            Authorization: `${token}`
        },
        body: formData
    });

    if (!res.ok) {
        throw new Error("Event update failed");
    }

    return res.json();
};

export const getMyRegistrations = async (token) => {
    const response = await fetch(`${BASE_URL}/registrations/me`, {
        method: 'GET',
        headers: {
            Authorization: `${token}`,
        },
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch registrations');
    }

    return data;
};

export const checkRegistration = async (eventId, token) => {
    const response = await fetch(`${BASE_URL}/registrations/check/${eventId}`, {
        method: 'GET',
        headers: {
            Authorization: `${token}`,
        },
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to check registration');
    }

    return data;
};

export const unregisterFromEvent = async (eventId, token) => {
    const response = await fetch(`${BASE_URL}/events/${eventId}/unregister`, {
        method: 'DELETE',
        headers: {
            Authorization: `${token}`,
        },
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to unregister from event');
    }

    return data;
};