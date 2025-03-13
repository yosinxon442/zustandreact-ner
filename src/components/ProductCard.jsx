import { useState } from "react";
import useStore from "../context/useStore";
import { FaHeart, FaRegHeart, FaEdit, FaTrash, FaShoppingCart, FaSave } from "react-icons/fa"; // Ikonlar qo'shildi
import "../styles/productCard.css";

const ProductCard = ({ product, isLoggedIn }) => {
  const { deleteProduct, editProduct, toggleFavorite, favorites } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(product?.title || ""); 
  const [newPrice, setNewPrice] = useState(product?.price || "");

  if (!product) {
    return <p className="error-message"> Xatolik: mahsulot yuklanmadi</p>;
  }

  const handleEdit = () => {
    editProduct(product.id, newName, newPrice);
    setIsEditing(false);
  };

  return (
    <div className="product-card">
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Mahsulot nomi"
          />
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            placeholder="Narx"
          />
          <button className="save-btn" onClick={handleEdit}>
            <FaSave /> Saqlash
          </button>
        </div>
      ) : (
        <div className="product-info">
          <h3>{product.title}</h3>
          <p className="price">{product.price} so‘m</p>
          <div className="actions">
            <button className="like-btn" onClick={() => toggleFavorite(product)}>
              {favorites.some((item) => item.id === product.id) ? <FaHeart className="liked" /> : <FaRegHeart />} Like
            </button>
            <button className="buy-btn">
              <FaShoppingCart /> Sotib olish
            </button>
          </div>
        </div>
      )}

      {isLoggedIn && (
        <div className="admin-actions">
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            <FaEdit /> Tahrirlash
          </button>
          <button className="delete-btn" onClick={() => deleteProduct(product.id)}>
            <FaTrash /> O‘chirish
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
