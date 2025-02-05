import React from "react";

const Product = ({ name, price, description, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 mb-2">{description}</p>
        <p className="text-lg font-bold text-blue-600">${price}</p> 
      </div>
    </div>
  );
};

export default Product;
