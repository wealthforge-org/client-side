import Landing from "../Pages/Landing/Landing";

import LandingWrapper from "../Wrappers/LandingWrapper";


export const routes = [
    { 
        path: "/", 
        element: 
            <LandingWrapper>
                <Landing />
            </LandingWrapper>
    }
]