import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './Home'
import Ticket from './pages/Ticket'


const App = () => {
  return (
    <BrowserRouter>
    
      <Routes>

        <Route path='/' element={<Home />} >
          <Route path='/ticket' element={<Ticket />} />
        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App