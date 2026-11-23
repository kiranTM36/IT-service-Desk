import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidenav from './components/Sidenav'

const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAF8FF]">
        <Navbar />

        <div className='mt-14 min-h-[calc(100vh-3.5rem)] grid grid-cols-1 md:grid-cols-[13rem_minmax(0,1fr)]'>
            <aside className="md:sticky md:top-14 md:h-[calc(100vh-3.5rem)]">
              <Sidenav />
            </aside>

            <main className='min-w-0 px-4 py-4 sm:px-6 lg:px-8 bg-[#FAF8FF]'>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default Home
