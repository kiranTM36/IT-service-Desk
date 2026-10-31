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

    if (role === "Employee" && pathname !== "/my-ticket") {
        return <Navigate to="/my-ticket" replace />
    }

    return <Outlet />
}

export default ProtectRoute