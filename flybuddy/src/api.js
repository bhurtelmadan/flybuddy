export const API_URL = 'https://flybuddy-backend-q1q98r9iy-bhurtelmadans-projects.vercel.app/api';
// export const API_URL = 'https://localhost:5000';



const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Request failed');
    return data;
};

const fetchWithAuth = (url, options = {}) => {
    const token = localStorage.getItem('token');
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
};

export const signup = async (userData) => {
    const response = await fetchWithAuth(`${API_URL}/users/signup`, {
        method: 'POST',
        body: JSON.stringify(userData),
    });
    return handleResponse(response);
};

export const login = async (credentials) => {
    const response = await fetchWithAuth(`${API_URL}/users/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
    return handleResponse(response);
};

export const createFlight = async (payload) => {
    const response = await fetchWithAuth(`${API_URL}/flights`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    return handleResponse(response);
};

export const updateFlight = async (id, payload) => {
    const response = await fetchWithAuth(`${API_URL}/flights/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
    return handleResponse(response);
};

export const deleteFlight = async (id) => {
    const response = await fetchWithAuth(`${API_URL}/flights/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};

export const getAllFlight = async () => {
    const response = await fetchWithAuth(`${API_URL}/flights`);
    return handleResponse(response);
};

export const sendMessage = async (payload) => {
    const response = await fetchWithAuth(`${API_URL}/message/send`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    return handleResponse(response);
};

export const getReceivedMessage = async () => {
    const response = await fetchWithAuth(`${API_URL}/message/received`);
    return handleResponse(response);
};

export const getSentMessage = async () => {
    const response = await fetchWithAuth(`${API_URL}/message/sent`);
    return handleResponse(response);
};

export const deleteMessage = async (id) => {
    const response = await fetchWithAuth(`${API_URL}/message/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};