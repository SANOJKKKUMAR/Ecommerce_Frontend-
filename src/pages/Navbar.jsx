import React from "react";
import logo from "../assets/logo.png";
import { CgProfile } from "react-icons/cg";
import { FaCartPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { MyContext } from "../ContextAPI/CurrentUser";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


  import { useRef, useEffect } from "react";
  import { ProductContext } from "../ContextAPI/ProductContext";


function Navbar() {
  let { currentUser , logoutUser } = useContext(MyContext);
  const {cart} = useContext(ProductContext);



const searchRef = useRef(null);

    const [open, setOpen] = useState(false);

    const[openSearch , setOpenSearch] = useState(false);

const navigate = useNavigate();

const handleLogout = async () => {
  await logoutUser();
  navigate("/login");
};


    const toggleMenu = () => {
    setOpen(!open);
  };

 




  useEffect(() => {
  function handleClickOutside(event) {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setOpenSearch(false);
      setOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  return (
  <>
    <div className="fixed top-0 left-0 w-full z-40 bg-gray-900/90 backdrop-blur-md shadow-lg">

  <div className="flex justify-between items-center px-4 md:px-8 py-3 text-white">

    {/* LEFT */}
    <div className="flex items-center gap-2">
      <Link to="/">
      <img className="h-10 w-10 md:h-12 md:w-12" src={logo} alt="Logo"/>
      <h1 className="text-lg md:text-2xl font-bold tracking-wide">
        sCart
      </h1></Link>
    </div>

    {/* DESKTOP MENU */}
    <ul className="hidden md:flex gap-8 font-medium text-sm tracking-wide">
      <li className="cursor-pointer hover:text-blue-400 transition"  ><Link to="/">HOME</Link></li>
      <li className="cursor-pointer hover:text-blue-400 transition"> <Link to ="/product"> COLLECTIONS  </Link> </li>
      <li className="cursor-pointer hover:text-blue-400 transition"> <Link to="/about"> ABOUT</Link> </li>
      <li className="cursor-pointer hover:text-blue-400 transition"><Link to="/contact" >CONTACT</Link></li>
    </ul>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-5 text-xl" 
    
    >

      {/* SEARCH */}
      <IoIosSearch onClick={()=>{
      navigate("/product")
    }}
        size={24}
       
        className="cursor-pointer hover:text-blue-400"
      />

      {/* CART */}
      <div className="relative">
        <Link to="/cart">
          <FaCartPlus className="cursor-pointer hover:text-blue-400"/>

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] md:text-xs font-bold min-w-[18px] h-5 px-1 rounded-full flex items-center justify-center">
            {cart ? cart.length : 0}
          </span>
        </Link>
      </div>

      {/* PROFILE */}
      {currentUser ? (
        <div className="relative">

          <div
            onClick={toggleMenu}
            className="bg-gray-700 h-8 w-8 flex items-center justify-center rounded-full font-bold cursor-pointer"
          >
            {currentUser.name.charAt(0).toUpperCase()}
          </div>

          {open && (
            <div className="absolute right-0 mt-3 w-56 bg-white text-black shadow-xl rounded-lg p-4"  ref={searchRef} >

              <p className="font-semibold border-b pb-2">
                {currentUser.name}
              </p>

              <div className="flex flex-col gap-4 items-start">
               
              <button className="mt-4" onClick={()=>{
                navigate("/orderstatus")
              }}>
               <Link >
                Orders
                </Link>
              </button>

               <button
                onClick={handleLogout}
                className=" text-red-500 hover:text-red-700 mt-0"
              >
                Logout
              </button>
              </div>

            </div>
          )}

        </div>
      ) : (
        <CgProfile className="cursor-pointer hover:text-blue-400"/>
      )}

      {/* MOBILE MENU */}
  

    </div>

  </div>

</div>

{openSearch && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start md:items-center justify-center z-50 p-4">

    <div
      ref={searchRef}
      className="
      bg-white
      w-full
      md:w-[500px]
      rounded-full
      shadow-2xl
      flex
      items-center
      gap-3
      px-5
      py-3
      mt-20 md:mt-0
      "
    >

      <IoIosSearch className="text-gray-500 text-xl"/>

      <input
        type="text"
        placeholder="Search products..."
        className="w-full bg-transparent focus:outline-none text-gray-700"
      />

      <button
        onClick={() => setOpenSearch(false)}
        className="text-gray-500 hover:text-red-500 text-lg"
      >
        ✕
      </button>

    </div>

  </div>
)}
  </>
);
}

export default Navbar;
