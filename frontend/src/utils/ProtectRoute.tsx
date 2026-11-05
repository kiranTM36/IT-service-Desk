import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface PrivateProps {
    isAuthenticated: boolean
    role?: string
}

const ProtectRoute = ({ isAuthenticated, role }: PrivateProps) => {

    const { pathname } = useLocation()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    const allowedRoutes = [
        "/my-ticket",
        "/edit/",
        "/ticket/",
        "/create"
    ]
    if (role === "Employee" && 
        !allowedRoutes.some(route => route.endsWith('/') ? pathname.startsWith(route) : pathname === route)
    ) {
        return <Navigate to="/my-ticket" replace />
    }

    return <Outlet />
}

export default ProtectRoute