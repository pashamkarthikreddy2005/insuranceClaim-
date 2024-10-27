import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyClaims.css';
import Footer from './Footer';
import Loader from './Loader';

function MyClaims() {
    const [claims, setClaims] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await axios.get('http://localhost:8080/user/my-claims', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'withCredentials': true
                    }
                });

                setTimeout(() => {
                    setClaims(response.data);
                    setLoading(false);
                }, 1000);

            } catch (error) {
                setLoading(false);
            }
        };

        fetchClaims();
    }, [token]);

    const handleDownload = (claimId) => {
        window.location.href = `http://localhost:8080/claim/download-approved/${claimId}`;
    };

    const handleClick = (claimId, claimType) => {
        navigate(`/my-claims/${claimId}/${claimType}`);
    };

    const getButtonClass = (status) => {
        switch (status) {
            case 'Rejected':
                return 'view-claim-button rejected';
            case 'Approved':
                return 'view-claim-button approved';
            default:
                return 'view-claim-button';
        }
    };

    const getCircleColor = (status) => {
        switch (status) {
            case 'Rejected':
                return '#f44336';
            case 'Approved':
                return '#4caf50';
            default:
                return '#00bcd4';
        }
    };

    return (
      <>
        {loading ? (
            <Loader />
        ) : (
            <div id="my-claims">
                <h2 id="claims-header">My Claims</h2>
                {error && <p id="error-message">{error}</p>}
                {!token ? (
                    <p id="auth-message">Please <span onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: 'blue' }}>login</span> or <span onClick={() => navigate('/register')} style={{ cursor: 'pointer', color: 'blue' }}>register</span> to view your claims.</p>
                ) : claims.length === 0 ? (
                    <p id="no-claims">No claims found.</p>
                ) : (
                    <ul id="claims-list">
                        {claims.map(claim => (
                            <li key={claim.id} id={`claim-${claim.id}`}>
                                <div className="claim-details">
                                    Claim ID: {claim.id}, Type: {claim.claimType}, Status: {claim.claimStatus}
                                    <div
                                        className="status-circle"
                                        style={{ backgroundColor: getCircleColor(claim.claimStatus) }}
                                    ></div>
                                </div>
                                {claim.claimStatus === 'Approved' && (
                                    <button
                                        className="download-button"
                                        onClick={() => handleDownload(claim.id)}
                                    >
                                        Download PDF
                                    </button>
                                )}
                                <button
                                    className={getButtonClass(claim.claimStatus)}
                                    onClick={() => handleClick(claim.id, claim.claimType)}
                                >
                                    View Details
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        )}
        <Footer />
      </>
    );
}

export default MyClaims;
