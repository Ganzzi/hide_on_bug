import { Navigate, createBrowserRouter } from "react-router-dom";
import { Login, NotFound, Signup, Users, UserForm, Home, History, WatchList, Profile, Subcribed } from "./components";
import { Dashboard, GuestPage, HomePage } from "./pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestPage />,
        children: [
            {
                path: "/",
                element: <Navigate to={"/login"} />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "/",
        element: <HomePage />,
        children: [
            {
                path: "/home",
                element: <Home/>,
            },
            {
                path: "/history",
                element: <History/>,
            },
            {
                path: "/watchList",
                element: <WatchList/>,
            },
            {
                path: "/profile",
                element: <Profile/>,
            },
            {
                path: "/subcribed",
                element: <Subcribed/>,
            },
            {
                path: "/video/:videoId",
                element: <>ocho</>,
            },
        ],
    },
    {
        path: "/admin",
        element: <Dashboard />,
        children: [
            {
                path: "/admin",
                element: <Navigate to={"/admin/users"} />,
            },
            {
                path: "/admin/users",
                element: <Users />,
            },
            {
                path: "/admin/users/new",
                element: <UserForm key={"userCreate"} />,
            },
            {
                path: "/admin/users/:id",
                element: <UserForm key={"userUpdate"} />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
