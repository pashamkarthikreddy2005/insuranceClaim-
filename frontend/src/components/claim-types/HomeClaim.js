import React, { useState } from 'react';
import './HomeClaim.css';
import axios from 'axios';
import Loader from '../general/Loader';
import { useNavigate } from 'react-router-dom';
import Footer from '../general/Footer';

function HomeForm() {
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
    propertyType: '',
    claimAmount: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "claimAmount" && value > 500000) {
      setResponseMessage("Claim amount cannot exceed ₹5 lakhs");
      setIsSuccess(false);
      return;
    }

    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');

    try {
      const formPayload = new FormData();
      Object.keys(formData).forEach(key => {
        formPayload.append(key, formData[key]);
      });

      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/user/new-claim/home-claim',
        formPayload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setResponseMessage('Home claim submitted successfully!');
      setIsSuccess(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/my-claims');
      }, 1000);
      
    } catch (error) {
      setLoading(false);
      setResponseMessage(error.message);
      setIsSuccess(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="home-form">
          <h2>Home Insurance Claim</h2>
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
            Property Type (Apartment/House):
            <input type="text" name="propertyType" value={formData.propertyType} onChange={handleChange} required />
          </label>
          <label>
            Claim Reason:
            <textarea name="claimReason" value={formData.claimReason} onChange={handleChange} required />
          </label>
          <label>
            Claim Amount (Max ₹5 Lakhs):
            <input 
              type="number" 
              name="claimAmount" 
              value={formData.claimAmount} 
              onChange={handleChange} 
              required 
              max="500000"
            />
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
          <button type="submit">Submit Home Claim</button>
        </form>
      )}
      <Footer />
    </>
  );
}

export default HomeForm;
