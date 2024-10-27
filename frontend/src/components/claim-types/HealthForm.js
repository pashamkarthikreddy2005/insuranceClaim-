import React, { useState } from 'react';
import axios from 'axios';
import './HealthForm.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../general/Loader';
import Footer from '../general/Footer';

function HealthForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    policyNumber: '',
    claimReason: '',
    claimAmount: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setResponseMessage('You must be logged in to submit a claim');
      setIsSuccess(false);
      return;
    }

    if (parseFloat(formData.claimAmount) > 500000) {
      setResponseMessage('Claim amount cannot exceed 5 lakhs.');
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setResponseMessage('');

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      const response = await axios.post('http://localhost:8080/user/new-claim/health-claim', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });

      setResponseMessage('Health claim submitted successfully!');
      setIsSuccess(true);
      setTimeout(() => {
        setLoading(false);
        setTimeout(() => {
          navigate('/my-claims');
        }, 1000);
      }, 1000);

    } catch (error) {
      setLoading(false);
      setResponseMessage(error.response ? error.response.data : error.message);
      setIsSuccess(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="health-form">
          <h2>Health Insurance Claim</h2>
          <label>
            Full Name:
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Phone Number:
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </label>
          <label>
            Address:
            <textarea name="address" value={formData.address} onChange={handleChange} required />
          </label>
          <label>
            Date of Birth:
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
          </label>
          <label>
            Policy Number:
            <input type="text" name="policyNumber" value={formData.policyNumber} onChange={handleChange} required />
          </label>
          <label>
            Claim Reason:
            <textarea name="claimReason" value={formData.claimReason} onChange={handleChange} required />
          </label>
          <label>
            Claim Amount (Max 5 lakhs):
            <input type="number" name="claimAmount" value={formData.claimAmount} onChange={handleChange} required />
          </label>
          <label>
            Upload Supporting Document (PDF only):
            <input type="file" name="file" accept=".pdf" onChange={handleChange} required />
          </label>
          {responseMessage && (
            <p style={{ fontWeight: '800', fontSize: '20px', color: isSuccess ? 'green' : 'red', marginTop: '10px', marginLeft: '120px' }}>
              {responseMessage}
            </p>
          )}
          <button type="submit">Submit Health Claim</button>
        </form>
      )}
      <Footer/>
    </>
  );
}

export default HealthForm;
