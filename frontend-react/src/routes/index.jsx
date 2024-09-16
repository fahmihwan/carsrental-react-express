import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
// import Home from "../view/home/Home";
// import ListForRent from "../view/home/ListForRent";
// import DetailForRent from "../view/home/DetailForRent";
// import Profile from "../view/profile/Profile";
// import ListCarProfile from "../view/profile/ListCarProfile";
// import Summary from "../view/home/Summary";
import { ProtectedRoute, ProtectedRouteisNotAuth } from "./ProtectedRoute";
// Lazy load the components


// import ListTransactionHistory from "../view/profile/ListTransactionHistory";
const ListTransactionHistory = lazy(() => import('../view/profile/ListTransactionHistory'))
// import ProtectedRoute from "./ProtectedRoute";


// Lazy load komponen
const Home = lazy(() => import("../view/home/Home"));
const Login = lazy(() => import("../view/profile/Login"));
const Registrasi = lazy(() => import("../view/profile/Registrasi"))
const ListForRent = lazy(() => import("../view/home/ListForRent"));
const DetailForRent = lazy(() => import("../view/home/DetailForRent"));
const Profile = lazy(() => import("../view/profile/Profile"));
const ListCarProfile = lazy(() => import("../view/profile/ListCarProfile"));
const Summary = lazy(() => import("../view/home/Summary"));

const routes = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRouteisNotAuth element={<Login />} />
    },
    {
        path: "/registrasi",
        element: <ProtectedRouteisNotAuth element={<Registrasi />} />
    },
    {
        path: "/home",
        element: <ProtectedRoute element={<Home />} />,
    },
    {
        path: "/listcar",
        element: <ProtectedRoute element={<ListForRent />} />,
    },
    {
        path: "/listcar/:id/detailforrent",
        element: <ProtectedRoute element={<DetailForRent />} />
    },
    {
        path: "/listcar/summary",
        element: <ProtectedRoute element={<Summary />} />
    },
    {
        path: '/home/profile',
        element: <ProtectedRoute element={<Profile />} />
    },
    {
        path: "/home/listcar",
        element: <ProtectedRoute element={<ListCarProfile />} />
    },
    {
        path: "/home/listtransactionhistory",
        element: <ProtectedRoute element={<ListTransactionHistory />} />
    }
])

export default routes