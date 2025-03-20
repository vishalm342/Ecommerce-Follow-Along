/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Navbar";

export default function Cart() {
  const [cart, setCart] = useState({ cartItems: [] });
  const [loading, setLoading] = useState(true);
  const email = "rahul@gmail.com"; // Using the same email as in productDetails.jsx

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v2/get-cart/${email}`
        );
        console.log("Cart data:", response.data);
        setCart(response.data.cart || { cartItems: [] });
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [email]);

  if (loading) {
    return (
      <>
        <Nav />
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
          <p>Loading your cart...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {cart.cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="grid gap-4">
            {cart.cartItems.map((item) => (
              <div
                key={item._id}
                className="border rounded-lg p-4 flex items-center"
              >
                <div className="w-20 h-20 mr-4">
                  <img
                    src={`http://localhost:8000${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p>
                    ${item.price} × {item.quantity}
                  </p>
                </div>
                <div>
                  <p className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-4 text-right">
              <p className="text-xl font-bold">
                Total: $
                {cart.cartItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
              <button className="bg-black text-white px-6 py-2 mt-4 rounded-full hover:bg-gray-800">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
