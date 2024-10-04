import React, { useEffect, useState } from 'react';
import { Client, Account, Databases } from 'appwrite';
import { useNavigate } from 'react-router-dom';
import cors from 'cors'

const UserHome = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const client = new Client();
  const account = new Account(client);
  const databases = new Databases(client); // Initialize Databases
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null); // State for additional user info
  const [error, setError] = useState('');

  

  client
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('66ff95bf000233c21275');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
        
        // Fetch additional user info from the database
        const response = await databases.getDocument('66ffd48c001fcd335086', '66ffe375001d8664c2b2', userData.$id);
        setUserInfo(response);
        console.log(user);
        
        console.log(userInfo);
        
        
      } catch (err) {
        setError(err.message);
      }
    };

    //fetchUser();
  }, [account, databases]);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current'); // Log out the current session
      navigate('/'); // Redirect to login page
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row bg-gray-900 text-white min-h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-1/5 bg-gray-800 p-4 h-auto lg:h-screen flex flex-col justify-between lg:relative">
        {/* Sidebar Header */}
        <div>
  <div className="flex items-center text-2xl font-bold mb-6">
    <img 
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlFkFcQt06g5MUMBifZgJDceF5EgnFGhzUFg&s" 
      alt="err" 
      width={30} 
      height={30} 
      className="mr-2" // Add margin right for spacing
    />
    Donation
  </div>
  <nav className="mb-6">
    <ul>
      <li className="mb-4"><i className="fas fa-user mr-2"></i>  Hello, {userInfo ? userInfo.firstName : 'Loading...'}  </li>
      <li className="mb-4"><i className="fas fa-envelope mr-2"></i>Email: {userInfo ? userInfo.email : 'Loading...'}</li>
    </ul>
  </nav>
</div>

        {/* Buttons Section */}
        <div className="space-y-4">
          <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-all">
            Forgot Password
          </button>
          <button className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-all">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-4/5 ml-0 lg:ml-1/5 p-4 lg:p-8 space-y-6">
        {/* Search Bar */}
        <div className="flex items-center mb-6">
          <input 
            type="text" 
            placeholder="Search something here..." 
            className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

          
       

        {/* Example Post */}
        <div className="bg-gray-800 p-6 rounded mb-6 shadow-lg">
          <div className="flex items-center mb-4">
            <img src="https://placehold.co/40" alt="Profile of Afrin Konjufca" className="rounded-full mr-2" />
            <div>
              <div className="font-bold text-lg">Afrin Konjufca</div>
              <div className="text-sm text-gray-400">Tirana, Albania</div>
            </div>
          </div>
          <img 
            src="https://placehold.co/600x400" 
            alt="City View" 
            className="w-full rounded mb-4" 
          />
          <div className="mb-4">
            <h2 className="text-xl font-bold">Post Title</h2>
            <p className="text-gray-400">
              This is a brief description of the post. It provides additional context and engages the audience.
            </p>
          </div>
          <div className="flex justify-center mb-4 space-x-4">
            <button className="bg-green-500 hover:bg-green-400 text-white px-6 py-2 rounded transition-all">Donate</button>
            <button className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 rounded transition-all">Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
