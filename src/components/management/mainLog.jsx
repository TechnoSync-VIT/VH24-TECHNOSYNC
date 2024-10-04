import React from "react";
import { Link } from "react-router-dom";

const SelectUser = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center py-10">
      <div className="flex flex-wrap gap-6 justify-center">
        
        {/* Donor Card */}
        <div className="group relative block w-full sm:w-80 max-w-xs">
          <div className="relative flex h-full flex-col items-center transform border-2 border-white bg-gray-800 text-white transition-transform group-hover:scale-105 rounded-lg p-6">
            <img
              src="https://i2.pngimg.me/thumb/f/720/m2i8Z5b1A0N4A0A0.jpg"
              alt="Donor"
              className="rounded-lg w-full h-40 object-cover"
            />
            <h2 className="mt-4 text-xl font-medium sm:text-2xl">Donor</h2>
            <p className="mt-2 text-gray-300">
              Donors help institutions and shopkeepers by providing essential resources.
            </p>
            <div className="mt-4 opacity-0 transition-opacity group-hover:opacity-100">
              <Link to='/user-login' className="p-3">
                <button className="bg-yellow-500 text-black px-6 py-3 font-bold rounded hover:bg-yellow-600 transition duration-300">
                  Log In
                </button>
              </Link>
              <Link to='/user-register'>
                <button className="bg-blue-500 text-white px-6 py-3 font-bold mt-4 rounded hover:bg-blue-600 transition duration-300">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Institute Card */}
        <div className="group relative block w-full sm:w-80 max-w-xs">
          <div className="relative flex h-full flex-col items-center transform border-2 border-white bg-gray-800 text-white transition-transform group-hover:scale-105 rounded-lg p-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5310/5310672.png"
              alt="Institute"
              className="rounded-lg w-full h-40 object-cover"
            />
            <h2 className="mt-4 text-xl font-medium sm:text-2xl">Institute</h2>
            <p className="mt-2 text-gray-300">
              Institutions seek resources from donors to serve the community.
            </p>
            <div className="mt-4 opacity-0 transition-opacity group-hover:opacity-100">
              <Link to='/institute-login' className="p-3">
                <button className="bg-yellow-500 text-black px-6 py-3 font-bold rounded hover:bg-yellow-600 transition duration-300">
                  Log In
                </button>
              </Link>
              <Link to='/institute-register'>
                <button className="bg-blue-500 text-white px-6 py-3 font-bold mt-4 rounded hover:bg-blue-600 transition duration-300">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Shopkeeper Card */}
        <div className="group relative block w-full sm:w-80 max-w-xs">
          <div className="relative flex h-full flex-col items-center transform border-2 border-white bg-gray-800 text-white transition-transform group-hover:scale-105 rounded-lg p-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKleDrqf-MS3lGCFLb12MZu3ok2s8yvE6qSg&s"
              alt="Shopkeeper"
              className="rounded-lg w-full h-40 object-cover"
            />
            <h2 className="mt-4 text-xl font-medium sm:text-2xl">Shopkeeper</h2>
            <p className="mt-2 text-gray-300">
              Shopkeepers supply essential goods to institutions and community members.
            </p>
            <div className="mt-4 opacity-0 transition-opacity group-hover:opacity-100">
              <Link to='/shopkeeper-login' className="p-3">
                <button className="bg-yellow-500 text-black px-6 py-3 font-bold rounded hover:bg-yellow-600 transition duration-300">
                  Log In
                </button>
              </Link>
              <Link to='/shopkeeper-register'>
                <button className="bg-blue-500 text-white px-6 py-3 font-bold mt-4 rounded hover:bg-blue-600 transition duration-300">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Go Back Button */}
      <Link to="/" className="mt-8">
        <button
          className="text-gray-300 font-bold px-8 py-2 rounded-md border border-gray-600 hover:bg-gray-700 transition duration-300"
        >
          Go Back
        </button>
      </Link>
    </div>
  );
};

export default SelectUser;