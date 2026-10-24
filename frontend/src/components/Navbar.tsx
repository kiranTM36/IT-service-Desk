import { Plus } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { type AppDispatch, type RootState } from "../store/store"
import { logOutAction } from "../store/userSlice"
import { useState } from "react"

const Navbar = () => {

  const defaultPic = "https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png"
  const showDiv = "w-full flex justify-center items-center px-2 py-1 rounded-md hover:bg-gray-200"
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.user);

  const [show, setShow] = useState(false)


  console.log(user?.profile);


  const handleLogout = async () => {
    await dispatch(logOutAction())
  }

  return (
    <div className="h-[7vh] bg-white w-full shadow fixed top-0 left-0 z-10  items-center grid grid-cols-[15%_85%]">
      <div>

      </div>


      <div className="flex gap-3 justify-between items-center">

        <div>
          <h1>dhfydif</h1>
        </div>

        <div className="flex gap-3 px-4 justify-center items-center">
          <Link to='/create'>
            <button className="bg-[#4F46E5] flex justify-center items-center px-2 py-1 text-white rounded-md"><Plus size={20} /> Create Ticket</button>
          </Link>

          <div className="">
            <div onClick={() => setShow(!show)} className={`rounded-full h-7 w-7 flex justify-center items-center bg-center bg-no-repeat bg-cover`} style={{
              backgroundImage: `url("${user?.profile ? user.profile : defaultPic}")`
            }}>
            </div>

            {
              show && (


                <div className="absolute z-10 top-15 right-5 rounded-lg">
                  {
                    user?.id ? (
                      <div className="p-2 border border-gray-200 shadow bg-white">
                        <button className={showDiv}>Profile</button>
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
    </div>

  )
}

export default Navbar