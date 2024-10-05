import React, { useState } from 'react';
import { Client, Account, Databases } from 'appwrite';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject('66ff95bf000233c21275');

const Shop_login = () => {
  const navigate = useNavigate();
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
  const [gstinApi, setGstinApi] = useState('');

  const account = new Account(client);
  const databases = new Databases(client);

  const handleSignUp = async () => {
    try {

      const apiKey = "8a5c7f9118e2386d422e215676345b28";
      const gst = "27CEPPV9417P1Z7"



      fetch(`http://sheet.gstincheck.co.in/check-return/${apiKey}/${gstinApi}`).then((res) => res.json()).then((res) => setGstinApi(res)
      ).catch((err) => console.log(err)
      )

      console.log(gstinApi.data);

      if (!gstinApi.flag ) {
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
        navigate('/shopkeeper-login');
      } else {
        alert("Invalid GSTIN number")
      }

    } catch (error) {
      console.error('Error during sign up:', error);
      alert('Sign up failed: ' + error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="mx-auto max-w-lg bg-gray-800 rounded-lg shadow-lg p-6 md:p-10">
          <h2 className="text-center text-2xl font-bold text-white mb-6">Shop Sign Up</h2>
          <div className="space-y-4">
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full ring-1 ring-gray-600 rounded-md text-md px-4 py-3 outline-none bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-400"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full ring-1 ring-gray-600 rounded-md text-md px-4 py-3 outline-none bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-400"
              />
            </div>
            <input
              type="text"
              placeholder="Shop Name"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
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
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full ring-1 ring-gray-600 rounded-md text-md px-4 py-3 outline-none bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-400"
            />
            <input
              type="text"
              placeholder="GSTIN NO"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              className="w-full ring-1 ring-gray-600 rounded-md text-md px-4 py-3 outline-none bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-400"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full ring-1 ring-gray-600 rounded-md text-md px-4 py-3 outline-none bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-400"
            />
            <input
              type="text"
              placeholder="Street Name"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
              className="w-full ring-1 ring-gray-600 rounded-md text-md px-4 py-3 outline-none bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-400"
            />
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full ring-1 ring-gray-600 rounded-md text-md px-4 py-3 outline-none bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-400"
              />
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full ring-1 ring-gray-600 rounded-md text-md px-4 py-3 outline-none bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-400"
              />
            </div>
            <input
              type="text"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full ring-1 ring-gray-600 rounded-md text-md px-4 py-3 outline-none bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full ring-1 ring-gray-600 rounded-md text-md px-4 py-3 outline-none bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-400"
            />
            <div className="text-gray-400 text-sm">
              People who use our service may have uploaded your contact information to Facebook.
              <a href="#" className="text-blue-400 hover:underline">Learn more</a>.
            </div>
            <div className="text-gray-400 text-sm">
              By clicking Sign Up, you agree to our
              <a href="#" className="text-blue-400 hover:underline">Terms</a>,
              <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
              and
              <a href="#" className="text-blue-400 hover:underline">Cookies Policy</a>.
              You may receive SMS notifications from us and can opt out at any time.
            </div>
            <div className="text-center">
              <button
                className="bg-green-600 text-white font-bold px-8 py-2 rounded-md hover:bg-green-700 transition duration-300"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
            <div className="text-center mt-4">
              <Link to="/register">
                <button
                  className="text-gray-300 font-bold px-8 py-2 rounded-md border border-gray-600 hover:bg-gray-700 transition duration-300"
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

export default Shop_login;