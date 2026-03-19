import React, { useState, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { MyContextLogin } from "../ContextAPI/MyContext";

function Address() {
  const { 
    SaveAddress, 
    updateAddress, 
    deleteAddress, 
    address: savedAddress,
    getAddress,
    addresses 
  } = useContext(MyContextLogin);


  
  
  

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    state: "",
    city: "",
    house: "",
    area: "",
    country: "",
    isDefault: false
  });

  const [editMode, setEditMode] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all addresses on component mount
  useEffect(() => {
    fetchAllAddresses();
  }, []);

  // Update form when savedAddress changes (for editing)
  useEffect(() => {
    if (savedAddress) {
      setAddress(savedAddress);
      setEditMode(true);
      setSelectedAddressId(savedAddress._id || savedAddress.id);
    }
  }, [savedAddress]);

  const fetchAllAddresses = async () => {
    if (getAddress) {
      await getAddress();
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setAddress({
      ...address,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await SaveAddress(address);
      alert("Address Saved Successfully");
      resetForm();
      await fetchAllAddresses(); // Refresh the list
    } catch (error) {
      alert("Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateAddress(address);
      alert("Address Updated Successfully");
      resetForm();
      await fetchAllAddresses(); // Refresh the list
    } catch (error) {
      alert("Failed to update address");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    
    setLoading(true);
    try {
      await deleteAddress(addressId);
      alert("Address Deleted Successfully");
      
      if (selectedAddressId === addressId) {
        resetForm();
      }
      
      await fetchAllAddresses(); // Refresh the list
    } catch (error) {
      alert("Failed to delete address");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAddress({
      name: "",
      phone: "",
      pincode: "",
      state: "",
      city: "",
      house: "",
      area: "",
      country: "",
      isDefault: false
    });
    setEditMode(false);
    setSelectedAddressId(null);
  };

  const handleEditClick = (addr) => {
    setAddress(addr);
    setEditMode(true);
    setSelectedAddressId(addr._id || addr.id);
  };

  const handleSetDefault = async (addr) => {
    const updatedAddr = { ...addr, isDefault: true };
    try {
      await updateAddress(updatedAddr);
      await fetchAllAddresses();
    } catch (error) {
      alert("Failed to set default address");
    }
  };

  return (
    <>
      <div className="lg:mt-24">
        <Navbar />
      </div>

      <div className="min-h-screen bg-gray-100 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Delivery Addresses</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column - Address Form */}
            <div className="bg-white shadow-lg rounded-lg p-6 h-fit">
              <h2 className="text-2xl font-bold mb-6 text-center">
                {editMode ? "Edit Address" : "Add New Address"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    value={address.name}
                    onChange={handleChange}
                    className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile Number *"
                    value={address.phone}
                    onChange={handleChange}
                    className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                    pattern="[0-9]{10}"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode *"
                    value={address.pincode}
                    onChange={handleChange}
                    className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />

                  <input
                    type="text"
                    name="city"
                    placeholder="City *"
                    value={address.city}
                    onChange={handleChange}
                    className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="state"
                    placeholder="State *"
                    value={address.state}
                    onChange={handleChange}
                    className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />

                  <input
                    type="text"
                    name="country"
                    placeholder="Country *"
                    value={address.country}
                    onChange={handleChange}
                    className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <input
                  type="text"
                  name="house"
                  placeholder="House No / Building Name *"
                  value={address.house}
                  onChange={handleChange}
                  className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />

                <textarea
                  name="area"
                  placeholder="Road Name / Area / Colony *"
                  value={address.area}
                  onChange={handleChange}
                  className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  rows="2"
                  required
                />

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isDefault"
                    id="isDefault"
                    checked={address.isDefault}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor="isDefault" className="text-gray-700">
                    Set as default address
                  </label>
                </div>

                {/* Form Buttons */}
                <div className="flex gap-3">
                  {!editMode ? (
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading ? "Saving..." : "Save Address"}
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={handleUpdate}
                        disabled={loading}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {loading ? "Updating..." : "Update Address"}
                      </button>
                      
                      <button
                        type="button"
                        onClick={resetForm}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>

            {/* Right Column - Address List */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">
                Saved Addresses ({addresses?.length || 0})
                {console.log("address ttttttttt---",addresses)}
              
              </h2>

              {addresses && addresses.length > 0 ? (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {addresses.map((addr) => (
                    <div
                      key={addr._id || addr.id}
                      className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                        addr.isDefault ? 'border-green-500 bg-green-50' : 'border-gray-200'
                      } ${selectedAddressId === (addr._id || addr.id) ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      {/* Default Badge */}
                      {addr.isDefault && (
                        <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded mb-2">
                          DEFAULT ADDRESS
                        </span>
                      )}

                      {/* Address Details */}
                      <div className="space-y-1 text-gray-700">
                        <p className="font-semibold text-lg">{addr.address.name}</p>
                        <p className="text-sm">{addr.address.house}, {addr.address.area}</p>
                        <p className="text-sm">{addr.address.city}, {addr.address.state} - {addr.address.pincode}</p>
                        <p className="text-sm">{addr.address.country}</p>
                        <p className="text-sm font-medium">📞 {addr.address.phone}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4 pt-3 border-t">
                        <button
                          onClick={() => handleEditClick(addr._id)}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
                        >
                          Edit
                        </button>
                        
                        <button
                          onClick={() => handleDelete(addr._id || addr.id)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
                        >
                          Delete
                        </button>

                        {!addr.isDefault && (
                          <button
                            onClick={() => handleSetDefault(addr)}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
                            title="Set as default"
                          >
                            Set Default
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-lg">No addresses saved yet</p>
                  <p className="text-sm mt-2">Add your first address using the form</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Address;