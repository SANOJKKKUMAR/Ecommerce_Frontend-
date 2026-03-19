import React from "react";
import girlimg from "../assets/girl 23.jpg";
import Navbar from "./Navbar";

function Orderstatus() {

  // demo data (baad me API se aayega)
  const orders = [
    {
      id: 1,
      productname: "Men T-shirt",
      price: 499,
      quantity: 2,
      image: {girlimg},
      status: "procesing"
    },
    
  ];

  return (
  

    <>

    <div>
      <Navbar></Navbar>
    </div>
    <div className="p-6 mt-24">

      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">

        {orders.map((order) => (
          <div
            key={order.id}
            className="border p-4 rounded-lg shadow flex flex-col md:flex-row gap-4 items-center"
          >

            {/* Product Image */}
            <img
              src={order.image}
              alt={order.productname}
              className="w-28 h-28 object-cover rounded"
            />

            {/* Product Details */}
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{order.productname}</h2>
              <p className="text-gray-600">Price: ₹{order.price}</p>
              <p className="text-gray-600">Quantity: {order.quantity}</p>
            </div>

            {/* Order Status */}
            <div className="text-center">
              <p className="font-semibold">Status</p>
              <span className="text-green-600 font-bold">
                {order.status}
              </span>
            </div>

            {/* Track Button */}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
             wait for....
            </button>

          </div>
        ))}

      </div>

    </div>
</>  );
}

export default Orderstatus;