import React from "react";
import { Link } from "react-router-dom";

const SelectUser = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="flex flex-wrap justify-center items-center">
        <Link to="/user-register" className="flex items-center">
          <div className="m-2 group px-10 py-5 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#abd373] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all w-full max-w-md">
            <div className="w-44 h-44 flex items-center justify-center bg-gray-200 rounded-full text-[#abd373] text-5xl">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkD1j15CPNhow9FcrHdPigiTFNLV2tnjkbFg&s"
                alt=""
              />
            </div>
            <p className="cardtxt font-semibold text-black tracking-wider group-hover:text-gray-700 text-xl">
              Donor
            </p>
            <p className="text-black text-center">
              Donate happiness to the needy people.
            </p>
          </div>
        </Link>

        <Link to="/institute-register" className="flex items-center">
          <div className="m-2 group px-10 py-5 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#abd373] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all w-full max-w-md">
            <div className="w-44 h-44 flex items-center justify-center bg-gray-200 text-5xl">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
                alt=""
              />
            </div>
            <p className="cardtxt font-semibold text-black tracking-wider group-hover:text-gray-700 text-xl">
              Institute
            </p>
            <p className="text-black text-center">
              Register your institute and get donations easily.
            </p>
          </div>
        </Link>

        <Link to="/shop-register" className="flex items-center">
          <div className="m-2 group px-10 py-5 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#abd373] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all w-full max-w-md">
            <div className="w-44 h-44 flex items-center justify-center bg-gray-200 rounded-full text-[#abd373] text-5xl">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0O94hj5LQHOGwlt7jM1OyNFtuqiqM42kaUA&s"
                alt=""
              />
            </div>
            <p className="cardtxt font-semibold text-black tracking-wider group-hover:text-gray-700 text-xl">
              Shopkeeper
            </p>
            <p className="text-black text-center">
              Sell your goods to orphanage through a donor and get the blessings of the needy people.
            </p>
          </div>
        </Link>
      </div>

      <div className="text-center mt-4">
        <Link to="/">
          <button className="text-gray-600 font-bold px-16 py-1 rounded-md border border-gray-400">
            Go Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SelectUser;
