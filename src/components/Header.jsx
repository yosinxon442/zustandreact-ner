import { useNavigate } from "react-router-dom";
import useStore from "../context/useStore";
import { FaUser, FaSignOutAlt, FaHeart, FaShoppingCart, FaPlus } from "react-icons/fa";
import "../styles/header.css";

const Header = () => {
  const { user, logoutUser, favorites, cart } = useStore();
  const navigate = useNavigate();

  return (
    <header className="header">
      <h2 onClick={() => navigate("/")}>home</h2>
      <nav>
        <button className="favorite-btn" onClick={() => navigate("/favorites")}>
          <FaHeart /> Yoqanlar {favorites.length}
        </button>
        <button className="cart-btn" onClick={() => navigate("/cart")}>
          <FaShoppingCart /> Savatcha {cart.length}
        </button>

        {user ? (
          <>
            <button onClick={() => navigate("/add-product")}>
              <FaPlus /> Mahsulot qo‘shish
            </button>

            <span onClick={() => navigate("/profile")}>
              <FaUser /> {user?.username}
            </span>

            <button onClick={() => {
              logoutUser();
              navigate("/");
            }}>
              <FaSignOutAlt /> Chiqish
            </button>
          </>
        ) : (
          <button onClick={() => navigate("/login")}>
            <FaUser /> Kirish
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
