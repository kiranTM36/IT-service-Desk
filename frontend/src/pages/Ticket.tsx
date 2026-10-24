import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../store/store"
import React, { useEffect, useState } from "react"
import { getAllTicket, getMyTicket, type ticket } from "../store/ticketSlice"
import { getAllCategory } from "../store/categorySlice"
import { Link } from "react-router-dom"

interface props{
    name : string,
    tickets: ticket[];
}

const Ticket:React.FC<props> = ({name , tickets}) => {
    const tableRowStyle = "px-6 py-4 font-semibold text-center"
    const divClass = "bg-white h-full w-1/4 shadow rounded-md"

    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")

    const dispatch = useDispatch<AppDispatch>()

    const { category } = useSelector(
        (state: RootState) => state.categroy
    )

    useEffect(() => {
        dispatch(getAllCategory())
    }, [dispatch])

    const filteredTickets = tickets.filter((ticket) => {
        const matchesSearch = ticket.title
            .toLowerCase()
            .includes(search.toLowerCase())

        const matchesCategory =
            selectedCategory === "" ||
            String(ticket.cId) === selectedCategory

        return matchesSearch && matchesCategory
    })
    

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div className="text-left w-full">
                <h1 className="font-bold text-3xl">{name}</h1>
                <span className="text-gray-700 text-[16px]">Manage , Track and Follow up on all request Submits</span>
            </div>
            <div className="h-[14vh] w-full flex justify-evenly items-center gap-4">
                <div className={divClass}></div>
                <div className={divClass}></div>
                <div className={divClass}></div>
                <div className={divClass}></div>
            </div>
            <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="flex h-[10vh] w-full items-center justify-start gap-4 bg-white px-4">

                    <input
                        type="text"
                        placeholder="Search tickets..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-1/4 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-300"
                    />

                    <select
                        value={selectedCategory}
                        onChange={(e) =>
                            setSelectedCategory(e.target.value)
                        }
                        className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:border-blue-500"
                    >
                        <option value="">All Categories</option>

                        {category.map((item) => (
                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.cName}
                            </option>
                        ))}
                    </select>

                </div>

                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                        <tr>
                            <th className={tableRowStyle}>SN</th>
                            <th className={tableRowStyle}>Subject and Details</th>
                            <th className={tableRowStyle}>Username</th>
                            <th className={tableRowStyle}>Category</th>
                            <th className={tableRowStyle}>Priority</th>
                            <th className={tableRowStyle}>Status</th>
                            <th className={tableRowStyle}>Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {filteredTickets.length === 0 ? (
                            <tr key={"no-tickets"}>
                                <td
                                    colSpan={6}
                                    className="px-6 py-10 text-center text-gray-500"
                                >
                                    No tickets found.
                                </td>
                            </tr>
                        ) : (
                            filteredTickets.map((ticket, index) => (
                                <tr
                                    key={index}
                                    className="text-center transition-colors hover:bg-blue-50/40"
                                >
                                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-500">
                                        #{String(index + 1).padStart(3, "0")}
                                    </td>

                                    <td className="px-6 py-4">
                                        <Link to={`/ticket/${ticket.tId}`}><p className="font-medium text-gray-900">
                                            {ticket.title}
                                        </p></Link>
                                    </td>

                                    <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                                        {ticket.username}
                                    </td>

                                    <td className="whitespace-nowrap px-6 py-4 text-blue-600">
                                        <span className="rounded-lg border-2 border-blue-200 bg-blue-50 px-2 py-1 text-[12px] font-medium">
                                            {ticket.cName}
                                        </span>
                                    </td>

                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                                ticket.priority === "high"
                                                    ? "bg-red-50 text-red-600"
                                                    : ticket.priority === "medium"
                                                    ? "bg-amber-50 text-amber-700"
                                                    : "bg-green-50 text-green-700"
                                            }`}
                                        >
                                            {ticket.priority}
                                        </span>
                                    </td>

                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                                                ticket.tStatus === true
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-amber-50 text-amber-700"
                                            }`}
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                            {ticket.tStatus === true
                                                ? "Complete"
                                                : "Pending"}
                                        </span>
                                    </td>

                                    <td>
                                        {
                                            name === "My Ticket" && (
                                                <Link to={`/edit/${ticket.tId}`}>
                                                    <button className="bg-gray-50 border-2 text-gray-700 cursor-pointer border-gray-200 rounded-md px-2 text-[12px] mr-2 hover:scale-105 active:bg-gray-100">Edit</button>
                                                </Link>
                                            )
                                        }
                                        <button className="bg-red-50 border-2 cursor-pointer hover:scale-105 active:bg-red-100 border-red-200 text-red-700 rounded-md px-2 text-[12px] text-center">Delete</button>
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

export default Ticket