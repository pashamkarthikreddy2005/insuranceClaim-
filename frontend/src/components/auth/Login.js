import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../Service/UserService';
import './Login.css';
import Loader from '../general/Loader';
import SmallFooter from './SmallFooter';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await UserService.login(username, password);
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                
                setLoading(true);

                setTimeout(() => {
                    setLoading(false);
                    if (userData.role === "USER") {
                        navigate('/home');
                    } else if(userData.role === "ADMIN"){
                        navigate('/all-claims');
                    } else {
                        navigate('/Organizationhome');
                    }
                }, 1000);
            } else {
                setError(userData.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred during login.');
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <>
            {loading ? ( 
                <Loader />
            ) : (
                <div className="login-page-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Username:</label>
                            <input
                                className='username-field'
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                className='password-field'
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                </div>
                
            )
            }
            <SmallFooter/>
        </>
    );
}

export default Login;
