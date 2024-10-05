import React, { useState } from 'react';
import { Client, Account, Databases } from 'appwrite';
import { Link, useNavigate } from 'react-router-dom';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject('66ff95bf000233c21275');

const DonorLogin = () => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  // const [otp, setOtp] = useState('');
  // const [showOtpPopup, setShowOtpPopup] = useState(false);
  // const [error, setError] = useState('');

  const account = new Account(client);
  const databases = new Databases(client);
  const navigate = useNavigate();

  const handleSignUp = async () => {
   
    try {
      const user = await account.create('unique()', email, password);
      await databases.createDocument(
        '66ffd48c001fcd335086',
        '66ffe375001d8664c2b2',
        user.$id,
        { firstName, surname, mobile, gender, email }
      );

      alert('Sign up successful! A verification OTP has been sent to your email.');
      navigate('/user-login')
      // setShowOtpPopup(true); // Show OTP popup after successful sign-up
    } catch (error) {
      console.error('Error during sign up:', error);
      setError('Sign up failed: ' + error.message);
    }
  };

  const handleVerifyOtp = async () => {
    // Placeholder for OTP verification logic
    // const isVerified = await verifyOtp(otp); // Assume this function verifies the OTP
    // if (isVerified) {
    //   alert('OTP verified successfully!');
    //   navigate('/home'); // Redirect to home page
    // } else {
    //   alert('Invalid OTP, please try again.');
    // }
  };

  // const handleBack = () => {
  //   navigate('/register');
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="mx-auto max-w-lg bg-gray-800 rounded-lg shadow-lg p-8 md:p-10">
        {/* {error && <div className="text-red-500">{error}</div>} */}
        <div className="space-y-6">
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full ring-1 ring-gray-600 rounded-md text-md px-4 py-3 outline-none bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-400"
            />
            <input
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full ring-1 ring-gray-600 rounded-md text-md px-4 py-3 outline-none bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-400"
            />
          </div>
          <input
            type="text"
            placeholder="Mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full ring-1 ring-gray-600 rounded-md text-md px-4 py-3 outline-none bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-400"
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full ring-1 ring-gray-600 rounded-md text-md px-4 py-3 outline-none bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full ring-1 ring-gray-600 rounded-md text-md px-4 py-3 outline-none bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-400"
          />
          <div>
            <div className="text-gray-400 text-sm">Gender</div>
            <div className="mt-1 flex space-x-3">
              {['Female', 'Male', 'Other'].map((genderOption) => (
                <label key={genderOption} className="flex-1 flex space-x-2 justify-between items-center rounded-md px-2 py-1 border border-gray-600 bg-gray-700">
                  <span className="text-white">{genderOption}</span>
                  <input
                    type="radio"
                    name="gender"
                    value={genderOption}
                    onChange={(e) => setGender(e.target.value)}
                    className="text-gray-600"
                  />
                </label>
              ))}
            </div>
          </div>
          <div className="text-center">
            <button
              className="text-white font-bold px-8 py-2 rounded-md"
              style={{ backgroundColor: '#00A400', fontSize: '18px' }}
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
          <div className="text-center mt-4">
            <Link to="/register">
              <button
                className="text-gray-300 font-bold px-8 py-2 rounded-md border border-gray-600 hover:bg-gray-700"
               
              >
                Go Back
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* OTP Popup */}
      {/* {showOtpPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-lg font-bold mb-4">OTP Verification</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleVerifyOtp}
                className="bg-green-500 text-white rounded-md px-4 py-2"
              >
                Verify
              </button>
              <button
                onClick={() => setShowOtpPopup(false)} // Close OTP popup
                className="bg-red-500 text-white rounded-md px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default DonorLogin;
