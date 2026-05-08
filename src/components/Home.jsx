import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.7)",
          padding: "50px",
          borderRadius: "15px",
          textAlign: "center",
          color: "white",
          width: "500px",
        }}
      >
        <h1 style={{ fontSize: "50px", marginBottom: "10px" }}>
          🎬 Movie Booking
        </h1>

        <p style={{ fontSize: "18px", marginBottom: "30px" }}>
          Book your favorite movies online easily
        </p>

        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "12px 30px",
            marginRight: "10px",
            border: "none",
            borderRadius: "5px",
            background: "red",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          style={{
            padding: "12px 30px",
            border: "none",
            borderRadius: "5px",
            background: "white",
            color: "black",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Home;