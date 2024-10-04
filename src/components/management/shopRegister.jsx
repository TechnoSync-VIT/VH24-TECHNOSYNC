import React, { useState } from 'react';
import { Client, Account, Databases } from 'appwrite';
import { Link } from 'react-router-dom';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject('66ff95bf000233c21275');

const Institute_login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [shopName, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [gstin, setGstin] = useState('');
  const [address, setAddress] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [password, setPassword] = useState('');

  const account = new Account(client);
  const databases = new Databases(client);

  const handleSignUp = async () => {
    try {
      
      const user = await account.create('unique()', email, password);
      
    
      await databases.createDocument(
        '66ffd48c001fcd335086', 
        '66ffede70020edab97d4', 
        user.$id, 
        {
          firstName,
          lastName,
          shopName,
          email,
          mobile,
          gstin,
          address,
          streetName,
          city,
          pincode,
          state,
        }
      );

      alert('Sign up successful!');
    } catch (error) {
      console.error('Error during sign up:', error);
      alert('Sign up failed: ' + error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="mx-auto max-w-[432px] bg-white rounded-md shadow-lg drop-shadow-md">
          <div className="px-4 py-3">
            <h2 className="text-center text-lg font-bold">Institute Sign Up</h2>
          </div>
          <hr className="bg-gray-600" />
          <div className="px-4 pt-3 pb-6 space-y-3">
            <div className="space-x-3 flex">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Shop Name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="GSTIN NO"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Street Name"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
                className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
              />
            </div>
            <div className="space-x-3 flex">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
              />
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
              />
            </div>
            <div>
              <p className="text-gray-600" style={{ fontSize: '11px' }}>
                People who use our service may have uploaded your contact information to Facebook.
                <a href="#" className="hover:text-blue-900 font-medium hover:underline">Learn more</a>.
              </p>
              <p className="text-gray-600 mt-4" style={{ fontSize: '11px' }}>
                By clicking Sign Up, you agree to our
                <a href="#" className="hover:text-blue-900 font-medium hover:underline">Terms</a>,
                <a href="#" className="hover:text-blue-900 font-medium hover:underline">Privacy Policy</a>
                and
                <a href="#" className="hover:text-blue-900 font-medium hover:underline">Cookies Policy</a>.
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
                >
                  Go Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Institute_login
