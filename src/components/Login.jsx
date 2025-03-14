import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import useStore from "../context/useStore";
import "../styles/login.css";

const Login = () => {
  const { loginUser } = useStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }) => {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login yoki parol noto‘g‘ri!");
      }

      return response.json();
    },
    onSuccess: (data) => {
      loginUser(data, data.token);
      navigate("/profile");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Oldingi xatoliklarni tozalash
    loginMutation.mutate({ username, password });
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
        <button type="submit" className="login-btn" disabled={loginMutation.isLoading}>
          {loginMutation.isLoading ? "Yuklanmoqda..." : "Kirish"}
        </button>
      </form>
    </div>
  );
};

export default Login;
