import { useContext, useState, useEffect, useMemo } from "react";
import { ProductContext } from "../ContextAPI/ProductContext";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { FiFilter, FiX, FiSearch } from "react-icons/fi";
import { useRef } from "react";

const ProductPage = () => {
  const { products, addToCart } = useContext(ProductContext);

  // State Management

  const searchRef = useRef(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(10000);
  const [showFilter, setShowFilter] = useState(false);
  const [subCategory, setSubCategory] = useState("");
  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => {
      const matchesSearch = p.productname?.toLowerCase().includes(search.toLowerCase()) || 
                           p.description?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !category || p.category === category;
      const matchesSubCategory = !subCategory || p.subcategory === subCategory;
      const matchesPrice = p.price <= price;
      
      return matchesSearch && matchesCategory && matchesSubCategory && matchesPrice;
    });

    // Sorting
    if (sortType === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, search, category, subCategory, price, sortType]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, subCategory, price, sortType]);

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSubCategory("");
    setPrice(10000);
    setSortType("");
  };

  // Toggle filter for mobile
  const toggleFilter = () => {
    setShowFilter(!showFilter);
    if (!showFilter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  // Category selection handler
  const handleCategoryChange = (selectedCategory) => {
    setCategory(category === selectedCategory ? "" : selectedCategory);
  };

  // Subcategory selection handler
  const handleSubCategoryChange = (selectedSubCategory) => {
    setSubCategory(subCategory === selectedSubCategory ? "" : selectedSubCategory);
  };

  useEffect(() => {
  searchRef.current.focus();
}, []);

  return (
    <>
     <div className="mb-12">
      <Navbar>

      </Navbar>
     </div>
      
      {/* Main Container */}
      <div className="min-h-screen bg-gray-50 pt-20 md:pt-24">
        <div className="container mx-auto px-4">
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              ref={searchRef}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Mobile Filter Header */}
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <button
              onClick={toggleFilter}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
            >
              <FiFilter className="text-lg" />
              <span>Filters</span>
              {(category || subCategory || price < 10000) && (
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {[category, subCategory, price < 10000 ? 1 : null].filter(Boolean).length}
                </span>
              )}
            </button>
            
            {/* Sort Dropdown for Mobile */}
            <select
              className="border border-gray-300 p-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
            >
              <option value="">Sort By</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Filter Sidebar */}
            <div
              className={`
                fixed lg:relative
                inset-0
                z-50 lg:z-auto
                bg-white
                lg:block
                lg:w-72
                ${showFilter ? "block" : "hidden lg:block"}
                overflow-y-auto
                p-6
                rounded-lg
                shadow-lg lg:shadow-none
              `}
            >
              {/* Mobile Filter Header */}
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h2 className="font-bold text-xl">Filters</h2>
                <button onClick={toggleFilter} className="p-2 hover:bg-gray-100 rounded-full">
                  <FiX className="text-2xl" />
                </button>
              </div>

              {/* Filter Content */}
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3 text-lg">Categories</h3>
                  <div className="space-y-2">
                    {["men", "women", "kids"].map((cat) => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={category === cat}
                          onChange={() => handleCategoryChange(cat)}
                          className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                        />
                        <span className="capitalize">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sub Categories */}
                <div>
                  <h3 className="font-semibold mb-3 text-lg">Sub Categories</h3>
                  <div className="space-y-2">
                    {["TopWear", "BottomWear", "WinterWear"].map((subCat) => (
                      <label key={subCat} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={subCategory === subCat}
                          onChange={() => handleSubCategoryChange(subCat)}
                          className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                        />
                        <span>{subCat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-3 text-lg">Price Range</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹0</span>
                      <span>Max: ₹{price}</span>
                    </div>
                  </div>
                </div>

                {/* Clear Filters Button */}
                {(category || subCategory || price < 10000) && (
                  <button
                    onClick={clearFilters}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>

            {/* Products Section */}
            <div className="flex-1">
              {/* Desktop Sort */}
              <div className="hidden lg:flex justify-end mb-6">
                <select
                  className="border border-gray-300 p-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => setSortType(e.target.value)}
                  value={sortType}
                >
                  <option value="">Sort By Relevance</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-blue-500 hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {currentProducts.map((product) => (
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

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      
                      <span className="px-4 py-2">
                        Page {currentPage} of {totalPages}
                      </span>
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      

      
      {/* Overlay for mobile filter */}
      {showFilter && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleFilter}
        />
      )}
    </>
  );
};

export default ProductPage;