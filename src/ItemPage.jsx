import React, { useEffect, useState } from "react";
import "./ItemPage.css";
import { useNavigate } from "react-router-dom";

function ItemsPage() {
  const [name, setName] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("productList")) || [];
    setProducts(saved);
  }, []);

  const addProduct = () => {
    if (!name || !unitPrice) {
      alert("Fill all fields");
      return;
    }

    const newProduct = {
      name,
      unitPrice: Number(unitPrice),
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("productList", JSON.stringify(updatedProducts));

    setName("");
    setUnitPrice("");
  };

  const deleteProduct = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
    localStorage.setItem("productList", JSON.stringify(updated));
  };

  return (
    <div className="page-container">
      <h2 className="title">Manage Products</h2>

      <input
        className="input-box"
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="input-box"
        type="number"
        placeholder="Unit Price"
        value={unitPrice}
        onChange={(e) => setUnitPrice(e.target.value)}
      />

      <button className="btn add-btn" onClick={addProduct}>
        Add Product
      </button>

      <button className="btn link-btn" onClick={() => navigate("/")}>
        Receipt Page
      </button>

      {products.map((p, index) => (
        <div className="product-card" key={index}>
          <span>
            {p.name} - Rs {p.unitPrice}
          </span>
          <button
            className="btn delete-btn"
            onClick={() => deleteProduct(index)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ItemsPage;
