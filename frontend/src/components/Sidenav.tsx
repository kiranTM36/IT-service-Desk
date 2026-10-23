import { Link, NavLink } from "react-router-dom"

const Sidenav = () => {
  return (
    <div className='h-full w-full shadow flex justify-start items-center flex-col py-4 gap-2'>
        <NavLink to='/' className={({isActive}) => `default ${isActive ? 'inActive' : ''}`}>Dashboard</NavLink>
        <NavLink to='/tickets' className={({isActive}) => `default ${isActive ? 'inActive' : ''}`}>Ticket</NavLink>
        <NavLink to='/my-ticket' className={({isActive}) => `default ${isActive ? 'inActive' : ''}`}>My Ticket</NavLink>
        <NavLink to='/user' className={({isActive}) => ` default ${isActive ? 'inActive' : ''}`}>User</NavLink>
    </div>
  )
}

export default Sidenav