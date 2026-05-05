import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    // 🔴 VALIDATION
    if (!user.username.trim() || !user.password.trim()) {
      setError("Please enter valid username and password");
      return;
    }

    try {
      const res = await API.post("/auth/login", user);
      localStorage.setItem("token", res.data);
      navigate("/movies");
    } catch (err) {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="container">
      <h2>🎬 Movie Booking Login</h2>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Username"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
          setError(""); // clear error while typing
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
          setError("");
        }}
      />

      <button onClick={login}>Login</button>

      <span className="link" onClick={() => navigate("/register")}>
        New user? Register here
      </span>
    </div>
  );
}

export default Login;