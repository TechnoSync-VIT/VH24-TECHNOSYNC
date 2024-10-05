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
  const [res1, setRes]  = useState('');

  client
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('66ff95bf000233c21275');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
        
        // Fetch additional user info from the database
        const response = await databases.getDocument('66ffd48c001fcd335086', '66ffede70020edab97d4', userData.$id);
        const res = await databases.getDocument('66ffd48c001fcd335086', '6700f43b001c2b0371a3', userData.$id);
        setRes(res);
        setUserInfo(response);
        console.log(res1);
        
        
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [account, databases]);

const [price, setPrice] = useState('')

  const handleEdit = async (e) => {

    const institute = res1.institute;
    const title = res1.title;
    const description = res1.description;
    const items = res1.items;
    const quantity = res1.quantity;
    const imageUrl = res1.imageUrl;

    

    try {
      e.preventDefault(); 

    const newPost = {
      institute,
      title,
      description,
      items,
      quantity,
      imageUrl,
      price
    };
      await databases.createDocument('66ffd48c001fcd335086', '67008e7f002ad2682cad',user.$id, newPost);
    } catch (error) {
      console.log(error);
      
    }
  }

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
              <p>Name: {res1.institute}</p>
              <p>Name: {res1.title}</p>
              <p>Name: {res1.description}</p>
              <p>Address: {res1.items}</p>
              <p>Address: {res1.quantity}</p>
              {/* Add more fields as needed */}
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
           <div className='form-group'>
                <label htmlFor="title" className="block text-sm font-medium text-gray-200">Price</label>
                <input
                  type="text"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter Price"
                  className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-green-500"
                />
              </div>
          <button 
            onClick={handleLogout} 
            className="mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
          <button 
            onClick={handleEdit} 
            className="mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-700 transition duration-300"
          >
            Change
          </button>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}

      <div className="dark">
            <main className="flex-1 p-4 md:p-8 bg-gray-900 text-white">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-2xl font-semibold mb-4 md:mb-0">Orders</h1>
                    <div className="flex items-center">
                        <button className="bg-green-600 text-white px-4 py-2 rounded">Create order</button>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center mb-8">
                    <div className="bg-gray-800 border border-gray-700 text-gray-400 px-4 py-2 rounded mb-4 md:mb-0 md:mr-4 flex items-center">
                        <i className="fas fa-calendar-alt mr-2"></i> Jan 1 - Jan 30, 2024
                    </div>
                    <div className="flex-1"></div>
                    <div className="bg-gray-800 border border-gray-700 text-gray-400 px-4 py-2 rounded flex items-center">
                        <i className="fas fa-search mr-2"></i> Search or type command...
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-800 p-4 rounded shadow">
                        <h2 className="text-lg font-semibold">Total Orders</h2>
                        <div className="text-2xl font-bold">21 -</div>
                        <div className="text-sm text-gray-400">25.2% last week</div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded shadow">
                        <h2 className="text-lg font-semibold">Order items over time</h2>
                        <div className="text-2xl font-bold">15 -</div>
                        <div className="text-sm text-gray-400">18.2% last week</div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded shadow">
                        <h2 className="text-lg font-semibold">Returns Orders</h2>
                        <div className="text-2xl font-bold">0 -</div>
                        <div className="text-sm text-gray-400">-1.2% last week</div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded shadow">
                        <h2 className="text-lg font-semibold">Fulfilled orders over time</h2>
                        <div className="text-2xl font-bold">12 -</div>
                        <div className="text-sm text-gray-400">12.2% last week</div>
                    </div>
                </div>
                <div className="bg-gray-800 p-4 rounded shadow mb-8">
                    <div className="flex items-center mb-4">
                        <button className="bg-gray-700 text-gray-400 px-4 py-2 rounded mr-4">All</button>
                        <button className="bg-gray-700 text-gray-400 px-4 py-2 rounded mr-4">Unfulfilled</button>
                        <button className="bg-gray-700 text-gray-400 px-4 py-2 rounded mr-4">Unpaid</button>
                        <button className="bg-gray-700 text-gray-400 px-4 py-2 rounded mr-4">Open</button>
                        <button className="bg-gray-700 text-gray-400 px-4 py-2 rounded">Closed</button>
                    </div>
                    <table className="w-full text-left text-gray-400">
                        <thead>
                            <tr>
                                <th className="py-2"><input type="checkbox" /></th>
                                <th className="py-2">Order</th>
                                <th className="py-2">Date</th>
                                <th className="py-2">Customer</th>
                                <th className="py-2">Payment</th>
                                <th className="py-2">Total</th>
                                <th className="py-2">Delivery</th>
                                <th className="py-2">Items</th>
                                <th className="py-2">Fulfillment</th>
                                <th className="py-2">Action</th>
                            </tr>
                        </thead>
                       
                    </table>
                </div>
            </main>
        </div>

    </div>
  );
};

export default UserHome;
