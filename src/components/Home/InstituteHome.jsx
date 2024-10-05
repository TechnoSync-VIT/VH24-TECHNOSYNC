import React, { useEffect, useState } from 'react';
import { Client, Account, Databases, Storage } from 'appwrite';
import { useNavigate } from 'react-router-dom';
import { filledInputClasses } from '@mui/material';

const Post = () => {
  const navigate = useNavigate();
  const client = new Client();
  const account = new Account(client);
  const databases = new Databases(client);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState('');
  const [quantity, setQuantity] = useState('');
  const [institute, setInstitute] = useState(''); // ID of the selected institute
  const [imageUrl, setImageUrl] = useState('');

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  client
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('66ff95bf000233c21275'); 

  const fetchPosts = async () => {
    try {
      const response = await databases.listDocuments('66ffd48c001fcd335086', '67008e7f002ad2682cad'); 
      setPosts(response.documents);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

  
  const fetchUser = async () => {
    try {
      const response = await account.get();
      setUser(response);
    } catch (error) {
      console.error('Error fetching user:', error.message);
    }
  };

  useEffect(() => {
    fetchUser(); 
    fetchPosts(); 
    setLoading(false);
  }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const newPost = {
      institute,
      title,
      description,
      items,
      quantity,
      imageUrl,
    };

    try {
      
      await databases.createDocument('66ffd48c001fcd335086', '6700f43b001c2b0371a3',user.$id, newPost);
      console.log('Post created:', newPost);
      fetchPosts(); 
    } catch (error) {
      console.error('Error creating post:', error.message);
    } finally {
      setTitle('');
      setDescription('');
      setItems('');
      setQuantity('');
      setImageUrl('');
      closeModal()
      
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession('current'); 
      navigate('/');
      console.log('User logged out');
      setUser(null); 
    } catch (error) {
      console.error('Error logging out:', error.message);
    } finally {
      navigate('/')
    }
  };

  if (loading) {
    return <div>Loading posts...</div>;
  }

  
  
  return (
    <div className="flex flex-col lg:flex-row bg-gray-900 text-white min-h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-1/5 bg-gray-800 p-4 h-auto lg:h-screen flex flex-col justify-between lg:relative">
        <div>
          <div className="text-2xl font-bold mb-6">Donation</div>
          {user && (
            <nav className="mb-6">
              <ul>
                <li className="mb-4"><i className="fas fa-user mr-2"></i>Name: {user.instituteName}</li>
                <li className="mb-4"><i className="fas fa-envelope mr-2"></i>Email: {user.email}</li>
              </ul>
            </nav>
          )}
        </div>

        <div className="space-y-4">
          <button 
            className="w-full bg-green-600 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-all"
            onClick={openModal}
          >
            Create Post
          </button>
          <button 
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-all"
            onClick={handleLogout} // Logout on click
          >
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

        {/* Display Posts */}
        <div>
          {posts.length > 0 ? posts.map(post => (
            <div key={post.$id} className="bg-gray-800 p-6 rounded mb-6 shadow-lg">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-400">{post.description}</p>
              <p className="text-gray-400">Items: {post.items}</p>
              <p className="text-gray-400">Quantity: {post.quantity}</p>
              {post.image_url && <img src={post.image_url} alt="Post" className="mt-4" />}
            </div>
          )) : <div>No posts available.</div>}
        </div>
      </div>

      {/* Post Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-green-400 mb-6">Create Donation Request</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
            <div className='form-group'>
                <label htmlFor="title" className="block text-sm font-medium text-gray-200">Institute Name</label>
                <input
                  type="text"
                  id="institute_Name"
                  value={institute}
                  onChange={(e) => setInstitute(e.target.value)}
                  placeholder="Enter title"
                  className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-green-500"
                />
              </div>
            
              <div className='form-group'>
                <label htmlFor="title" className="block text-sm font-medium text-gray-200">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                  className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-green-500"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description" className="block text-sm font-medium text-gray-200">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  rows="4"
                  className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-green-500"
                />
              </div>
              <div className='form-group'>
                <label htmlFor="items" className="block text-sm font-medium text-gray-200">Items</label>
                <input
                  type="text"
                  id="items"
                  value={items}
                  onChange={(e) => setItems(e.target.value)}
                  placeholder="Enter items"
                  className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-green-500"
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-200">Quantity</label>
                <input
                  type="text"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-green-500"
                />
              </div>
              <div className="form-group">
                <label htmlFor="image" className="block text-sm font-medium text-gray-200">Image</label>
                <input
                  type="text"
                  id="image"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-green-500"
                />
              </div>
              <div className="flex justify-between">
                <button 
                  type="submit" 
                  className="bg-green-500 hover:bg-green-400 text-white px-6 py-2 rounded transition-all"
                  onClick={handleSubmit}
                >
                  Post
                </button>
                <button 
                  type="button" 
                  className="bg-red-500 hover:bg-red-400 text-white px-6 py-2 rounded transition-all"
                  onClick={closeModal} // Close modal on cancel
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
