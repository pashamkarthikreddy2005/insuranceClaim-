import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Update.css';
import Loader from '../general/Loader';
import UserService from '../Service/UserService';

function Update() {
    const { claimId, claimType } = useParams();
    const [claimDetails, setClaimDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [reason, setReason] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClaimDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/admin/${claimId}?claimType=${claimType}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setClaimDetails(response.data);
            } catch (error) {
                console.error('Error fetching claim details:', error);
                setError('An error occurred while fetching claim details.');
            } finally {
                setLoading(false);
            }
        };

        fetchClaimDetails();
    }, [claimId, claimType]);

    const updateClaimStatus = async (newStatus) => {
        setUpdating(true);
        setResponseMessage('');
        setIsSuccess(false);
        const token = localStorage.getItem('token');
        const username = claimDetails.username;
        const agentName=UserService.getUsername();
        try {
            await axios.put(`http://localhost:8080/admin/claim/${claimId}/status`, { 
                status: newStatus,
                reason: reason
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const notificationMessage =`Your claim has been ${newStatus.toLowerCase()}.\n Reason: ${reason}`;

            await axios.post('http://localhost:8080/notifications/add-notification', {
                username: username,
                message: notificationMessage
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setResponseMessage(`Claim status updated to ${newStatus}`);
            setIsSuccess(true);
        } catch (error) {
            console.error('Error updating claim status:', error);
            setResponseMessage('Error updating claim status.');
            setIsSuccess(false);
        } finally {
            setUpdating(false);
            setTimeout(() => {
                navigate('/all-claims');
            }, 1000);
        }
    };

    return (
        <>
            {loading && <Loader />}
            {updating && <Loader />}
            <div id="update-claim">
                <h2>Update Claim Status</h2>
                {error && <p className="error-message">{error}</p>}
                {claimDetails ? (
                    <div className="claim-info">
                        <p><strong>Username:</strong> {claimDetails.username}</p>
                        <p><strong>{claimType} claim ID:</strong> {claimDetails.id}</p>
                        <p><strong>Full Name:</strong> {claimDetails.fullName}</p>
                        <p><strong>Email:</strong> {claimDetails.email}</p>
                        <p><strong>Phone:</strong> {claimDetails.phone}</p>
                        <p><strong>Address:</strong> {claimDetails.address}</p>
                        <p><strong>Date of Birth:</strong> {claimDetails.dateOfBirth}</p>
                        <p><strong>Policy Number:</strong> {claimDetails.policyNumber}</p>
                        <p><strong>Claim Amount:</strong> {claimDetails.claimAmount}</p>
                        {claimType === "Car" && <p><strong>Car Model:</strong> {claimDetails.vehicleModel}</p>}
                        {claimType === "Bike" && <p><strong>Bike Model:</strong> {claimDetails.bikeModel}</p>}
                        {claimType === "Life" && <p><strong>Beneficiary Name:</strong> {claimDetails.beneficiaryName}</p>}
                        <p><strong>Claim Reason:</strong> {claimDetails.claimReason}</p>
                        <p><strong>File Path:</strong> {claimDetails.filePath}</p>

                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Enter reason for approval or rejection"
                            rows="4"
                            className="reason-textarea"
                            width="200px"
                        />
                        <div className="action-buttons">
                            <button onClick={() => updateClaimStatus('Approved')} className="approve-btn" disabled={updating}>Approve</button>
                            <button onClick={() => updateClaimStatus('Rejected')} className="reject-btn" disabled={updating}>Reject</button>
                            <button onClick={() => updateClaimStatus('Pending')} className="pending-btn" disabled={updating}>Mark as Pending</button>
                        </div>
                    </div>
                ) : (
                    <p>No claim details found.</p>
                )}
                {responseMessage && (
                    <p style={{ color: isSuccess ? 'green' : 'red' }}>
                        {responseMessage}
                    </p>
                )}
                {updating && <Loader />}
            </div>
        </>
    );
}

export default Update;
