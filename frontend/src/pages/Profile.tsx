import { useSelector } from "react-redux"
import type { RootState } from "../store/store"

const Profile = () => {

    const {user} = useSelector((state:RootState) => state.user )
  return (
    

<div className="min-h-full flex items-center justify-center p-4">

    <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-8">

        <div className="flex flex-col md:flex-row">

            <div className="md:w-1/3 text-center mb-8 md:mb-0">

                <img
                    src={user?.profile || ""}
                    alt="Profile Picture"
                    className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800"
                />

                <h1 className="text-2xl font-bold text-indigo-800 mb-2">
                    {user?.username}
                </h1>

                <p className="text-gray-600">
                    {user?.name}
                </p>

                <button className="mt-4 bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900">
                    Edit Profile
                </button>

            </div>

            <div className="md:w-2/3 md:pl-8">

                <h2 className="text-xl font-semibold text-indigo-800 mb-4">
                    About Me
                </h2>

                <p className="text-gray-700 mb-6">
                    Passionate software developer with 5 years of experience in web technologies.
                    I love creating user-friendly applications and solving complex problems.
                </p>

                <h2 className="text-xl font-semibold text-indigo-800 mb-4">
                    Skills
                </h2>

                <div className="flex flex-wrap gap-2 mb-6">

                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">JavaScript</span>

                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">React</span>

                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Node.js</span>

                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Python</span>

                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">SQL</span>

                </div>

                <h2 className="text-xl font-semibold text-indigo-800 mb-4">
                    Contact Information
                </h2>

                <ul className="space-y-2 text-gray-700">

                    <li className="flex items-center gap-2">
                        <span className="text-indigo-800">✉</span>
                        {user?.email}
                    </li>

                    <li className="flex items-center gap-2">
                        <span className="text-indigo-800">☎</span>
                        +1 (555) 123-4567
                    </li>

                    <li className="flex items-center gap-2">
                        <span className="text-indigo-800">📍</span>
                        {user?.uid}
                    </li>

                </ul>

            </div>

        </div>

    </div>

</div>


  )
}

export default Profile