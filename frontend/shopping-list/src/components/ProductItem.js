import React from 'react';
import { Link } from 'react-router-dom';

function ProductItem({ product, deleteProduct, togglePurchase }) {
  return (
    <div className="product-item">
      <span>{product.name}</span> - <span>Ilość: {product.quantity}</span>
      <div>
        <button onClick={() => togglePurchase(product._id)}>
          {product.purchased ? 'Kupione' : 'Niekupione'}
        </button>
        <button onClick={() => deleteProduct(product._id)}>Usuń</button>
        <Link to={`/edit/${product._id}`}>Edytuj</Link>
      </div>
    </div>
  );
}

export default ProductItem;
