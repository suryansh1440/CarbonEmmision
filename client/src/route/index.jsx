import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyEmail from "../pages/VerifyEmail";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Profile";
import Calculate from "../pages/Calulate";
import Emmsion from "../pages/Emmsion";
import Performance from "../pages/Performance";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path:"/search",
                element:<SearchPage/>
            },
            {
                path:"/contact-us",
                element:<Contact/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/register",
                element:<Register/>
            },
            {
                path:"/emmsion/",
                element:<Emmsion/>
            },
            {
                path:"/calculate",
                element:<Calculate/>
            },
            {
                path:"/dashboard",
                element:<Dashboard/>,
                children:[
                    {
                        path:"profile",
                        element:<Profile/>
                    },
                    {
                        path:"Performance",
                        element:<Performance/>
                    }

                ]
            },  
        ],
    },
    {
        path:"/verify-email",
        element:<VerifyEmail/>
    },
    
]);

export default router;