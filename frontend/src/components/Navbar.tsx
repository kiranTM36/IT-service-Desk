import { Plus } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { type AppDispatch, type RootState } from "../store/store"
import { logOutAction } from "../store/userSlice"
import { useEffect } from "react"

const Navbar = () => {

  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.user);


const handleLogout = async() => {
  await dispatch(logOutAction())
}

  return (
    <div className="h-[7vh] bg-white w-full shadow fixed top-0 left-0 z-10 flex justify-center items-center">
      <div>

      </div>


      <div className="flex gap-3">

        <Link to='/create'>
          <button className="bg-[#4F46E5] flex justify-center items-center px-2 py-1 text-white rounded-md"><Plus size={20} /> Create Ticket</button>
        </Link>

        <Link to='/'>
          <button className="bg-[#4F46E5] flex justify-center items-center px-2 py-1 text-white rounded-md" onClick={handleLogout}>Log out</button>
        </Link>

        <div className="rounded-full bg-black h-7 w-7">

        </div>
      </div>
    </div>

  )
}

export default Navbar