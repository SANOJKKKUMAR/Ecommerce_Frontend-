import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ProductContext } from "../ContextAPI/ProductContext";
import Navbar from "./Navbar";
import { 
  FiShoppingCart, 
  FiHeart, 
  FiShare2, 
  FiCheck, 
  FiMinus, 
  FiPlus,
  FiArrowLeft,
  FiStar
} from "react-icons/fi";

function ShowFullProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useContext(ProductContext);
  
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (product?.image?.length > 0) {
      setMainImage(product.image[0]);
    }
    // Reset states when product changes
    setSelectedSize("");
    setQuantity(1);
    setIsAddedToCart(false);
  }, [product]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-24">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-white rounded-lg shadow-lg p-12 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
              <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
              <button
                onClick={() => navigate("/product")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      alert("Please select a size");
      return;
    }
    
    const productWithDetails = {
      ...product,
      selectedSize,
      quantity
    };
    

    addToCart(productWithDetails._id);
    setIsAddedToCart(true);
    
    // Reset the added status after 3 seconds
    setTimeout(() => setIsAddedToCart(false), 3000);
  };

  const handleBuyNow = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      alert("Please select a size");
      return;
    }
    
    const productWithDetails = {
      ...product,
      selectedSize,
      quantity
    };
    
    addToCart(productWithDetails);
    navigate("/cart");
  };

  const handleQuantityChange = (type) => {
    if (type === "increase" && quantity < 10) {
      setQuantity(prev => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  // Get related products (same category, exclude current)
  const relatedProducts = products
    .filter(p => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  return (
    <>
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/product" className="text-gray-600 hover:text-blue-600">Products</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">{product.productname}</span>
          </div>
        </div>
      </div>

      {/* Back Button (Mobile) */}
      <button
        onClick={() => navigate(-1)}
        className="lg:hidden flex items-center gap-2 text-gray-600 hover:text-blue-600 mt-4 ml-4"
      >
        <FiArrowLeft />
        Back
      </button>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Image Section */}
          <div className="space-y-4">
            {/* Main Image with Zoom */}
            <div 
              className="relative overflow-hidden rounded-xl bg-gray-100 aspect-square cursor-zoom-in"
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={mainImage || product.image[0]}
                alt={product.productname}
                className="w-full h-full object-cover transition-transform duration-300"
                style={{
                  transform: showZoom ? 'scale(2)' : 'scale(1)',
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                }}
              />
              
              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition"
              >
                <FiHeart className={`text-xl ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
              
              {/* Share Button */}
              <button
                onClick={() => navigator.share?.({ title: product.productname, url: window.location.href })}
                className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition lg:hidden"
              >
                <FiShare2 className="text-xl text-gray-600" />
              </button>
            </div>

            {/* Thumbnails */}
            {product.image?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.image.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      mainImage === img ? 'border-blue-500' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.productname} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                {product.productname}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className={`text-lg ${
                        star <= (product.rating || 4)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.reviews || 0} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <p className="text-3xl font-bold text-blue-600">
                ₹{product.price?.toLocaleString()}
              </p>
              {product.originalPrice && (
                <>
                  <p className="text-lg text-gray-400 line-through">
                    ₹{product.originalPrice?.toLocaleString()}
                  </p>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm font-semibold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.shortDescription || product.description}
            </p>

            {/* Size Selection */}
            {product.sizes?.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-700">Select Size</h3>
                  <button className="text-sm text-blue-600 hover:underline">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        min-w-[3rem] px-4 py-2 rounded-lg border-2 font-medium transition
                        ${selectedSize === size
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border-2 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    disabled={quantity <= 1}
                    className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiMinus />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    disabled={quantity >= 10}
                    className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiPlus />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {quantity * (product.price || 0) > 0 && 
                    `Total: ₹${(quantity * product.price).toLocaleString()}`
                  }
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className={`
                  flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition
                  ${isAddedToCart
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                  } text-white
                `}
              >
                {isAddedToCart ? (
                  <>
                    <FiCheck className="text-xl" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <FiShoppingCart className="text-xl" />
                    Add to Cart
                  </>
                )}
              </button>
              
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Buy Now
              </button>
            </div>

            {/* Product Details Tabs */}
            <div className="border-t pt-6 mt-6">
              <div className="flex gap-6 border-b">
                {["description", "specifications", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      pb-2 capitalize font-medium transition
                      ${activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                      }
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="py-4">
                {activeTab === "description" && (
                  <div className="space-y-4">
                    <p className="text-gray-600">{product.description}</p>
                    {product.features && (
                      <ul className="list-disc list-inside space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="text-gray-600">{feature}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
                
                {activeTab === "specifications" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-gray-500">Category</p>
                      <p className="font-medium">{product.category}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-500">Subcategory</p>
                      <p className="font-medium">{product.subcategory}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-500">Material</p>
                      <p className="font-medium">{product.material || "Cotton"}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-500">Care Instructions</p>
                      <p className="font-medium">{product.care || "Machine wash"}</p>
                    </div>
                  </div>
                )}
                
                {activeTab === "reviews" && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No reviews yet. Be the first to review this product!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  to={`/product/${relatedProduct._id}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.image[0]}
                      alt={relatedProduct.productname}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm group-hover:text-blue-600 transition line-clamp-2">
                      {relatedProduct.productname}
                    </h3>
                    <p className="text-blue-600 font-bold mt-1">
                      ₹{relatedProduct.price?.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ShowFullProduct;