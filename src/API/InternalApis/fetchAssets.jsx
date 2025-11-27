import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const fetchAssets = async (user_id) => {
    let response = [];
    try {
        const result = await axios.post(`http://localhost:80/wealthforge/server-side/server-side/controller/getHoldings.php`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                user_id: user_id,
            }
        );
        response = result.data;
        console.log(response)
        return response;
    } catch (error) {
        console.error('Error during signup:', error);
        return response;
    }
}