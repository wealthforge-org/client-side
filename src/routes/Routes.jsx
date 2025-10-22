import Landing from "../Pages/Landing/Landing";

import LandingWrapper from "../Wrappers/LandingWrapper";
import CryptoList from "../Pages/CrypoList/CryptoList";
import CryptoDetail from "../Pages/CryptoDetail/CryptoDetail";

import Login from "../Pages/Auth/Login/Login";
import SignUp from "../Pages/Auth/Sign-Up/SignUp";
import Profile from "../Pages/Auth/Profile/Profile";

import NotFound from "../Pages/NotFound";


export const routes = [
    { 
        path: "/", 
        element: 
            <LandingWrapper>
                <Landing />
            </LandingWrapper>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/sign-up",
        element: <SignUp/>
    },
    {
        path: "/*",
        element: <NotFound/>
    },
    {
        path: "/market",
        element: 
        <LandingWrapper>
            <CryptoList/>
        </LandingWrapper>
    },
    {
        path: "/crypto/:id",
        element: 
        <LandingWrapper>
            <CryptoDetail/>
        </LandingWrapper>
    },
    {
        path: "/profile",
        element: 
          <LandingWrapper>
            <Profile/>
          </LandingWrapper>

    }
]