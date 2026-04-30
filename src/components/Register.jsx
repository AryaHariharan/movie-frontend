import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const register = async () => {
    try {
      await API.post("/auth/register", user);
      alert("Registered Successfully");
      navigate("/");
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="container">
      <h2>📝 Register</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button onClick={register}>Register</button>

      <span className="link" onClick={() => navigate("/")}>
        Already have account? Login
      </span>
    </div>
  );
}

export default Register;