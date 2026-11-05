import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import type { RootState } from "../store/store"

const Sidenav = () => {

  const { user } = useSelector((state: RootState) => state.user)
  return (
    <div className='h-full w-full shadow flex justify-start items-center flex-col py-4 gap-1'>
      {
        user?.name === 'admin' ? (
          <>
            <NavLink to='/' className={({ isActive }) => `default ${isActive ? 'inActive' : ''}`}>Dashboard</NavLink>
            <NavLink to='/tickets' className={({ isActive }) => `default ${isActive ? 'inActive' : ''}`}>Ticket</NavLink>
            <NavLink to='/my-ticket' className={({ isActive }) => `default ${isActive ? 'inActive' : ''}`}>My Ticket</NavLink>
            <NavLink to='/user' className={({ isActive }) => ` default ${isActive ? 'inActive' : ''}`}>User</NavLink>
            <NavLink to='/team' className={({ isActive }) => ` default ${isActive ? 'inActive' : ''}`}>Team</NavLink>
          </>
        )

        : (
          <>
          <NavLink to='/my-ticket' className={({ isActive }) => `default ${isActive ? 'inActive' : ''}`}>My Ticket</NavLink>
          </>
        )
      }
    </div>
  )
}

export default Sidenav