import { useEffect } from "react";
import useStore from "../context/useStore";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const { user, getCurrentUser, logoutUser } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (!user) {
    return <p>Iltimos, avval tizimga kiring!</p>;
  }

  return (
    <div className="profile-page">
      <h2>Profil</h2>
      <img src={user.image} alt={user.username} width="100" />
      <p><strong>Foydalanuvchi:</strong> {user.username}</p>
      <p><strong>Ism:</strong> {user.firstName}</p>
      <p><strong>Familiya:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Jinsi:</strong>{user.gender}</p>
      <button onClick={() => {
        logoutUser();
        navigate("/login");
      }}>
        Chiqish
      </button>
    </div>
  );
};

export default Profile;
