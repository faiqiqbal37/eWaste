import axios from 'axios';

const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:5000/login', {
            email,
            password
        });
        return response.data; // Return the response data
    } catch (error) {
        throw error; // Throw the error for handling in the component
    }
};
const register = async (name, email, password) => {
    try {
        const response = await axios.post('http://localhost:5000/register', {
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

export default login;