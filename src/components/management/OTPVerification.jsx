import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Account } from 'appwrite';

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const account = new Account();

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleVerifyOtp = async () => {
    try {
      await account.updateEmail(location.state.userId, otp);
      alert('Email verified successfully!');
      navigate('/user-login'); // Redirect to user login page
    } catch (err) {
      setError(err.message);
      alert('Verification failed: ' + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="mx-auto max-w-sm bg-white rounded-md shadow-lg p-6">
        <h2 className="text-2xl mb-4">OTP Verification</h2>
        <p>Please enter the OTP sent to your email:</p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 mt-4"
        />
        <button
          onClick={handleVerifyOtp}
          className="text-white font-bold px-4 py-2 rounded-md mt-4"
          style={{ backgroundColor: '#00A400' }}
        >
          Verify OTP
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default OTPVerification;
