import axios from "axios";

class UserService {
    static BASE_URL = "http://localhost:8080";

    static async register(userData) {
        try {
            const registerResponse = await axios.post(`${UserService.BASE_URL}/auth/register`, userData);
            const user = registerResponse.data.user;
            const loginData = {
                username: userData.username,
                password: userData.password
            };
    
            const loginResponse = await axios.post(`${UserService.BASE_URL}/auth/login`, loginData);
            const token = loginResponse.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('role', user.role);
            localStorage.setItem('userName', user.username);
            return user;
        } catch (err) {
            console.error("Error during registration and login process:", err);
            throw err;
        }
    }
    

    static async registerAgent(userData) {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            const registerResponse = await axios.post(`${UserService.BASE_URL}/organization/admin/register`, userData, config);
            const loginData = {
                username: userData.username,
                password: userData.password
            };
            
        } catch (err) {
            throw err;
        }
    }
    

    static async login(username, password) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, { username, password });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    static isUser() {
        const role = localStorage.getItem('role');
        return role === 'USER';
    }

    static isAdmin() {
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    }
    static getUsername() {
        const username = localStorage.getItem('userName');
        return username;
    }
    static isOrganization() {
        const role = localStorage.getItem('role');
        return role === 'ORGANIZATION';
    }
    static getEmail(){
        const email=localStorage.getItem('email');
    }
}

export default UserService;
