import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Movies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.page}>
      {/* Title */}
      <h1 style={styles.title}>🎬 Available Movies</h1>

      {/* Movies */}
      <div style={styles.grid}>
        {movies.map((movie) => (
          <div key={movie.id} style={styles.card}>
            <h2 style={styles.movieTitle}>{movie.title}</h2>
            <p style={styles.text}>
              <b>Genre:</b> {movie.genre}
            </p>
            <p style={styles.text}>
              <b>Language:</b> {movie.language}
            </p>
            <p style={styles.text}>
              <b>Duration:</b> {movie.duration} mins
            </p>

            <button
              style={styles.bookBtn}
              onClick={() =>
                navigate("/booking", { state: { movieId: movie.id } })
              }
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Logout button at bottom */}
      <button style={styles.logoutBtn} onClick={logout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #000428, #004e92)",
    padding: "30px",
    textAlign: "center",
  },

  title: {
    color: "white",
    marginBottom: "30px",
    fontSize: "40px",
    fontWeight: "bold",
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
  },

  card: {
    width: "250px",
    background: "white",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
  },

  movieTitle: {
    color: "black",
    marginBottom: "15px",
  },

  text: {
    color: "black",
    fontSize: "16px",
    margin: "8px 0",
  },

  bookBtn: {
    marginTop: "15px",
    width: "100%",
    padding: "12px",
    background: "#ff4b2b",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },

  logoutBtn: {
    marginTop: "40px",
    padding: "12px 30px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default Movies;