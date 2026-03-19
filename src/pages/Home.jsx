import React, { useContext } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import ProductPage from "./ProductPage";
import Footer from "./Footer";
import LatestProduct from "./LatestProduct";
import Bestseller from "./Bestseller";

function Home() {
  return (
    <>
      <div>
        <Navbar></Navbar>
        <Hero></Hero>
        <LatestProduct></LatestProduct>
        <Bestseller></Bestseller>

      </div>
    </>
  );
}

export default Home;
