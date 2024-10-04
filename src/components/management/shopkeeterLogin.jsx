import React, { useState, useEffect } from 'react';
import { Client, Account } from 'appwrite';
import { useNavigate,Link } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();
  const client = new Client();
  const account = new Account(client);

  client
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('66ff95bf000233c21275');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get(); // Check if the user is logged in
        navigate('/shopkeeper-home'); // Redirect to home page if already logged in
      } catch (err) {
        // No active session, do nothing
      }
    };

    checkSession();
  }, [account, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await account.createEmailPasswordSession(email, password);
      navigate('/shopkeeper-home'); // Redirect to home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-5xl">
        {/* Left side (Image as cover) */}
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src="https://cdn.pixabay.com/photo/2017/01/20/12/47/children-of-uganda-1994833_640.jpg"
            alt="Knowledge From Home"
            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>

        {/* Right side (Login form) */}
        <div className="md:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-100 mb-8 text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2 text-lg lg:text-xl" htmlFor="email">EMAIL</label>
              <input
                className="w-full p-4 border border-gray-600 rounded bg-gray-700 text-white text-lg"
                type="email"
                id="email"
                placeholder="Type your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-8">
              <label className="block text-gray-300 mb-2 text-lg lg:text-xl" htmlFor="password">PASSWORD</label>
              <input
                className="w-full p-4 border border-gray-600 rounded bg-gray-700 text-white text-lg"
                type="password"
                id="password"
                placeholder="Type your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button 
              type="submit" 
              className="w-full bg-green-600 text-white py-3 text-lg rounded hover:bg-green-700 transition duration-300">
              Login
            </button>
            <p className="text-center text-gray-400 mt-6 text-lg hover:text-gray-300 transition duration-300 cursor-pointer">
              Forgot your password?
            </p>
          </form>
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
    </div>
  );
};

export default UserLogin;
