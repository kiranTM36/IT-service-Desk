import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

const Team = () => {
    const divClass = "bg-white h-full w-1/4 shadow rounded-md"
    return (
        
        <div className="flex justify-center items-center flex-col">

            <div className="flex justify-end items-end w-full">
                <Link to='/teamForm'>
                    <button className="bg-[#4F46E5] flex justify-center items-center px-2 py-1 text-white rounded-md"><Plus size={20} /> Create Team</button>
                </Link>
            </div>

            <div className="h-[14vh] w-full flex justify-evenly items-center gap-4">
                <div className={divClass}></div>
                <div className={divClass}></div>
                <div className={divClass}></div>
                <div className={divClass}></div>
            </div>
        </div>
    )
}

export default Team