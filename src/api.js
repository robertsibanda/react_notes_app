/** Base URL for the notes API. Falls back to localhost if env var is not set. */
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export default API_URL;
