import { Navigate, createBrowserRouter } from "react-router-dom";
import { Login, NotFound, Signup, Users, UserForm } from "./components";
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
                element: <>noneeee</>,
            },
            {
                path: "/history",
                element: <>his</>,
            },
            {
                path: "/watchList",
                element: <>WL</>,
            },
            {
                path: "/profile",
                element: <>prof</>,
            },
            {
                path: "/subcribed",
                element: <>sub</>,
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
