import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  FaCheckCircle, 
  FaHome, 
  FaShoppingBag, 
  FaPrint,
  FaShare,
  FaStar,
  FaTruck,
  FaClock,
  FaMapMarkerAlt
} from "react-icons/fa";
import { FiPackage, FiDownload } from "react-icons/fi";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [showConfetti, setShowConfetti] = useState(true);

  // Mock order details (in real app, these would come from context/state)
  const orderDetails = {
    orderId: "ORD" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    paymentMethod: "Cash on Delivery",
    total: 1299, // This would come from actual cart total
    items: [
      { name: "Product 1", quantity: 2, price: 499 },
      { name: "Product 2", quantity: 1, price: 799 }
    ],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "+91 9876543210"
    }
  };

  // Auto-redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  // Confetti effect (simplified version)
  useEffect(() => {
    const timeout = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Order Confirmation',
          text: `My order ${orderDetails.orderId} has been placed successfully!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
        alert(error.message);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(`Order ${orderDetails.orderId} placed successfully!`);
      alert('Order details copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      
      {/* Confetti Animation (simplified) */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        
        {/* Success Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white text-center">
            <FaCheckCircle className="text-7xl mx-auto mb-4 animate-bounce" />
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-green-100 text-lg">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>

          {/* Auto-redirect message */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-yellow-700">
                  You will be redirected to home page in <span className="font-bold">{countdown}</span> seconds
                </p>
              </div>
              <button
                onClick={() => navigate("/")}
                className="text-sm text-yellow-700 hover:text-yellow-900 underline"
              >
                Redirect Now
              </button>
            </div>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          
          {/* Order Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiPackage className="text-blue-500" />
              Order Information
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono font-semibold">{orderDetails.orderId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-medium">{orderDetails.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium text-green-600">{orderDetails.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Amount:</span>
                <span className="text-xl font-bold text-blue-600">₹{orderDetails.total}</span>
              </div>
            </div>
          </div>

          {/* Delivery Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaTruck className="text-green-500" />
              Delivery Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FaClock className="text-gray-400 mt-1" />
                <div>
                  <p className="text-gray-600">Estimated Delivery:</p>
                  <p className="font-semibold">{orderDetails.estimatedDelivery}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-gray-400 mt-1" />
                <div>
                  <p className="text-gray-600">Shipping Address:</p>
                  <p className="font-semibold">{orderDetails.shippingAddress.name}</p>
                  <p className="text-sm text-gray-600">
                    {orderDetails.shippingAddress.address}<br />
                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} - {orderDetails.shippingAddress.pincode}<br />
                    Phone: {orderDetails.shippingAddress.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3">
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>
            ))}
            <div className="flex justify-between items-center pt-3 border-t border-dashed">
              <span className="font-bold">Subtotal</span>
              <span className="font-bold">₹{orderDetails.total}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t text-lg">
              <span className="font-bold">Total</span>
              <span className="font-bold text-blue-600">₹{orderDetails.total}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              to="/"
              className="col-span-2 md:col-span-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <FaHome />
              <span>Home</span>
            </Link>

            <Link
              to="/product"
              className="col-span-2 md:col-span-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <FaShoppingBag />
              <span>Shop More</span>
            </Link>

            <button
              onClick={handlePrint}
              className="col-span-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <FaPrint />
              <span className="hidden md:inline">Print</span>
            </button>

            <button
              onClick={handleShare}
              className="col-span-1 bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <FaShare />
              <span className="hidden md:inline">Share</span>
            </button>
          </div>

          {/* Additional Options */}
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            <Link
              to="/orders"
              className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
            >
              Track Order
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              to="/contact"
              className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
            >
              Need Help?
            </Link>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => {/* Download invoice */}}
              className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
            >
              <FiDownload />
              Download Invoice
            </button>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6 text-center">
          <h3 className="font-semibold text-gray-800 mb-2">
            How was your shopping experience?
          </h3>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="text-2xl text-gray-300 hover:text-yellow-400 transition"
              >
                <FaStar />
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Your feedback helps us improve your shopping experience
          </p>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Stay Updated!</h3>
          <p className="text-blue-100 mb-4">
            Subscribe to get updates on new products and exclusive offers
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-r-lg font-semibold transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default OrderSuccess;