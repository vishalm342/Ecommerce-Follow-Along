import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';  // Import directly
import SignUpPage from './pages/SignupPage';
import "./App.css";
import Home from './pages/Home'; 
import CreateProduct from './pages/createProduct';
import MyProducts from './pages/myProducts';
import Cart from './pages/cart';
const App = () => {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      <Route path="/create-product/:id" element={<CreateProduct />} />
      <Route path="/create-product" element={<CreateProduct />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/myproducts' element={<MyProducts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

