import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import UserService from '../Service/UserService';
import Loader from '../general/Loader';

function RegisterAgent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'ADMIN'
    });
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage('');
        if (!validatePhoneNumber(formData.phoneNumber)) {
            setLoading(false);
            setResponseMessage("Phone number must be exactly 10 digits and start with 6, 7, 8, or 9.");
            setIsSuccess(false);
            return;
        }

        try {
            const response = await UserService.registerAgent(formData);
            setResponseMessage("Agent Registered Successfully");
            setIsSuccess(true);
            setFormData({
                username: '',
                email: '',
                password: '',
                phoneNumber: '',
                role: 'ADMIN'
            });
            setTimeout(() => {
                setLoading(false);
                navigate("/Organizationhome");
            }, 1000);
        } catch (error) {
            setLoading(false);
            console.error("Error during registration:", error.response || error.message);
            setResponseMessage("An error occurred while registering the agent");
            setIsSuccess(false);
        }
    };

    return (
        <>
            {loading && <Loader />}
            <div className="register-container">
                <h2>Register Agent</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            className="loginok" 
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Phone Number:</label>
                        <input
                            className="loginok" 
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            className="loginok" 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            className="loginok"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">Register Agent</button>
                    {responseMessage && (
                        <p className={`response-message ${isSuccess ? 'success' : 'error'}`}>
                            {responseMessage}
                        </p>
                    )}
                </form>
            </div>
        </>
    );
}

export default RegisterAgent;
