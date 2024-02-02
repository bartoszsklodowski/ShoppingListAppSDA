import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate  } from 'react-router-dom';

function EditProductForm({ editProduct }) {
  let navigate = useNavigate();
  let { productId } = useParams();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchased, setPurchased] = useState(false);

  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/products/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setName(data.name);
        setQuantity(data.quantity);
        setPurchased(data.purchased);
      } catch (error) {
        console.error("Could not fetch product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!productId) {
    return <div>Ładowanie danych produktu...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    editProduct(productId, { name, quantity, purchased });
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="edit-container">
      <h2>Edytuj Produkt</h2>
      <div className="product-edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nazwa Produktu:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="quantity">Ilość:</label>
        <input
          type="text"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <label htmlFor="purchased">Kupiono:</label>
        <input
          type="checkbox"
          id="purchased"
          checked={purchased}
          onChange={(e) => setPurchased(e.target.checked)}
        />

        <button type="submit">Zapisz Zmiany</button>
      </form>
      </div>
      <Link to="/">
        <button>Strona główna</button>
      </Link>
    </div>
  );
}

export default EditProductForm;
