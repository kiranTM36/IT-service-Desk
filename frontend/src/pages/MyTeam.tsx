import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { getMyTeam } from '../store/teamSlice'
import { getMyTeamTicket, updateStatus } from '../store/ticketSlice'
import { Link } from 'react-router-dom'

const MyTeam = () => {
    const dispatch = useDispatch<AppDispatch>()

    const { myteam } = useSelector(
        (state: RootState) => state.team
    )
    const { tickets } = useSelector(
        (state: RootState) => state.ticket
    )

    useEffect(() => {
        dispatch(getMyTeam())
        dispatch(getMyTeamTicket())
    }, [dispatch])

    const tableRowStyle = "px-6 py-4"
    
    const handleStatus =async (id : number) => {
        const success = dispatch(updateStatus(Number(id)))

        if(await success){
            alert("Success")
             dispatch(getMyTeamTicket())
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-5">

            
            <div className="text-left w-full">
                <h1 className="font-bold text-3xl">My Team</h1>
                <span className="text-gray-700 text-[16px]">
                    View your team details and assigned tickets
                </span>
            </div>

            
            <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">
                    {myteam?.gName}
                </h2>

                <p className="mt-2 text-gray-600">
                    {myteam?.gDesc}
                </p>
            </div>


            <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">

                <div className="flex h-[10vh] w-full items-center justify-between bg-white px-4">
                    <h2 className="text-lg font-semibold">
                        Assigned Tickets
                    </h2>

                    <span className="text-sm text-gray-500">
                        
                    </span>
                </div>

                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                        <tr>
                            <th className={tableRowStyle}>SN</th>
                            <th className={tableRowStyle}>Subject</th>
                            <th className={tableRowStyle}>Priority</th>
                            <th className={tableRowStyle}>Status</th>
                            <th className={`${tableRowStyle} flex justify-center items-center` }>Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {tickets.length === 0 ? (
                            <tr key={1}>
                                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                                    No tickets assigned to your team.
                                </td>
                            </tr>
                        ) : (
                            tickets.map((ticket, index) => (
                                <tr
                                    key={index}
                                    className=" transition-colors hover:bg-blue-50/40"
                                >
                                    <td className="px-6 py-4 text-gray-500">
                                        {index+1}
                                    </td>

                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {ticket.title}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                            ticket.priority === "high"
                                                ? "bg-red-50 text-red-600"
                                                : ticket.priority === "medium"
                                                ? "bg-amber-50 text-amber-700"
                                                : "bg-green-50 text-green-700"
                                        }`}>
                                            {ticket.priority}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                            ticket.tStatus
                                                ? "bg-green-50 text-green-700"
                                                : "bg-amber-50 text-amber-700"
                                        }`}>
                                            {ticket.tStatus? "Complete" : "Pending"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 flex justify-center items-center gap-1">
                                        <Link
                                            to={`/ticket/${ticket.tId}`}
                                            className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700 hover:bg-gray-100"
                                        >
                                            View
                                        </Link>

                                        <button onClick={() => handleStatus(ticket.tId)} className="rounded-md border border-green-200 bg-green-50 px-3 py-1 text-xs text-green-700 hover:bg-gray-100">
                                            status
                                        </button>
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

export default MyTeam