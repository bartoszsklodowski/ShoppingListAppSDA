import './App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Could not fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const togglePurchase = async (productId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/products/${productId}/toggle`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      // Opcjonalnie - aktualizuj stan produktów po pomyślnej zmianie
      const updatedProduct = await response.json();
      setProducts(products.map(product => 
        product._id === productId ? updatedProduct : product
      ));
    } catch (error) {
      console.error('Failed to toggle product', error);
    }
  };
  
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/products/${productId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };
  
  const addProduct = async (newProductData) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProductData)
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
    } catch (error) {
      console.error('Failed to add product', error);
    }
  };

  const editProduct = async (productId, updatedProductData) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProductData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const updatedProduct = await response.json();
      setProducts(products.map(product => product._id === productId ? { ...product, ...updatedProduct } : product));
    } catch (error) {
      console.error('Failed to edit product', error);
    }
  };
  

  const ProductListWithFunctions = () => (
    <ProductList products={products} togglePurchase={togglePurchase} deleteProduct={deleteProduct} />
  );

  const EditProductFormWithFunctions = (props) => (
    <EditProductForm {...props} editProduct={editProduct} />
  );

  const AddProductFormWithFunctions = (props) => (
    <AddProductForm {...props} addProduct={addProduct} />
  );

  return (
    <Router>
      <div className="App">
      <Header /> {Header}
        <Routes>
          <Route path="/" element={<ProductListWithFunctions />} />
          <Route path="/add" element={<AddProductFormWithFunctions />} />
          <Route path="/edit/:productId" element={<EditProductFormWithFunctions />} />
        </Routes>
        <Footer /> {Footer}
      </div>
    </Router>
  );
}

export default App;
