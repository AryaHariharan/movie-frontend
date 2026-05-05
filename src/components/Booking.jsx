import React, { useState } from "react";
import API from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const movieId = location.state?.movieId;

  const [booking, setBooking] = useState({
    userId: "",
    movieId: movieId || "",
    seats: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
    setError(""); // clear error while typing
  };

  const bookTicket = async () => {
    // 🔴 VALIDATION
    if (!booking.userId.trim()) {
      setError("Please enter User ID");
      return;
    }

    if (!booking.movieId) {
      setError("Movie not selected");
      return;
    }

    if (!booking.seats || booking.seats <= 0) {
      setError("Enter valid number of seats");
      return;
    }

    try {
      await API.post("/booking", booking);
      alert("🎉 Booking Successful!");
      navigate("/movies");
    } catch (err) {
      setError("❌ Booking Failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>🎟 Book Ticket</h2>

        {/* Error Message */}
        {error && <p style={styles.error}>{error}</p>}

        <input
          type="text"
          name="userId"
          placeholder="Enter User ID"
          value={booking.userId}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="movieId"
          value={booking.movieId}
          readOnly
          style={styles.input}
        />

        <input
          type="number"
          name="seats"
          placeholder="Number of Seats"
          value={booking.seats}
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={bookTicket} style={styles.primaryBtn}>
          Confirm Booking
        </button>

        <button onClick={() => navigate("/movies")} style={styles.secondaryBtn}>
          Back
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    background: "linear-gradient(to right, #141e30, #243b55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  card: {
    width: "350px",
    padding: "30px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    textAlign: "center"
  },

  input: {
    width: "90%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },

  primaryBtn: {
    width: "95%",
    padding: "10px",
    background: "#ff4b2b",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  secondaryBtn: {
    width: "95%",
    padding: "10px",
    background: "gray",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px"
  },

  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px"
  }
};

export default Booking;