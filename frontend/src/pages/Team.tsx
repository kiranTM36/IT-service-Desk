
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../store/store'
import { getAllTeam } from '../store/teamSlice'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

const Team = () => {

    const dispatch = useDispatch<AppDispatch>()

    const { teams, status } = useSelector(
        (state: RootState) => state.team
    )

    useEffect(() => {
        dispatch(getAllTeam())
    }, [dispatch])

    return (
        <div className="space-y-5">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Teams
                    </h2>
                    <p className="text-sm text-gray-500">
                        Manage your support teams
                    </p>
                </div>

                <Link
                    to="/teamForm"
                    className="bg-[#4F46E5] flex items-center gap-2 px-3 py-2 text-white rounded-md"
                >
                    <Plus size={18} />
                    Create Team
                </Link>
            </div>

            {/* Team Table */}
            <div className="w-full overflow-x-auto rounded-2xl bg-white shadow-sm">

                <table className="w-full text-left">

                    <thead className="bg-gray-50 text-sm text-gray-500">
                        <tr>
                            <th className="p-4">SN</th>
                            <th className="p-4">Team Name</th>
                            <th className="p-4">Description</th>
                            <th className="p-4">Created By</th>
                            <th className="p-4">Created Date</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 text-sm">

                        {status === 'loading' ? (
                            <tr>
                                <td colSpan={6} className="p-6 text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : teams.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-6 text-center text-gray-500">
                                    Team Not Available
                                </td>
                            </tr>
                        ) : (
                            teams.map((team, index) => (
                                <tr
                                    key={team.gId}
                                    className="hover:bg-gray-50 transition"
                                >

                                    <td className="p-4 text-gray-500">
                                        {index + 1}
                                    </td>

                                    <td className="p-4 font-medium text-gray-800">
                                        {team.gName}
                                    </td>

                                    <td className="p-4 text-gray-600">
                                        {team.gDesc}
                                    </td>

                                    <td className="p-4 text-gray-600">
                                        {team.username}
                                    </td>

                                    <td className="p-4 text-gray-600">
                                        {new Date(team.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </td>

                                    <td className="p-4">
                                        <Link
                                            to={`/team/${team.gId}`}
                                            className="text-indigo-600 hover:text-indigo-800"
                                        >
                                            View
                                        </Link>
                                    </td>

                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default Team
