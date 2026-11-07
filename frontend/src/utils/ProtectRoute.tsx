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
        "/create",
        "/profile"
    ]
    if (role === "Employee" && 
        !allowedRoutes.includes(pathname) && !pathname.startsWith('/edit/') && !pathname.startsWith("/ticket/")
    )
     {
        return <Navigate to="/my-ticket" replace />
    }

    return <Outlet />
}

export default ProtectRoute