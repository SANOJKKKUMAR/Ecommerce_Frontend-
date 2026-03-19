import { useContext } from "react";
import { ProductContext } from "../ContextAPI/ProductContext";
import { useNavigate } from "react-router-dom";

import {MyContextLogin} from "../ContextAPI/MyContext"

const PaymentPage = () => {

  const navigate = useNavigate();
  const { cart } = useContext(ProductContext);

    const {addresses} = useContext(MyContextLogin);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 md:p-8 text-center md:text-left">

        {/* Title */}
        <h1 className="text-xl md:text-2xl font-bold mb-6">
          Payment Method
        </h1>

        {/* Order Summary */}
        <div className="border rounded-lg p-4 md:p-6 mb-6">

          <h2 className="font-semibold mb-4 text-lg">
            Order Summary
          </h2>

          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center mb-3 text-sm md:text-base"
            >
              <span className="truncate max-w-[60%]">
                {item.productname}
              </span>

              <span className="font-medium">
                ₹{item.price}
              </span>
            </div>
          ))}

          <hr className="my-4"/>

          <h3 className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </h3>

        </div>

        {/* Payment Option */}
        <div className="border rounded-lg p-4 md:p-6">

          <label className="flex items-center justify-center md:justify-start gap-3">

            <input type="radio" checked readOnly />

            Cash on Delivery

          </label>


          
  {(!addresses || addresses.length === 0) ? (

    <Link to="/address">
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Address +
      </button>
    </Link>

  ) : (

    addresses.map((add) => (
      <div key={add._id} className="border p-3 mb-2 rounded">

        <p className="font-semibold">{add.address.name}</p>
        <p>{add.address.house}, {add.address.area}</p>
        <p>{add.address.city}, {add.address.state}</p>
        <p>{add.address.pincode}</p>

      </div>
      
    ))
    

  )}

        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/secsess")}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
        >
          Confirm Order
        </button>

      </div>

    </div>
  );
};

export default PaymentPage;