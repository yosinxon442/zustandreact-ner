import React from "react";
import useStore from "../store/useStore";

const Profile = () => {
  const user = useStore((state) => state.user);
  const logoutUser = useStore((state) => state.logoutUser);

  return (
    <div>
      <h1>Profil</h1>
      {user ? (
        <>
          <p>Foydalanuvchi: {user.username}</p>
          <p>Email: {user.email}</p>
          <button onClick={logoutUser}>Chiqish</button>
        </>
      ) : (
        <h2>Profilga kirish uchun tizimga kiring</h2>
      )}
    </div>
  );
};

export default Profile;
