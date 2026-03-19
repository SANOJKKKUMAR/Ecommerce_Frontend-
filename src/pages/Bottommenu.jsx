import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { MdCollections } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";
import { IoCall } from "react-icons/io5";

function Bottommenu() {
  return (
    <div>
          <div
        className="
        fixed
        bottom-0
        left-0
        w-full
        bg-gray-900
        text-white
        flex
        justify-around
        items-center
        py-3
        md:hidden
        z-50
        border-t border-gray-700
        shadow-lg
        "
      >
      
        <Link
          to="/"
          className="flex flex-col items-center text-xs hover:text-blue-400"
        >
          <FaHome size={22}/>
          <span>Home</span>
        </Link>
      
        <Link
          to="/product"
          className="flex flex-col items-center text-xs hover:text-blue-400"
        >
          <MdCollections size={22}/>
          <span>Collections</span>
        </Link>
      
        <Link
          to="/about"
          className="flex flex-col items-center text-xs hover:text-blue-400"
        >
          <IoMdInformationCircle size={22}/>
          <span>About</span>
        </Link>
      
        <Link
          to="/contact"
          className="flex flex-col items-center text-xs hover:text-blue-400"
        >
          <IoCall size={22}/>
          <span>Contact</span>
        </Link>
      
      </div>
    </div>
  )
}

export default Bottommenu
