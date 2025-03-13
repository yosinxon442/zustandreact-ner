import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaBox, FaDollarSign } from "react-icons/fa";
import useStore from "../context/useStore";
import "../styles/addProduct.css";

const AddProduct = () => {
  const { addProduct } = useStore();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price) {
      alert("⚠️ Barcha maydonlarni to‘ldiring!");
      return;
    }

    const newProduct = {
      id: Date.now(),
      title,
      price: parseFloat(price),
    };

    addProduct(newProduct);
    navigate("/");
  };

  return (
    <div className="add-product-page">
      <div className="form-container">
        <h2>
          <FaPlusCircle /> Yangi mahsulot qo‘shish
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaBox className="input-icon" />
            <input
              type="text"
              placeholder="Mahsulot nomi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaDollarSign className="input-icon" />
            <input
              type="number"
              placeholder="Narx"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <button type="submit" className="add-btn">
            <FaPlusCircle /> Qo‘shish
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
