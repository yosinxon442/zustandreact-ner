import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../context/useStore";
import { FaUser, FaLock } from "react-icons/fa";
import "../styles/login.css";

const Login = () => {
  const { loginUser } = useStore();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(username, password);
      navigate("/profile");
    } catch (err) {
      setError("Login yoki parol noto‘g‘ri!");
    }
  };

  return (
    <div className="login-container">
      <h2>Kirish</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            placeholder="Foydalanuvchi nomi"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Parol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">Kirish</button>
      </form>
    </div>
  );
};

export default Login;
