import { Navigate, createBrowserRouter } from "react-router-dom";
import {
    Login,
    NotFound,
    Signup,
    Users,
    UserForm,
    Home,
    History,
    WatchList,
    Profile,
    Subcribed,
    Providers,
    ProviderForm,
    FilmForm,
    Filmss,
    Video,
} from "./components";
import { Dashboard, GuestPage, HomePage } from "./pages";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

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
                element: <Home />,
            },
            {
                path: "/history",
                element: <History />,
            },
            {
                path: "/watchList/:watchlistId",
                element: <WatchList />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/subcribed/:providerId",
                element: <Subcribed />,
            },
            {
                path: "/video/:videoId",
                element: <Video />,
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
                path: "/admin/users/:userId",
                element: <UserForm key={"userUpdate"} />,
            },
            {
                path: "/admin/providers",
                element: <Providers />,
            },
            {
                path: "/admin/providers/new",
                element: <ProviderForm key={"providerCreate"} />,
            },
            {
                path: "/admin/providers/:providerId",
                element: <ProviderForm key={"providerUpdate"} />,
            },
            {
                path: "/admin/providers/:providerId/films",
                element: <Filmss />,
            },
            {
                path: "/admin/providers/:providerId/films/new",
                element: <FilmForm key={"filmCreate"} />,
            },
            {
                path: "/admin/providers/:providerId/films/:filmId",
                element: <FilmForm key={"filmCreate"} />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
