import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

import Navbar from "./pages/Navbar.jsx";


import Hero from "./pages/Hero.jsx";
import { MyContext } from "./ContextAPI/CurrentUser.jsx";
import { useContext } from "react";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./pages/Footer.jsx";
import VoiceAssistant from "./pages/VoiceAssistant.jsx";
import ShowFullProduct from "./pages/ShowFullProduct.jsx";
import LatestProduct from "./pages/LatestProduct.jsx";
import Bottommenu from "./pages/Bottommenu.jsx";
import { useLocation } from "react-router-dom";
import Bestseller from "./pages/Bestseller.jsx";
import Orderstatus from "./pages/orderstatus.jsx";
import Address from "./pages/Address.jsx";

function App() {

    const location = useLocation();

    const hideComponents = ["/login", "/signup"];

  const shouldHide = hideComponents.includes(location.pathname);
  const { currentUser } = useContext(MyContext);


  return (<>




{!currentUser ?  <Routes>
  <Route path="/" element={<Login/>} />
      <Route path="/login"element={ <Login /> }/>
 <Route path="/signup" element={<Signup />} />

   

 </Routes>  : <> <Routes>
   <Route path="/login"element={ <Login /> }/>
 <Route path="/signup" element={<Signup />} />

     <Route path="/" element={ <Home /> } />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/hero" element={<Hero />} />
      <Route path="/product" element={<ProductPage/>} />
      <Route path="cart" element={<CartPage/>} />
      <Route path="payment" element={<PaymentPage/>} />
      <Route path="secsess" element={<OrderSuccess/>} />
      <Route path="about" element={<About/>} />
      <Route path="contact" element={<Contact/>} />
      <Route path="/product/:id" element ={<ShowFullProduct/> } />
      <Route path="/latestproduct" element={<LatestProduct/>} />
      <Route path="/bestseler" element={<Bestseller/>}/>
      <Route path="/orderstatus" element={<Orderstatus/>}/>
      <Route path="/address" element={<Address/>}/>

    </Routes> </> }

  

{currentUser && !shouldHide && (
  <>
    <Bottommenu />
    <VoiceAssistant />
    <Footer />
  </>
)}
   
   </> );
}

export default App;
