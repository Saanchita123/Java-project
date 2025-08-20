import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetailsById from './components/ProductDetailsById';
import Navbar from './components/Navbar';
import AddProductForm from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetailsById />} />
        <Route path="/add-product" element={<AddProductForm/>} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        
      </Routes>
    </Router>
  );
}

export default App;