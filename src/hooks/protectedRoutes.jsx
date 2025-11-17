import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function useAuthRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // const isSignedIn = localStorage.getItem("isSignedIn"); // Uncomment this line to use actual sign-in status
    const isSignedIn = true; // Temporary hardcoded value for testing


    const publicRoutes = ["/login", "/signup", "/"];
    

    if ((isSignedIn === false || !isSignedIn) && !publicRoutes.includes(location.pathname)) {
      console.log("User Not Signed in")
      navigate("/"); 
    }
  }, [location.pathname, navigate]);
}
