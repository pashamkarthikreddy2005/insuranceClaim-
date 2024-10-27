import axios from 'axios';

const CheckService = {
    hasBike: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/user/hasBike', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data === true;
        } catch (error) {
            console.error('Error checking bike policy:', error);
            throw error;
        }
    },

    hasCar: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/user/hasCar', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data === true;
        } catch (error) {
            console.error('Error checking car policy:', error);
            throw error;
        }
    },

    hasHealth: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/user/hasHealth', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data === true;
        } catch (error) {
            console.error('Error checking health policy:', error);
            throw error;
        }
    },

    hasLife: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/user/hasLife', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data === true;
        } catch (error) {
            console.error('Error checking life policy:', error);
            throw error;
        }
    },

    hasHome: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/user/hasHome', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data === true;
        } catch (error) {
            console.error('Error checking home policy:', error);
            throw error;
        }
    }
};

export default CheckService;
