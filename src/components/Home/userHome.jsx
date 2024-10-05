// UserHome.js
import React, { useEffect, useState } from 'react';
import { Client, Account, Databases } from 'appwrite';
import { useNavigate } from 'react-router-dom';
import Post from '../comp/Post';

const UserHome = () => {
  const navigate = useNavigate();
  const client = new Client();
  const account = new Account(client);
  const databases = new Databases(client);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  client.setEndpoint('https://cloud.appwrite.io/v1').setProject('66ff95bf000233c21275');

  const fetchUser = async () => {
    try {
      setLoading(true);
      const userData = await account.get();
      setUser(userData);
      const userResponse = await databases.getDocument('66ffd48c001fcd335086', '66ffe375001d8664c2b2', userData.$id);
      setUserInfo(userResponse);
      const postsResponse = await databases.listDocuments('66ffd48c001fcd335086', '67008e7f002ad2682cad'); 
      setPosts(postsResponse.documents);
      setFilteredPosts(postsResponse.documents); // Initialize filtered posts
    } catch (err) {
      console.error('Error fetching user data:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    
    // Filter posts based on the search term (case-sensitive)
    const filtered = posts.filter(post =>
      post.institute_name.includes(value) // Keep it case-sensitive
    );
    setFilteredPosts(filtered);
  };

 


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row bg-gray-900 text-white min-h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-1/5 bg-gray-800 p-4 h-auto lg:h-screen flex flex-col justify-between lg:relative">
        <div>
          <div className="flex items-center text-2xl font-bold mb-6">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlFkFcQt06g5MUMBifZgJDceF5EgnFGhzUFg&s" 
              alt="Logo" 
              width={30} 
              height={30} 
              className="mr-2"
            />
            Donation
          </div>
          <nav className="mb-6">
            <ul>
              <li className="mb-4"><i className="fas fa-user mr-2"></i> Hello, {userInfo ? userInfo.firstName : 'Loading...'}</li>
              <li className="mb-4"><i className="fas fa-envelope mr-2"></i>Email: {userInfo ? userInfo.email : 'Loading...'}</li>
            </ul>
          </nav>
        </div>

        <div className="space-y-4">
        
          <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-all">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-4/5 ml-0 lg:ml-1/5 p-4 lg:p-8">
        <div className="flex items-center mb-6">
          <input 
            type="text" 
            value={searchTerm}
            onChange={handleSearch} // Update search input
            placeholder="Search by institute name..." 
            className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Display Posts in Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <Post 
                key={post.$id}
                institute_name={post.institute}
                image_url={post.imageUrl
                }
                title={post.title}
                description={post.description}
                item={post.item}
                quantity={post.quantity}
                price={post.price}
              />
            ))
          ) : (
            <div>No posts available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
