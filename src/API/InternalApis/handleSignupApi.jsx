import axios from 'axios';


const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const handleSignup = async (name, email, password) => {
  try {
    const response = await axios.post(
      `${backendUrl}?route=/Register`,
      { name, email, password }
    );

    if (response.data.status === 200) {
      console.log(response.data.payload);
      return true;
    } else {
      console.error('Signup failed:', response.data.payload);
      return false;
    }
  } catch (error) {
    console.error('Error during signup:', error);
    return false;
  }
};
