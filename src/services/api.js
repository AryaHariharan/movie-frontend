import axios from "axios";

const API = axios.create({
  baseURL: "https://bookmyshow-l6oi.onrender.com"
});

// ✅ Attach JWT token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ✅ API functions (clean usage)
export const getMovies = () => API.get("/movies");

export const loginUser = (data) => API.post("/auth/login", data);

export const registerUser = (data) => API.post("/auth/register", data);

export const bookMovie = (data) => API.post("/booking", data);

export default API; // 👈 keep this (important)