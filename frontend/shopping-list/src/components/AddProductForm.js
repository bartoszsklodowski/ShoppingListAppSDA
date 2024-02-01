import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AddProductForm({ addProduct }) {
  let navigate = useNavigate();
  const [productData, setProductData] = useState({ name: '', quantity: '', purchased: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(productData);
    navigate('/');
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Dodaj Produkt</h2>
        <input
          type="text"
          value={productData.name}
          onChange={e => setProductData({ ...productData, name: e.target.value })}
          placeholder="Nazwa produktu"
        />
        <input
          type="text"
          value={productData.quantity}
          onChange={e => setProductData({ ...productData, quantity: e.target.value })}
          placeholder="Ilość"
        />
        <button type="submit">Dodaj</button>
      </form>
      <Link to="/">
        <button>Strona główna</button>
      </Link>
    </div>
  );
}

export default AddProductForm;