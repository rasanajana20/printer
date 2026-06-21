import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./receipt.css";

function MiniReceipt() {
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("");
  const [utp, setUtp] = useState("");
  const [items, setItems] = useState([]);
  const [productList, setProductList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedProducts =
      JSON.parse(localStorage.getItem("productList")) || [];
    setProductList(savedProducts);
  }, []);

  const handleSelectItem = (selectedName) => {
    const selected = productList.find((p) => p.name === selectedName);

    if (selected) {
      setItem(selected.name);
      setUtp(selected.unitPrice);
    }
  };

  const addItem = () => {
    if (!item || !qty || !utp) {
      alert("Please fill all fields!");
      return;
    }

    const newItem = {
      item,
      qty: Number(qty),
      utp: Number(utp),
      price: Number(qty) * Number(utp),
    };

    if (editIndex !== null) {
      const updated = [...items];
      updated[editIndex] = newItem;
      setItems(updated);
      setEditIndex(null);
    } else {
      setItems([...items, newItem]);
    }

    setItem("");
    setQty("");
    setUtp("");
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const editItem = (index) => {
    const selected = items[index];
    setItem(selected.item);
    setQty(selected.qty);
    setUtp(selected.utp);
    setEditIndex(index);
  };

  const clearTable = () => setItems([]);

  const getTotal = () =>
    items.reduce((total, i) => total + i.price, 0).toFixed(2);

  return (
    <div className="receipt-container">
      <div className="receipt">
        <h2>Mr Delivery</h2>

        {items.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          items.map((i, index) => (
            <div key={index}>
              <p><b>{index + 1}. {i.item}</b></p>
              <p>Quantity {i.qty} | UnitPrice {i.utp} | Price {i.price}</p>

              <button onClick={() => editItem(index)}>Edit</button>
              <button onClick={() => deleteItem(index)}>Delete</button>
            </div>
          ))
        )}

        <h3>Total: Rs {getTotal()}</h3>
      </div>

      <div>
        <select value={item} onChange={(e) => handleSelectItem(e.target.value)}>
          <option value="">Select Item</option>
          {productList.map((p, index) => (
            <option key={index} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Qty"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />

        <input type="number" value={utp} readOnly />

        <input
          type="number"
          value={qty && utp ? Number(qty) * Number(utp) : ""}
          readOnly
        />

        <button onClick={addItem}>
          {editIndex !== null ? "Update" : "Add"}
        </button>

        <button onClick={clearTable}>Clear</button>
        <button onClick={() => window.print()}>Print</button>

        <br />
        <Link to="/items">Manage Items</Link>
      </div>
    </div>
  );
}

export default MiniReceipt;