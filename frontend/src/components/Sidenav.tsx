import { Link, NavLink } from "react-router-dom"

const Sidenav = () => {
  return (
    <div className='h-full w-full shadow flex justify-center items-center flex-col'>
        <NavLink to='/' className={({isActive}) => ` ${isActive ? 'active' : 'inActive'}`}>Dashboard</NavLink>
        <NavLink to='/ticket' className={({isActive}) => ` ${isActive ? 'active' : 'inActive'}`}>My Ticket</NavLink>
        <NavLink to='/user' className={({isActive}) => ` ${isActive ? 'active' : 'inActive'}`}>User</NavLink>
    </div>
  )
}

export default Sidenav