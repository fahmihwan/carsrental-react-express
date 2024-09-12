import { createBrowserRouter, Route, Routes, useRoutes } from "react-router-dom";
// import Home from "../view/home/Home";
import ListForRent from "../view/home/ListForRent";
import DetailForRent from "../view/home/DetailForRent";
import Profile from "../view/profile/Profile";
// import Login from "../view/profile/Login";
import ListCarProfile from "../view/profile/ListCarProfile";
import Summary from "../view/home/Summary";
import { ProtectedRoute, ProtectedRouteisNotAuth } from "./ProtectedRoute";
import { lazy, Suspense } from "react";
// import ProtectedRoute from "./ProtectedRoute";

// Lazy load komponen
const Home = lazy(() => import("../view/home/Home"));
const Login = lazy(() => import("../view/profile/Login"));

const routes = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRouteisNotAuth element={<Login />} />
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
    }
])

export default routes