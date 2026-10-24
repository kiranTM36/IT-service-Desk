import { useState } from "react"

const TeamForm = () => {

    const [data , setData] = useState({
        gName : "",
        gDesc : ""
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name , value} = e.target
        setData((data) => ({
            ...data , 
            [name] : value
        }))
    }
  return (
    <div className="flex h-full w-full justify-center items-center">
      <form  className="bg-white text-gray-500 max-w-85 w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-bold mb-9 text-center text-gray-800"></h2>

        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <input onChange={handleChange}  className="w-full outline-none bg-transparent py-2.5" type="text" placeholder="Team Name" name="gName" required />
        </div>
        <div className="flex items-center mt-2 mb-8 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">

          <textarea onChange={handleChange} rows={2} className="w-full outline-none bg-transparent py-2.5" placeholder="Description" name="gDesc" required />
        </div>



        <button  className="w-full mb-3 cursor-pointer bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">Create Team</button>

      </form>
    </div>
  )
}

export default TeamForm