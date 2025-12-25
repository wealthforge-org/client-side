import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function useAuthRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get cookie
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("isSignedIn="));

    const isSignedIn = cookie?.split("=")[1] === "true";

    // Public pages WITHOUT requiring login
    const publicRoutes = ["/", "/login", "/sign-up"];

    // Prevent redirect loop
    if (!isSignedIn && !publicRoutes.includes(location.pathname)) {
      console.log("Redirecting: user not signed in");
      navigate("/login");
    }
  }, [location.pathname, navigate]);
}
