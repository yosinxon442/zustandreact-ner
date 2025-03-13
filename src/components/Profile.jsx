import useStore from "../context/useStore";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "../styles/profile.css";

const Profile = () => {
  const { user, logoutUser } = useStore();

  if (!user) {
    return (
      <div className="profile-page">
        <p className="error-message">⚠️ Foydalanuvchi topilmadi. Iltimos, login qiling.</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <FaUserCircle className="profile-icon" />
          <h1>{user.username}</h1>
          <p className="user-email">📧 {user.email || "Email kiritilmagan"}</p>
        </div>

        <div className="profile-actions">
          <button className="logout-btn" onClick={logoutUser}>
            <FaSignOutAlt /> Chiqish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
