import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Desc.css';
import Footer from './Footer';
import Loader from './Loader';

function ClaimDesc() {
    const { claimId, claimType } = useParams();
    const [claimDetails, setClaimDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClaimDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/user/my-claims/${claimId}`, {
                    params: { claimType },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'withCredentials': true 
                    }
                });
                setClaimDetails(response.data);
            } catch (error) {
                console.error('Error fetching claim details:', error);
                setError('An error occurred while fetching claim details.');
            }
        };

        fetchClaimDetails();
    }, [claimId, claimType]);

    return (
        <>
        <div className="claim-desc">
            <h2>Claim Details</h2>
            {error && <p className="error-message">{error}</p>}
            {claimDetails ? (
                <div className="claim-info">
                    <p><strong>Claim ID:</strong> {claimDetails.id}</p>
                    <p><strong>Full Name:</strong> {claimDetails.fullName}</p>
                    <p><strong>Email:</strong> {claimDetails.email}</p>
                    <p><strong>Address:</strong> {claimDetails.address}</p>
                    <p><strong>Date of Birth:</strong> {claimDetails.dateOfBirth}</p>
                    <p><strong>Policy Number:</strong> {claimDetails.policyNumber}</p>
                    <p><strong>Claim Amount:</strong> {claimDetails.claimAmount}</p>
                    {claimType === "Car" && <p><strong>Car Model:</strong> {claimDetails.vehicleModel}</p>}
                    {claimType === "Bike" && <p><strong>Bike Model:</strong> {claimDetails.bikeModel}</p>}
                    {claimType === "Life" && <p><strong>Beneficiary Name:</strong> {claimDetails.beneficiaryName}</p>}
                    <p><strong>Claim Reason:</strong> {claimDetails.claimReason}</p>
                    <p><strong>File Path:</strong> {claimDetails.filePath}</p>
                </div>
            ) : (
                <Loader/>
            )}
        </div>
        <Footer/>
        </>
    );
}

export default ClaimDesc;
