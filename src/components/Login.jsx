import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", user);
      localStorage.setItem("token", res.data);
      navigate("/movies");
    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="container">
      <h2>🎬 Movie Booking Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button onClick={login}>Login</button>

      <span className="link" onClick={() => navigate("/register")}>
        New user? Register here
      </span>
    </div>
  );
}

export default Login;