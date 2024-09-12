import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"


export const ProtectedRoute = ({ element }) => {
    const user = useSelector((state) => state.user.isAuthenticated)

    return user ? element : <Navigate to="/" />
}

export const ProtectedRouteisNotAuth = ({ element }) => {
    const user = useSelector((state) => state.user.isAuthenticated)

    return !user ? element : <Navigate to="/home" />
}