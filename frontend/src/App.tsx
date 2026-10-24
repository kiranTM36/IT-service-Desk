import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './Home'
import Ticket from './pages/Ticket'
import Auth from './auth/Auth'
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


const App = () => {
  return (
    <BrowserRouter>
    
      <Routes>

        <Route path='/' element={<Home />} >
          <Route path='/tickets' element={<AllTicket />} />
          <Route path='/my-ticket' element={<MyTicket />} />
          <Route path='/create' element={<Create />} />
          <Route path='/user' element={<User />} />
          <Route path='/ticket/:id' element={<SingleTicket />} />
          <Route path='/team' element={<Team />} />
          <Route path='/teamForm' element={<TeamForm />} />
          <Route path='/edit/:id' element={<EditTicket/>} />
        </Route>

        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App