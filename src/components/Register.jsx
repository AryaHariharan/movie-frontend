import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState(""); // for showing message
  const navigate = useNavigate();

  const register = async () => {
    // 🔴 VALIDATION
    if (!user.username.trim() || !user.password.trim()) {
      setError("Please enter username and password");
      return;
    }

    try {
      await API.post("/auth/register", user);
      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="container">
      <h2>📝 Register</h2>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Username"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
          setError(""); // clear error when typing
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

      <button onClick={register}>Register</button>

      <span className="link" onClick={() => navigate("/")}>
        Already have account? Login
      </span>
    </div>
  );
}

export default Register;