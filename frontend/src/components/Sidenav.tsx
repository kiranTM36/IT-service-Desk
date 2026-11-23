import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import type { RootState } from "../store/store"

const Sidenav = () => {

  const { user } = useSelector((state: RootState) => state.user)
  return (
    <nav aria-label="Main navigation" className='w-full bg-white shadow flex md:h-full md:items-start md:flex-col items-center gap-1 overflow-x-auto px-3 py-2 md:px-4 md:py-4'>
      <NavLink to='/' end className={({ isActive }) => `default shrink-0 md:w-full ${isActive ? 'inActive' : ''}`}>Dashboard</NavLink>
      {
        user?.name === 'admin' ? (
          <>
            <NavLink to='/tickets' className={({ isActive }) => `default shrink-0 md:w-full ${isActive ? 'inActive' : ''}`}>Ticket</NavLink>
            <NavLink to='/my-ticket' className={({ isActive }) => `default shrink-0 md:w-full ${isActive ? 'inActive' : ''}`}>My Ticket</NavLink>
            <NavLink to='/user' className={({ isActive }) => `default shrink-0 md:w-full ${isActive ? 'inActive' : ''}`}>User</NavLink>
            <NavLink to='/team' className={({ isActive }) => `default shrink-0 md:w-full ${isActive ? 'inActive' : ''}`}>Team</NavLink>
            <NavLink to="/myTeam" className={({ isActive }) => `default shrink-0 md:w-full ${isActive ? 'inActive' : ''}`}>Team Info</NavLink>
          </>
        )

        : (
          <>
          <NavLink to='/my-ticket' className={({ isActive }) => `default shrink-0 md:w-full ${isActive ? 'inActive' : ''}`}>My Ticket</NavLink>
          <NavLink to='/team' className={({ isActive }) => `default shrink-0 md:w-full ${isActive ? 'inActive' : ''}`}>Team</NavLink>
          </>
        )
      }
    </nav>
  )
}

export default Sidenav
