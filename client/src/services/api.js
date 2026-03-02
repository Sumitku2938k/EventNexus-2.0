const BASE_URL = "http://localhost:5000/api";

export const getEvents = async (token) => {
    const response = await fetch(`${BASE_URL}/events`, {
        method: "GET",
        headers: {
            Authorization: `${token}`,
        },
    });
    return response.json();
};