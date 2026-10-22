import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './Home'
import Ticket from './pages/Ticket'
import Auth from './auth/Auth'
import Login from './auth/Login'
import Signup from './auth/Signup'
import User from './pages/User'
import Create from './ticket/Create'


const App = () => {
  return (
    <BrowserRouter>
    
      <Routes>

        <Route path='/' element={<Home />} >
          <Route path='/ticket' element={<Ticket />} />
          <Route path='/create' element={<Create />} />
          <Route path='/user' element={<User />} />
        </Route>

        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App