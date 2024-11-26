import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // Base URL for API requests

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  async getHierarchy() {
    try {
      const response = await apiClient.get("/graph");
      return response.data;
    } catch (error) {
      console.error("Error fetching graph data:", error.response?.data || error.message);
      throw new Error("Failed to fetch graph hierarchy from the server.");
    }
  },
};
