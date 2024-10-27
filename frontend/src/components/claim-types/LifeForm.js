import React, { useState } from 'react';
import axios from 'axios';
import './LifeForm.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../general/Loader';
import Footer from '../general/Footer';

function LifeForm() {
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
    beneficiaryName: '',
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
    setLoading(true);
    setResponseMessage('');

    try {
      const claimAmount = parseFloat(formData.claimAmount);
      if (isNaN(claimAmount) || claimAmount < 1000 || claimAmount > 2000000) {
        setResponseMessage('Claim amount must be between ₹1,000 and ₹20,00,000');
        setIsSuccess(false);
        setLoading(false);
        return;
      }

      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/user/new-claim/life-claim',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true
        }
      );

      setResponseMessage('Life claim submitted successfully!');
      setIsSuccess(true);

      setTimeout(() => {
        setLoading(false);
        navigate('/my-claims');
      }, 1000);

    } catch (error) {
      setLoading(false);
      setResponseMessage(error.response ? error.response.data : 'An error occurred while submitting the claim.');
      setIsSuccess(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="life-form">
          <h2>Life Insurance Claim</h2>
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
            Beneficiary Name:
            <input type="text" name="beneficiaryName" value={formData.beneficiaryName} onChange={handleChange} required />
          </label>
          <label>
            Claim Reason:
            <textarea name="claimReason" value={formData.claimReason} onChange={handleChange} required />
          </label>
          <label>
            Claim Amount (Max 20 Lakhs):
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
          <div className="button-container">
            <button type="submit">Submit Life Claim</button>
          </div>
        </form>
      )}
      <Footer />
    </>
  );
}

export default LifeForm;
