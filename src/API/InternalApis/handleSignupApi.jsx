import axios from 'axios';

export const handleSignup = async (name, email, password) => {
  try {
    const response = await axios.post(
      'http://localhost/wealthforge/server-side/index.php?route=/Register',
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
