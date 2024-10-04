import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {

  return (
    <div>
      <header
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('https://media.istockphoto.com/id/1316744041/photo/indian-poor-child-playing-at-home.jpg?s=612x612&w=0&k=20&c=g-pjbRh_GHq2ITWi-vVbSoszEusk_7K8g5MFZaDFBoc=')`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '100vh' }}
      >
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-6 bg-transparent">
          <div className="text-white text-2xl font-bold">Neumette</div>
          
          {/* <Link to="/register">
          <button 
            className="bg-yellow-500 text-black px-6 py-3 font-bold hover:bg-yellow-600 transition duration-300"
          >
            Log In
          </button></Link> */}
        </nav>

        <div className="absolute top-0 left-0 w-full h-full flex justify-start items-center p-6 bg-black bg-opacity-50">
          <div className="max-w-lg">
            <h1 className="text-white text-6xl font-bold mb-4 -mt-16">Your Support is Powerful.</h1>
            <p className="text-white text-lg mb-6">
              We seek out world changers and difference makers around the globe, and equip them to fulfill their unique purpose.
            </p>
          <Link to="register">  <button className="bg-yellow-500 text-black px-6 py-3 font-bold hover:bg-yellow-600 transition duration-300">Donate</button></Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
