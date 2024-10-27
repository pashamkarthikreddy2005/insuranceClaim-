import React, { useState, useRef } from 'react';
import './Home.css';
import Footer from './Footer';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [messageContent, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const messageSectionRef = useRef(null);

    const handleNewClaimClick = () => {
        setLoading(true);
        setTimeout(() => {
            navigate('/new-claim');
            setLoading(false);
        }, 1000);
    };

    const handleMyClaimsClick = () => {
        navigate('/my-claims');
    };

    const handleSendMessage = async () => {
        if (!messageContent) {
            alert("Please enter a message before sending.");
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('Please login to send a message');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/messages/add-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ message: messageContent })
            });

            if (response.ok) {
                setMessage('');
                setSuccessMessage('Message sent successfully!');
                setTimeout(() => {
                    setSuccessMessage('');
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        navigate('/home');
                    }, 500);
                }, 500);
            } else {
                console.error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleContactClick = () => {
        if (messageSectionRef.current) {
            const offset = 80; // Set the desired offset value (in pixels)
            const topPosition = messageSectionRef.current.getBoundingClientRect().top + window.scrollY - offset;
            
            window.scrollTo({
                top: topPosition,
                behavior: 'smooth' // Smooth scrolling effect
            });
        }
    };

    return (
      <>
        {loading ? (
            <Loader />
        ) : (
            <div className="home-container">
                <div className="header-image-container">
                    <img className='imghome' src='home_img1.jpg' alt="Header" />
                    <header className="home-header">
                        <h1>Welcome to the Insurance Claims Portal</h1>
                        <p>"Your one-stop solution for managing your insurance claims efficiently. Quickly file and track health, life, bike, and car claims, all while enjoying real-time updates and responsive support at your fingertips."</p>
                    </header>
                </div>

                <section className="home-features">
                    <h2>Features</h2>
                    <div className="feature-cards">
                        <div className="feature-card">
                            <img src="claim_icon.png" alt="File a Claim" className="feature-image" />
                            <h3>File a Claim</h3>
                            <p>Submit a new claim with ease.</p>
                            {loading ? (<Loader />) : (
                                <button onClick={handleNewClaimClick} className="new-claimok">
                                    New Claim
                                </button>
                            )}
                        </div>
                        <div className="feature-card">
                            <img src="tracking_claims.png" alt="Track Your Claims" className="feature-image" />
                            <h3>Track Your Claims</h3>
                            <p>Monitor the status of your claims in real-time.</p>
                            {loading ? (<Loader />) : (
                                <button onClick={handleMyClaimsClick} className="new-claimok">
                                    My Claims
                                </button>
                            )}
                        </div>
                        <div className="feature-card">
                            <img src="customer_service.png" alt="Contact Support" className="feature-image" />
                            <h3>Contact Support</h3>
                            <p>Contact an agent to know about your submitted claims.</p>
                            <button onClick={handleContactClick} className="contact-ok">
                                Contact Agent
                            </button>
                        </div>
                    </div>
                </section>

                <section className="claim-types">
                    <h2>Types of Claims Available</h2>
                    <div className="claim-types-container">
                        <div className="claim-typeok">
                            <img src="health_claim.png" alt="Health Claim" className="claim-imageok" />
                            <h4>Health Claim</h4>
                        </div>
                        <div className="claim-typeok">
                            <img src="life_claim.png" alt="Life Claim" className="claim-imageok" />
                            <h4>Life Claim</h4>
                        </div>
                        <div className="claim-typeok">
                            <img src="bike_claim.png" alt="Bike Claim" className="claim-imageok" />
                            <h4>Bike Claim</h4>
                        </div>
                        <div className="claim-typeok">
                            <img src="car_claim.png" alt="Car Claim" className="claim-imageok" />
                            <h4>Car Claim</h4>
                        </div>
                        <div className="claim-typeok">
                            <img src="home_claim.png" alt="Home Claim" className="claim-imageok" />
                            <h4>Home Claim</h4>
                        </div>
                    </div>
                </section>

                <section className="home-guidelines">
                    <h2>How to Use</h2>
                    <div className="guidelines-container">
                        <p>Follow these simple steps to manage your claims:</p>
                        <ol className="guidelines-list">
                            <li><span className="step-number">1.</span> Log in to your account.</li>
                            <li><span className="step-number">2.</span> Navigate to "New Claim" to file a claim.</li>
                            <li><span className="step-number">3.</span> Check "My Claims" to track your submissions.</li>
                            <li><span className="step-number">4.</span> Contact support if you need any help.</li>
                        </ol>
                    </div>
                </section>
                <section className="message-section" ref={messageSectionRef}>
                    <h2>Send a Message to the Agent</h2>
                    <textarea
                        value={messageContent}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here..."
                        className="message-textarea"
                        rows="4"
                    ></textarea>
                    <button onClick={handleSendMessage} className="send-button">Send Message</button>
                    {successMessage && <p className="success-message" style={{ color: 'green' }}>{successMessage}</p>}
                </section>

                <section className="user-feedback">
                    <h2>What Our Users Say</h2>
                    <div className="feedback-cards">
                        <div className="feedback-card">
                            <img src="john.webp" alt="User 1" className="user-image" />
                            <p className="user-quote">"This portal has made my claims process so much easier!"</p>
                            <h4 className="user-name">-John</h4>
                        </div>
                        <div className="feedback-card">
                            <img src="sara.webp" alt="User 2" className="user-image" />
                            <p className="user-quote">"I was able to track my claims in real-time. Highly recommend!"</p>
                            <h4 className="user-name">-Sara</h4>
                        </div>
                        <div className="feedback-card">
                            <img src="liya.webp" alt="User 3" className="user-image" />
                            <p className="user-quote">"Customer support was really helpful in answering my questions."</p>
                            <h4 className="user-name">-Liya</h4>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        )}
      </>
    );
};

export default Home;
