// Post.js
import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaTimes } from 'react-icons/fa'; // Import icons

const Post = ({ institute_name, image_url, title, description, item, quantity,price }) => {

    const openRazorpay = async () => {
        const options = {
          key: "rzp_test_xhPI7gi2AWlfaE", // Replace with your Razorpay key
          amount: 100, // Amount in paise (50000 paise = 500 INR)
          currency: "INR",
          name: "Sujal",
          description: "Make a donation",
          image: "https://avatars.githubusercontent.com/u/76506184?v=4", // Replace with your logo
          handler: function (response) {
            alert(`Payment successful: ${response.razorpay_payment_id}`);
            // Handle successful payment here (e.g., send the payment ID to your backend)
          },
          prefill: {
            name: "Mithi",
        email: "mithi.vk10102004@gmail.com",
        contact: "7499040406",
          },notes: {
            address: "India",
          },
          theme: {
            color: "#F37254"
          }
        };
    
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShareClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const shareLink = `${window.location.origin}/posts/${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="bg-gray-800 p-4 rounded mb-4 shadow-lg w-full md:w-1/2 lg:w-full">
      <div className="flex items-center mb-2">
        <img src="https://placehold.co/40" alt="Profile" className="rounded-full mr-2" />
        <div>
          <div className="font-bold text-lg">{institute_name}</div>
          <div className="text-sm text-gray-400">{item} Available: {quantity}</div>
        </div>
      </div>
      <img 
        src={image_url || "https://placehold.co/600x400"} 
        alt="Post" 
        className="w-full rounded mb-4 h-[300px]" 
      />
      <div className="mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-gray-400">{description}</p>
        <p className="text-gray-400">{price}</p>
      </div>
      <div className="flex justify-center mb-4 space-x-4">
      <button onClick={openRazorpay} className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded transition-all">
            Donate
          </button>
        <button 
          onClick={handleShareClick} 
          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded transition-all"
        >
          Share
        </button>
      </div>

      {/* Share Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded shadow-lg relative">
            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-300">
              <FaTimes />
            </button>
            <h2 className="text-lg font-bold mb-4">Share this Post</h2>
            <input 
              type="text" 
              value={shareLink} 
              readOnly 
              className="w-full p-2 mb-4 bg-gray-800 border border-gray-700 rounded"
            />
            <div className="flex justify-between">
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2"
              >
                <FaFacebook /> <span className="hidden md:inline"></span>
              </a>
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-400 hover:bg-blue-300 text-white px-4 py-2 rounded flex items-center space-x-2"
              >
                <FaTwitter /> <span className="hidden md:inline"></span>
              </a>
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareLink)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2"
              >
                <FaLinkedin /> <span className="hidden md:inline"></span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
