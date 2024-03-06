import axios from 'axios';

export const login = async (email, password) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/auth/login', {
            email,
            password
        });
        return response.data; // Return the response data
    } catch (error) {
        throw error; // Throw the error for handling in the component
    }
};
export const register = async (name, email, password) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/auth/register', {
            password,
            name,
            role: "customer",
            email,

        });
        return response.data; // Return the response data
    } catch (error) {
        throw error; // Throw the error for handling in the component
    }
};

