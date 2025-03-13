import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useStore from "../context/useStore";
import "../styles/favorites.css";

const Favorites = () => {
  const { favorites, toggleFavorite } = useStore();

  return (
    <div className="favorites-page">
      <h2><FaHeart className="heart-icon" /> Sevimli mahsulotlar</h2>

      {favorites.length > 0 ? (
        <div className="favorites-container">
          {favorites.map((item) => (
            <div key={item.id} className="favorite-item">
              <h3>{item.title}</h3>
              <p className="favorite-price">{item.price.toLocaleString()} so‘m</p>
              <button className="unlike-btn" onClick={() => toggleFavorite(item)}>
                <FaRegHeart /> O‘chirish
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-favorites">
          <FaRegHeart className="empty-icon" /> Hozircha hech narsa yo‘q.
        </p>
      )}
    </div>
  );
};

export default Favorites;
