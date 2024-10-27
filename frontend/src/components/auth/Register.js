import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import UserService from '../Service/UserService';
import Loader from '../general/Loader';
import SmallFooter from './SmallFooter';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'USER'
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
            const response = await UserService.register(formData);
            console.log("Registration Response:", response);

            if (response.statusCode === 200) {
                setResponseMessage("User Registered Successfully");
                setIsSuccess(true);
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    phoneNumber: '',
                    role: 'USER'
                });

                setTimeout(() => {
                    setLoading(false);
                    navigate('/home');
                }, 1000);
            } else {
                setResponseMessage(response.error || "An error occurred during registration.");
                setIsSuccess(false);
            }
        } catch (error) {
            setLoading(false);
            console.error("Error during registration:", error);
            if (error.response && error.response.data) {
                setResponseMessage(error.response.data.error || "An error occurred while registering the user");
            } else {
                setResponseMessage("Username or Email already exists");
            }
            setIsSuccess(false);
        }
    };

    return (
        <>
            {loading && <Loader />}
            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            id='loginuser'
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
                            className='loginok'
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
                            className='loginok'
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
                            className='loginok'
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                    {responseMessage && (
                        <p className={`response-message ${isSuccess ? 'success' : 'error'}`}>
                            {responseMessage}
                        </p>
                    )}
                </form>
            </div>
            <footer className="small-footerr">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 1440 320"
                    className="small-footerr-svg"
                >
                    <path 
                        fill="#002e6b"
                        d="M0,315 C720,128 720,128 1440,315 L1440,320 L0,320 Z" 
                    />
                </svg>
                <div className="small-footerr-content">
                    <p>@Mass Mutual</p>
                    <p>All rights reserved &copy; {new Date().getFullYear()}</p>
                </div>
            </footer>
        </>
    );
}

export default Register;
