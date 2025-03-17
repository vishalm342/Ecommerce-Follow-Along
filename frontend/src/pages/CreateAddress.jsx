import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Navbar";

const CreateAddress = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [addressType, setAddressType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if user exists before allowing address creation
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v2/user/profile?email=rahul@gmail.com",
          { withCredentials: true }
        );
        if (!response.data.user) {
          setError("User not found. Please register first.");
        }
      } catch (err) {
        console.error("Error checking user:", err);
        setError("Unable to verify user. Please ensure you're registered and logged in.");
      }
    };
    
    checkUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const addressData = {
      country,
      city,
      address1,
      address2,
      zipCode,
      addressType,
      email: "rahul@gmail.com"
    };
    
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v2/user/add-address",
        addressData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      setIsLoading(false);
      if (response.status === 201 || response.status === 200) {
        alert("Address added successfully!");
        navigate("/profile");
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error adding address:", err);
      
      let errorMessage = "Failed to add address. Please check the data and try again.";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      
      setError(errorMessage);
    }
  };

  return (
    <>
      <Nav />
      <div className="w-[90%] max-w-[500px] bg-white shadow h-auto rounded-[4px] p-4 mx-auto">
        <h5 className="text-[24px] font-semibold text-center">Add Address</h5>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="pb-1 block">Country</label>
            <input
              type="text"
              value={country}
              className="w-full p-2 border rounded"
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter country"
              required
            />
          </div>
          <div className="mt-4">
            <label className="pb-1 block">City</label>
            <input
              type="text"
              value={city}
              className="w-full p-2 border rounded"
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              required
            />
          </div>
          <div className="mt-4">
            <label className="pb-1 block">Address 1</label>
            <input
              type="text"
              value={address1}
              className="w-full p-2 border rounded"
              onChange={(e) => setAddress1(e.target.value)}
              placeholder="Enter address 1"
              required
            />
          </div>
          <div className="mt-4">
            <label className="pb-1 block">Address 2</label>
            <input
              type="text"
              value={address2}
              className="w-full p-2 border rounded"
              onChange={(e) => setAddress2(e.target.value)}
              placeholder="Enter address 2"
            />
          </div>
          <div className="mt-4">
            <label className="pb-1 block">Zip Code</label>
            <input
              type="number"
              value={zipCode}
              className="w-full p-2 border rounded"
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Enter zip code"
              required
            />
          </div>
          <div className="mt-4">
            <label className="pb-1 block">Address Type</label>
            <input
              type="text"
              value={addressType}
              className="w-full p-2 border rounded"
              onChange={(e) => setAddressType(e.target.value)}
              placeholder="Enter address type"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white p-2 rounded"
            disabled={isLoading || error}
          >
            {isLoading ? "Adding..." : "Add Address"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateAddress;