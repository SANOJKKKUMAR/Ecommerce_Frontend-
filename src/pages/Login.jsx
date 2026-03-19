import { use, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Logo from '../assets/logo.png'
import axios from "axios";
import { URL } from "../ContextAPI/MyContext";
import { MyContextLogin  } from "../ContextAPI/MyContext";
import  {MyContext}  from "../ContextAPI/CurrentUser.jsx";
import { useContext } from "react";
import { auth, provider } from "../utlis/Firebase.js";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(MyContextLogin);
  const {getUser} = useContext(MyContext);

  async function LoginUser (e) {
    e.preventDefault();
    try {
      let res = await axios.post(  URL+'login', {
        email,
        password
      }
      , 
     { withCredentials : true }
    )
      
      login(res.data);
      getUser();
 

      navigate("/");
    

    }
      catch (error) {
      console.error("Error during login:", error);
      alert(error.message);
    }
  }

  
  async function handleGoogleLogin() {
    try{

      let res = await signInWithPopup(auth, provider);
    
      let user = await axios.post(URL + "googleSignup", {
        name: res.user.displayName,
        email: res.user.email,
      }, { withCredentials : true });
     
      login(user.data);
       getUser();
      navigate("/");
      
    }
    catch(error){
      console.error("Error during Google login:", error);
      alert(error.message);
    }
    

    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="w-24  fixed top-0  left-0 mx-1 my-6 md:left-12 ">
      <Link to='/home' >
           <img src={Logo} alt="" />
      </Link>
       </div>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-yellow-900">
          Login to your account
        </h2>
        <form onSubmit={LoginUser}>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-sm text-blue-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Login Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700" >
          Login
        </button >
           
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center">
          <hr className="flex-1" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-1" />
        </div>

        {/* Google Login */}
        <button className="w-full border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50"  onClick={handleGoogleLogin}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
        <p className="text-center m-5"> 
            Don`t have Acount 
             <Link to="/signup " className="text-red-700 mx-2 font-bold "> Please Signup</Link>
        </p>
      </div>
    </div>
  );
}
