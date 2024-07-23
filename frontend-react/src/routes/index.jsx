import { Route, Routes } from "react-router-dom";
import Home from "../view/home/Home";
import ListForRent from "../view/home/ListForRent";
import DetailForRent from "../view/home/DetailForRent";
import Profile from "../view/profile/Profile";
import Login from "../view/profile/Login";
import ListCarProfile from "../view/profile/ListCarProfile";

export default function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/listcar" element={<ListForRent />} />
            <Route path="/listcar/:id/detailforrent" element={<DetailForRent />} />
            <Route path="/home/profile" element={<Profile />} />
            <Route path="/home/listcar" element={<ListCarProfile />} />
        </Routes>
    )
}