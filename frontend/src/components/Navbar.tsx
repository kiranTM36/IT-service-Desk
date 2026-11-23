import { Plus } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { type AppDispatch, type RootState } from "../store/store"
import { logOutAction } from "../store/userSlice"
import { useState } from "react"

const Navbar = () => {

  const defaultPic = "https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png"
  const showDiv = "w-full flex justify-center items-center px-2 py-1 rounded-md hover:bg-gray-200 cursor-pointer"
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.user);

  const [show, setShow] = useState(false)


  const handleLogout = async () => {
    await dispatch(logOutAction())
  }

  return (
    <header className="h-14 bg-white w-full shadow fixed top-0 left-0 z-20 flex items-center justify-between px-4 sm:px-6">
      <Link to="/" className="font-bold text-indigo-700">IT Service Desk</Link>
      <div className="flex min-w-0 gap-3 items-center">

        <div>
          <h1 className="hidden sm:block text-sm font-medium text-gray-600">Support Portal</h1>
        </div>

        <div className="flex gap-3 px-4 justify-center items-center">
          <Link to='/create' className="bg-[#4F46E5] flex justify-center items-center gap-1 px-2 sm:px-3 py-2 text-white rounded-md text-sm whitespace-nowrap">
            <Plus size={18} /> <span className="hidden sm:inline">Create Ticket</span><span className="sm:hidden">Create</span>
          </Link>

          <div className="">
            <button type="button" aria-label="Open profile menu" aria-expanded={show} onClick={() => setShow(!show)} className="rounded-full h-8 w-8 shrink-0 flex justify-center items-center cursor-pointer bg-center bg-no-repeat bg-cover" style={{
              backgroundImage: `url("${user?.profile ? user.profile : defaultPic}")`
            }}>
            </button>

            {
              show && (


                <div className="absolute z-10 top-15 right-5 rounded-lg">
                  {
                    user?.uid ? (
                      <div className="p-2 border border-gray-200 shadow bg-white">
                        <Link to='/profile'><button className={showDiv}>Profile</button></Link>
                        <Link to='/'>
                          <button className={showDiv} onClick={handleLogout}>Log out</button>
                        </Link>
                      </div>
                    )
                      : (
                        <div className="p-2 border border-gray-200 shadow rounded-lg bg-white">
                          <Link to='/signup'>
                            <button className={showDiv}>Sign Up</button>
                          </Link>
                          <Link to='/login'>
                            <button className={showDiv}>Log In</button>
                          </Link>
                        </div>
                      )
                  }
                </div>

              )
            }
          </div>


        </div>

      </div>
    </header>

  )
}

export default Navbar
