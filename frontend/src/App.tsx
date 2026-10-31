import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Login from './auth/Login'
import Signup from './auth/Signup'
import User from './pages/User'
import Create from './ticket/Create'
import AllTicket from './ticket/AllTicket'
import MyTicket from './ticket/MyTicket'
import SingleTicket from './pages/SingleTicket'
import Team from './pages/Team'
import TeamForm from './team/TeamForm'
import EditTicket from './ticket/EditTicket'
import { useSelector } from 'react-redux'
import type { RootState } from './store/store'
import ProtectRoute from './utils/ProtectRoute'

const App = () => {

    const { user } = useSelector((state: RootState) => state.user);

    const isAuthenticated = !!user;
    const role = user?.name;


    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route element={<ProtectRoute isAuthenticated={isAuthenticated} role={role} />}>
                    <Route path="/" element={<Home />}>

                        <Route path="tickets" element={<AllTicket />} />
                        <Route path="my-ticket" element={<MyTicket />} />
                        <Route path="create" element={<Create />} />
                        <Route path="user" element={<User />} />
                        <Route path="ticket/:id" element={<SingleTicket />} />
                        <Route path="team" element={<Team />} />
                        <Route path="teamForm" element={<TeamForm />} />
                        <Route path="edit/:id" element={<EditTicket />} />

                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default App