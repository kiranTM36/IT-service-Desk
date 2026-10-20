import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidenav from './components/Sidenav'

const Home = () => {
  return (
    <div>
        <Navbar />

        <div className='mt-[7vh] h-[93vh] grid grid-cols-[20%_80%]'>
            <Sidenav />

            <div className='px-8 py-4 bg-[#FAF8FF] h-full overflow-x-hidden overflow-y-auto'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Home