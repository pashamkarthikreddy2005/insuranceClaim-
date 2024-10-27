import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AllClaims.css';
import Loader from './Loader';

function AllClaims() {
    const [claims, setClaims] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterType, setFilterType] = useState('All');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
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
                setClaims(response.data);
            } catch (error) {
                setError('Failed to fetch claims');
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
        switch (status) {
            case 'Rejected':
                return '#f44336';
            case 'Approved':
                return '#4caf50';
            case 'Pending':
                return '#ff9800';
            default:
                return '#00bcd4';
        }
    };

    const sortedClaims = () => {
        let filteredClaims = [...claims];
        if (filterStatus !== 'All') {
            filteredClaims = filteredClaims.filter(claim => claim.claimStatus === filterStatus);
        }
        if (filterType !== 'All') {
            filteredClaims = filteredClaims.filter(claim => claim.claimType === filterType);
        }
        if (searchQuery) {
            filteredClaims = filteredClaims.filter(claim =>
                claim.user.username.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (startDate) {
            filteredClaims = filteredClaims.filter(claim => 
                new Date(claim.submissionDate) >= new Date(startDate)
            );
        }
        if (endDate) {
            filteredClaims = filteredClaims.filter(claim => 
                new Date(claim.submissionDate) <= new Date(endDate)
            );
        }
        if (sortConfig.key) {
            filteredClaims.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return filteredClaims;
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
                <div id="all-claims">
                    <h2 id="claims-header">All Claims</h2>
                    {error && <p id="error-message">{error}</p>}

                    <div id="filter-section">
                        <div id="filter-row">
                            <div className="filter-item">
                                <label htmlFor="search-query">Search by Claimant Name:</label>
                                <input
                                    id="search-query"
                                    type="text"
                                    placeholder="Enter claimant name"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="filter-item">
                                <label htmlFor="filter-status">Filter by Status:</label>
                                <select id="filter-status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                    <option value="All">All</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                            <div className="filter-item">
                                <label htmlFor="filter-type">Filter by Claim Type:</label>
                                <select id="filter-type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                    <option value="All">All</option>
                                    <option value="Health">Health</option>
                                    <option value="Life">Life</option>
                                    <option value="Bike">Bike</option>
                                    <option value="Car">Car</option>
                                    <option value="Home">Home</option>
                                </select>
                            </div>
                            <div className="filter-item date">
                                <label htmlFor="start-date">Start Date:</label>
                                <input type="date" id="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                            <div className="filter-item date">
                                <label htmlFor="end-date">End Date:</label>
                                <input type="date" id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {claims.length === 0 ? (
                        <p id="no-claims">No claims found.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th className="ok" onClick={() => requestSort('id')}>Claim ID<img className="sort-icon" src="sort.png" alt="Sort" /></th>
                                    <th className="ok" onClick={() => requestSort('user.username')}>Claimant Name<img className="sort-icon" src="sort.png" alt="Sort" /></th>
                                    <th className="ok" onClick={() => requestSort('claimType')}>Claim Type<img className="sort-icon" src="sort.png" alt="Sort" /></th>
                                    <th className="ok" onClick={() => requestSort('claimStatus')}>Status<img className="sort-icon" src="sort.png" alt="Sort" /></th>
                                    <th className="ok" onClick={() => requestSort('submissionDate')}>Submission Date<img className="sort-icon" src="sort.png" alt="Sort" /></th>
                                    <th id="notok">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedClaims().map(claim => (
                                    <tr key={claim.id}>
                                        <td>{claim.id}</td>
                                        <td>{claim.user.username}</td>
                                        <td>{claim.claimType}</td>
                                        <td>
                                            <div className="status-circle" style={{ backgroundColor: getCircleColor(claim.claimStatus) }}></div>
                                            {claim.claimStatus}
                                        </td>
                                        <td>{new Date(claim.submissionDate).toLocaleString()}</td>
                                        <td>
                                            <button className="view-update-button" onClick={() => handleViewUpdateClick(claim.id, claim.claimType)}>
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

export default AllClaims;
