import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../ContextAPI/ProductContext";
import {MyContextLogin} from "../ContextAPI/MyContext"
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiArrowLeft,
} from "react-icons/fi";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(ProductContext);

  const {addresses,getAddress ,deleteAddress,updateAddress} = useContext(MyContextLogin);

      useEffect(() => {
getAddress();

  }, []);




  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  // Mock coupons for demonstration
  const validCoupons = {
    SAVE10: 10,
    SAVE20: 20,
    WELCOME15: 15,
  };

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);

  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shipping + tax - discount;

  // Apply coupon
  const applyCoupon = () => {
    const coupon = couponCode.toUpperCase().trim();
    if (validCoupons[coupon]) {
      const discountAmount = (subtotal * validCoupons[coupon]) / 100;
      setDiscount(discountAmount);
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
      setDiscount(0);
      setCouponApplied(false);
    }
  };

  // Remove coupon
  const removeCoupon = () => {
    setCouponCode("");
    setDiscount(0);
    setCouponApplied(false);
    setCouponError("");
  };

  // Handle quantity update
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateQuantity?.(itemId, newQuantity);
    }
  };

  // Check if cart is empty
  if (cart.length === 0) {
    return (
      <>
        <div className="mb-24">
          <Navbar />
        </div>
        <div className="min-h-screen bg-gray-50 pt-24">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <div className="bg-white rounded-lg shadow-lg p-12">
              <FiShoppingCart className="text-6xl text-gray-300 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link
                to="/product"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                <FiArrowLeft />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-12">
        <Navbar />
      </div>
      <div className="min-h-screen bg-gray-50 pt-20 md:pt-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Shopping Cart ({cart.length}{" "}
              {cart.length === 1 ? "item" : "items"})
            </h1>
            <Link
              to="/product"
              className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
            >
              <FiArrowLeft />
              Continue Shopping
            </Link>
          </div>
         <div className="text-xl mb-4 ">

  {(!addresses || addresses.length === 0) ? (

    <Link to="/address">
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Address +
      </button>
    </Link>

  ) : (

    addresses.map((add) => (
      <div
  key={add._id}
  className="group relative border-2 border-gray-100 p-5 mb-4 rounded-2xl bg-white 
             hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50 
             transition-all duration-300 ease-in-out cursor-pointer
             active:scale-[0.99]"
>
  {/* Decorative accent line */}
  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 
                  bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-full 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  </div>

  {/* Header with name and optional badge */}
  <div className="flex items-center justify-between mb-3">
    <p className="font-bold text-lg text-gray-800 group-hover:text-blue-600 
                  transition-colors duration-200 flex items-center gap-2">
      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" 
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      {add.address.name || 0}
    </p>
    
    {/* Default badge - show if this is default address */}
    {add.isDefault && (
      <span className="px-3 py-1 text-xs font-semibold text-white 
                       bg-gradient-to-r from-green-500 to-emerald-500 
                       rounded-full shadow-sm shadow-green-200">
        DEFAULT
      </span>
    )}
  </div>

  {/* Address details with icons */}
  <div className="space-y-2 text-gray-600 pl-7">
    {/* House/Area line */}
    <p className="flex items-start gap-2 text-sm">
      <svg className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" 
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      <span className="flex-1">
        {add.address.house}, {add.address.area}
      </span>
    </p>

    {/* City/State line */}
    <p className="flex items-start gap-2 text-sm">
      <svg className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" 
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span className="flex-1">
        {add.address.city}, {add.address.state}
      </span>
    </p>

    {/* Pincode line */}
    <p className="flex items-start gap-2 text-sm">
      <svg className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" 
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span className="font-mono font-medium text-gray-700">
        {add.address.pincode}
      </span>
    </p>
  </div>

  {/* Action buttons - appear on hover */}
  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-200">
    <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 
                       hover:scale-110 transition-all duration-200 
                       focus:outline-none focus:ring-2 focus:ring-blue-300"
            title="Edit address"
            onClick={() => updateAddress(add)}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>
    
    <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 
                       hover:scale-110 transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-red-300"
            title="Delete address"
            onClick={() => deleteAddress(add._id)}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  </div>

  {/* Optional: Phone number if available */}
  {add.address.phone && (
    <div className="mt-3 pt-3 border-t border-dashed border-gray-200 
                    flex items-center gap-2 text-sm text-gray-500">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      {add.address.phone}
    </div>
  )}
</div>
      
    ))
    

  )}

</div>
          {/* Main Content */}

          <div className="flex flex-col lg:flex-row gap-8">
            

            {/* Cart Items */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {cart.map((item, index) => (
                  <div
                    key={item._id}
                    className={`
                      flex flex-col sm:flex-row items-start sm:items-center 
                      gap-4 p-4 border-b last:border-b-0
                      hover:bg-gray-50 transition
                    `}
                  >
                    {/* Product Image */}
                    <Link to={`/product/${item._id}`} className="shrink-0">
                      <img
                        src={item.image?.[0] || "/placeholder-image.jpg"}
                        alt={item.productname}
                        className="w-24 h-24 object-cover rounded-lg border"
                      />
                    </Link>

                    {/* Product Details */}

                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <Link
                            to={`/product/${item._id}`}
                            className="font-semibold text-gray-800 hover:text-blue-600 transition"
                          >
                            {item.productname}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.category} / {item.subcategory}
                          </p>
                        </div>

                        <p className="font-bold text-lg text-blue-600">
                          ₹
                          {(
                            (item.price || 0) * (item.quantity || 1)
                          ).toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Qty:</span>
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item._id,
                                  (item.quantity || 1) - 1,
                                )
                              }
                              disabled={item.quantity <= 1}
                              className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <FiMinus className="text-sm" />
                            </button>
                            <span className="w-10 text-center">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item._id,
                                  (item.quantity || 1) + 1,
                                )
                              }
                              disabled={item.quantity >= 10}
                              className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <FiPlus className="text-sm" />
                            </button>
                          </div>
                        </div>

                        {/* Unit Price */}
                        <span className="text-sm text-gray-500">
                          ₹{item.price?.toLocaleString()} each
                        </span>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition"
                          title="Remove item"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shopping Tips */}
              {/* <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">✨ Shopping Tips</h3>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Free shipping on orders above ₹500</li>
                  <li>• Use coupon code "SAVE10" for 10% discount</li>
                  <li>• Maximum quantity per item is 10</li>
                </ul>
              </div> */}
            </div>

            {/* Order Summary */}
            <div className="lg:w-80">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      <span className="font-medium">₹{shipping}</span>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (5%)</span>
                    <span className="font-medium">₹{tax.toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-blue-600">
                        ₹{total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Coupon Code */}
                {/* <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Have a coupon?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponApplied}
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100"
                    />
                    {couponApplied ? (
                      <button
                        onClick={removeCoupon}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={applyCoupon}
                        disabled={!couponCode}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  {couponError && (
                    <p className="text-red-500 text-sm mt-1">{couponError}</p>
                  )}
                  {couponApplied && (
                    <p className="text-green-500 text-sm mt-1">
                      Coupon applied! You saved ₹{discount.toLocaleString()}
                    </p>
                  )}
                </div> */}

                {/* Checkout Button */}
                <button
                  onClick={() => navigate("/payment")}
                  disabled={cart.length === 0}
                  className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>

                {/* Secure Payment Note */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  🔒 Secure payment guaranteed
                </p>
              </div>
            </div>
          </div>

          {/* Related Products Section (Optional) */}
        </div>
      </div>
    </>
  );
};

export default CartPage;
