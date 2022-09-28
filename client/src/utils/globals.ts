const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://petadoption-app.onrender.com";

export { BASE_URL };
