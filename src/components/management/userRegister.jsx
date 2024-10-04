import React, { useState } from 'react';
import { Client, Account, Databases } from 'appwrite';
import { Link } from 'react-router-dom'; 

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

  const account = new Account(client);
  const databases = new Databases(client);

  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!email || !emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    try {
      const user = await account.create('unique()', email, password);
      await databases.createDocument(
        '66ffd48c001fcd335086', 
        '66ffe375001d8664c2b2', 
        user.$id, 
        {
          firstName,
          surname,
          mobile,
          gender,
        }
      );

      alert('Sign up successful!');
    } catch (error) {
      console.error('Error during sign up:', error);
      alert('Sign up failed: ' + error.message);
    }
  };

  const handleBack = () => {
    history.goBack(); 
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="mx-auto max-w-sm bg-white rounded-md shadow-lg p-6">
        <div className="space-y-4">
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
            />
          </div>
          <input
            type="text"
            placeholder="Mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
          />
          <div>
            <div className="text-gray-500 text-sm">
              Gender <a href=""> (?) </a>
            </div>
            <div className="mt-1 flex space-x-3">
              {['Female', 'Male', 'Other'].map((genderOption) => (
                <label key={genderOption} className="flex-1 flex space-x-2 justify-between items-center rounded-md px-2 py-1 border border-gray-400">
                  <span>{genderOption}</span>
                  <input
                    type="radio"
                    name="gender"
                    value={genderOption}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-xs">
              People who use our service may have uploaded your contact information to Facebook.
              <a href="" className="hover:text-blue-900 font-medium hover:underline">Learn more</a>.
            </p>
            <p className="text-gray-600 text-xs mt-4">
              By clicking Sign Up, you agree to our
              <a href="" className="hover:text-blue-900 font-medium hover:underline">Terms</a>,
              <a href="" className="hover:text-blue-900 font-medium hover:underline">Privacy Policy</a>
              and
              <a href="" className="hover:text-blue-900 font-medium hover:underline">Cookies Policy</a>.
              You may receive SMS notifications from us and can opt out at any time.
            </p>
          </div>
          <div className="text-center">
            <button
              className="text-white font-bold px-16 py-1 rounded-md"
              style={{ backgroundColor: '#00A400', fontSize: '18px' }}
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
          <div className="text-center mt-4">
            <Link to="/register">
            <button
              className="text-gray-600 font-bold px-16 py-1 rounded-md border border-gray-400"
              onClick={handleBack}
            >
              Go Back
            </button></Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DonorLogin;
