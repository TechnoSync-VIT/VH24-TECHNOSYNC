import React, { useEffect, useState } from 'react';
import { Client, Account, Databases } from 'appwrite';
import { useNavigate } from 'react-router-dom';

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
        const response = await databases.getDocument('66ffd48c001fcd335086', '66ffea8c000b6324f6ab', userData.$id);
        setUserInfo(response);
        
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
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
    <div className="p-10">
      <h1 className="text-3xl font-bold">User Home</h1>
      {user ? (
        <div className="mt-4">
          <h2 className="text-2xl">Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          {/* Display additional user information if available */}
          {userInfo ? (
            <div className="mt-4">
              <h3 className="text-xl">User Information:</h3>
              <p>Name: {userInfo.firstName}</p>
              <p>Name: {userInfo.surname}</p>
              <p>Name: {userInfo.mobile}</p>
              <p>Address: {userInfo.gender}</p>
              {/* Add more fields as needed */}
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
          <button 
            onClick={handleLogout} 
            className="mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default UserHome;
