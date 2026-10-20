import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../store/store"
import { useEffect, useState } from "react"
import { getAllTicket } from "../store/ticketSlice"
import { getAllCategory } from "../store/categorySlice"

const Ticket = () => {
    const tableRowStyle = "px-6 py-4 font-semibold text-center"

    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")

    const dispatch = useDispatch<AppDispatch>()

    const { tickets } = useSelector(
        (state: RootState) => state.ticket
    )

    const { category } = useSelector(
        (state: RootState) => state.categroy
    )

    useEffect(() => {
        dispatch(getAllTicket())
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
        <div className="flex flex-col items-center justify-center gap-10">
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
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {filteredTickets.length === 0 ? (
                            <tr>
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
                                    key={ticket.id}
                                    className="text-center transition-colors hover:bg-blue-50/40"
                                >
                                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-500">
                                        #{String(index + 1).padStart(3, "0")}
                                    </td>

                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900">
                                            {ticket.title}
                                        </p>
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
                                                ticket.status === true
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-amber-50 text-amber-700"
                                            }`}
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                            {ticket.status === true
                                                ? "Complete"
                                                : "Pending"}
                                        </span>
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