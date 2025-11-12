export const loginUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:8000/index.php?route=/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 👈 VERY IMPORTANT
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok || data.status === "error") {
      throw new Error(data.message || "Invalid email or password.");
    }

    return data;
  } catch (err) {
    throw new Error(err.message || "Failed to login.");
  }
};
