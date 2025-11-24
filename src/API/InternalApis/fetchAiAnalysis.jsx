import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const handleAiResponse = async (requestBody) => {
  try {
    const response = await axios.post(
      `${backendUrl}?route=/Ai_suggestions`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("AI request failed:", err);
    throw err;
  }
};
