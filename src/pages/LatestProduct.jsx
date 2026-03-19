import React, { useContext } from "react";
import { ProductContext } from "../ContextAPI/ProductContext";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function LatestProduct() {
  const { products, addToCart } = useContext(ProductContext);
  return (
    <>
      <div className="12">
        <Navbar></Navbar>
      </div>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {products.map((product) => (
                      <div
                        key={product._id}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                      >
                        <Link to={`/product/${product._id}`} className="block">
                          <div className="aspect-square overflow-hidden">
                            <img
                              src={product.image?.[0] || "/placeholder-image.jpg"}
                              alt={product.productname}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </Link>
                        
                        <div className="p-3">
                          <Link to={`/product/${product._id}`}>
                            <h3 className="font-semibold text-sm md:text-base hover:text-blue-600 transition line-clamp-2">
                              {product.productname}
                            </h3>
                          </Link>
                          
                          <p className="text-blue-600 font-bold mt-1">
                            ₹{product.price?.toLocaleString()}
                          </p>
                          
                          <div className="flex flex-col gap-2 mt-3">
                            <button
                              onClick={() => addToCart(product._id)}
                              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition"
                            >
                              Add to Cart
                            </button>
                            
                            <Link
                              to="/cart"
                              onClick={() => addToCart(product._id)}
                              className="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition text-center"
                            >
                              Buy Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

      </div>
    </>
  );
}

export default LatestProduct;
