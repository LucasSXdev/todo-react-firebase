import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Admin from "../pages/Admin";
import Private from "./private";



const routes = createBrowserRouter([
    {
        path:'/',
        element:<SignIn/>
    },
    {
        path:'/signup',
        element:<SignUp/>
    },
    {
        path:'/admin',
        element:<Private><Admin/></Private>
    }
])

export default routes