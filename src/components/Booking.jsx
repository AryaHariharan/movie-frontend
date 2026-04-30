import React, { useState } from "react";
import API from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get movieId from previous page
  const movieId = location.state?.movieId;

  const [booking, setBooking] = useState({
    userId: "",
    movieId: movieId || "",
    seats: ""
  });

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const bookTicket = async () => {
    try {
      await API.post("/booking", booking);
      alert("🎉 Booking Successful!");
      navigate("/movies");
    } catch (err) {
      alert("❌ Booking Failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "30px",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          textAlign: "center"
        }}
      >
        <h2>🎟 Book Ticket</h2>

        <input
          type="text"
          name="userId"
          placeholder="Enter User ID"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="movieId"
          value={booking.movieId}
          readOnly
          style={inputStyle}
        />

        <input
          type="number"
          name="seats"
          placeholder="Number of Seats"
          onChange={handleChange}
          style={inputStyle}
        />

        <button onClick={bookTicket} style={buttonStyle}>
          Confirm Booking
        </button>

        <button
          onClick={() => navigate("/movies")}
          style={{ ...buttonStyle, background: "gray", marginTop: "10px" }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

// Styles
const inputStyle = {
  width: "90%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  width: "95%",
  padding: "10px",
  background: "#ff4b2b",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default Booking;