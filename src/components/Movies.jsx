import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Movies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  // Fetch movies from backend
  useEffect(() => {
    API.get("/movies")
      .then((res) => setMovies(res.data))
      .catch(() => alert("Error fetching movies"));
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ color: "white" }}>🎬 Available Movies</h2>
        <button onClick={logout} style={{ padding: "8px 15px", background: "red", color: "white", border: "none", borderRadius: "5px" }}>
          Logout
        </button>
      </div>

      {/* Movies Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "20px"
        }}
      >
        {movies.length === 0 ? (
          <p style={{ color: "white" }}>No movies available</p>
        ) : (
          movies.map((m) => (
            <div
              key={m.id}
              style={{
                width: "220px",
                margin: "15px",
                padding: "15px",
                background: "white",
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                textAlign: "center"
              }}
            >
              <h3>{m.title}</h3>
              <p><b>Genre:</b> {m.genre}</p>
              <p><b>Language:</b> {m.language}</p>
              <p><b>Duration:</b> {m.duration} min</p>

              <button
                onClick={() =>
                  navigate("/booking", { state: { movieId: m.id } })
                }
                style={{
                  marginTop: "10px",
                  padding: "8px",
                  background: "#ff4b2b",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Book Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Movies;