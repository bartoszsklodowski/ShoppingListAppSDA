import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductList.css';


function ProductList({ products, togglePurchase, deleteProduct }) {
  return (
    <div className="products-container">
      <h2>Lista Produktów</h2>
      {products.map(product => (
        <div key={product._id} className="product-item">
          <span>{product.name}</span>
          <span>Ilość: {product.quantity}</span>
          <div>
            <button onClick={() => togglePurchase(product._id)}>
              {product.purchased ? 'Oznacz jako niekupione' : 'Oznacz jako kupione'}
            </button>
            <button onClick={() => deleteProduct(product._id)}>Usuń</button>
            <Link to={`/edit/${product._id}`}><button>Edytuj</button></Link>
          </div>
        </div>
      ))}
      <Link to={`/add`}><button>Dodaj produkt</button></Link>
    </div>
  );
}

export default ProductList;