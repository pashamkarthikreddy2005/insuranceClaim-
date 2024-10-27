import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AllClaims.css';
import Loader from './Loader';

function ApprovedClaims() {
    const [claims, setClaims] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/admin/all-claims', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'withCredentials': true
                    }
                });
                const approvedClaims = response.data.filter(claim => claim.claimStatus === 'Approved');
                setClaims(approvedClaims);
            } catch (error) {
                console.error('Error fetching claims:', error);
                setError('');
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };

        fetchClaims();
    }, []);

    const handleViewUpdateClick = (claimId, claimType) => {
        navigate(`/admin/claim/${claimId}/${claimType}`);
    };

    const getCircleColor = (status) => {
        return status === 'Approved' ? '#4caf50' : '#00bcd4';
    };

    const sortedClaims = () => {
        const sortedArray = [...claims];

        if (sortConfig.key) {
            sortedArray.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];
                if (sortConfig.key === 'user.username') {
                    aValue = a.user.username;
                    bValue = b.user.username;
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        return sortedArray;
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <>
        {loading ? (
                <Loader />
            ) : (
        <div id="approved-claims">
            <h2 id="claims-header">Approved Claims</h2>
            {error && <p id="error-message">{error}</p>}
            {claims.length === 0 ? (
                <p id="no-claims">No approved claims found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th className='ok' onClick={() => requestSort('id')}>
                                Claim ID
                                <img className="sort-icon" src="sort.png" alt="Sort" />
                            </th>
                            <th className='ok' onClick={() => requestSort('user.username')}>
                                Claimant Name
                                <img className="sort-icon" src="sort.png" alt="Sort" />
                            </th>
                            <th className='ok' onClick={() => requestSort('claimType')}>
                                Claim Type
                                <img className="sort-icon" src="sort.png" alt="Sort" />
                            </th>
                            <th className='notok' onClick={() => requestSort('claimStatus')}>Status
                            </th>
                            <th className='ok' onClick={() => requestSort('submissionDate')}>
                                Submission Date
                                <img className="sort-icon" src="sort.png" alt="Sort" />
                            </th>
                            <th id='notok'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedClaims().map(claim => (
                            <tr key={claim.id}>
                                <td>{claim.id}</td>
                                <td>{claim.user.username}</td>
                                <td>{claim.claimType}</td>
                                <td>
                                    <div
                                        className="status-circle"
                                        style={{ backgroundColor: getCircleColor(claim.claimStatus) }}
                                    ></div>
                                    {claim.claimStatus}
                                </td>
                                <td>
                                    {new Date(claim.submissionDate).toLocaleString()}
                                </td>
                                <td>
                                    <button
                                        className="view-update-button"
                                        onClick={() => handleViewUpdateClick(claim.id, claim.claimType)}>
                                        View/Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
            )}
        </>
    );
}

export default ApprovedClaims;
