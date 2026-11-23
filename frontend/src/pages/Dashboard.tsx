import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Activity, CheckCircle2, Clock3, Plus, Ticket as TicketIcon, Users } from 'lucide-react'
import type { AppDispatch, RootState } from '../store/store'
import { getAllTicket, getMyTicket } from '../store/ticketSlice'
import { getAllUser } from '../store/userSlice'
import { getAllTeam } from '../store/teamSlice'

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.user)
  const { tickets } = useSelector((state: RootState) => state.ticket)
  const { users } = useSelector((state: RootState) => state.user)
  const { teams } = useSelector((state: RootState) => state.team)
  const isAdmin = user?.name === 'admin'

  useEffect(() => {
    if (isAdmin) {
      dispatch(getAllTicket())
      dispatch(getAllUser())
      dispatch(getAllTeam())
    } else {
      dispatch(getMyTicket())
    }
  }, [dispatch, isAdmin])

  const openTickets = tickets.filter((ticket) => !ticket.tStatus)
  const completedTickets = tickets.filter((ticket) => ticket.tStatus)
  const highPriority = tickets.filter((ticket) => ticket.priority?.toLowerCase() === 'high')
  const recentTickets = [...tickets]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const cards = [
    { label: 'Total tickets', value: tickets.length, icon: TicketIcon, tone: 'bg-indigo-50 text-indigo-600' },
    { label: 'Open tickets', value: openTickets.length, icon: Clock3, tone: 'bg-amber-50 text-amber-600' },
    { label: 'Completed', value: completedTickets.length, icon: CheckCircle2, tone: 'bg-emerald-50 text-emerald-600' },
    ...(isAdmin
      ? [
          { label: 'High priority', value: highPriority.length, icon: Activity, tone: 'bg-rose-50 text-rose-600' },
          { label: 'Users', value: users.length, icon: Users, tone: 'bg-sky-50 text-sky-600' },
          { label: 'Teams', value: teams.length, icon: Users, tone: 'bg-violet-50 text-violet-600' },
        ]
      : []),
  ]

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <section className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-indigo-700 to-violet-600 p-5 text-white shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <p className="text-sm text-indigo-100">IT Service Desk</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Welcome{user?.username ? `, ${user.username}` : ''}</h1>
          <p className="mt-2 text-sm text-indigo-100">Here’s an overview of your support requests.</p>
        </div>
        <Link to="/create" className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-50">
          <Plus size={18} /> Create ticket
        </Link>
      </section>

      <section aria-label="Ticket summary" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, tone }) => (
          <article key={label} className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tone}`}><Icon size={22} /></div>
            <div className="min-w-0">
              <p className="text-sm text-gray-500">{label}</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-4 py-4 sm:px-6">
          <div>
            <h2 className="font-semibold text-gray-900">Recent tickets</h2>
            <p className="mt-1 text-sm text-gray-500">The latest requests in your queue</p>
          </div>
          <Link to={isAdmin ? '/tickets' : '/my-ticket'} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View all</Link>
        </div>
        {recentTickets.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <TicketIcon className="mx-auto text-gray-300" size={32} />
            <p className="mt-3 font-medium text-gray-700">No tickets yet</p>
            <p className="mt-1 text-sm text-gray-500">Create a ticket to get support started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr><th className="px-5 py-3 font-medium">Ticket</th>{isAdmin && <th className="px-5 py-3 font-medium">Requester</th>}<th className="px-5 py-3 font-medium">Category</th><th className="px-5 py-3 font-medium">Priority</th><th className="px-5 py-3 font-medium">Status</th><th className="px-5 py-3 font-medium">Created</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentTickets.map((ticket) => (
                  <tr key={ticket.tId} className="hover:bg-gray-50">
                    <td className="px-5 py-4"><Link to={`/ticket/${ticket.tId}`} className="font-medium text-gray-900 hover:text-indigo-600">{ticket.title}</Link></td>
                    {isAdmin && <td className="whitespace-nowrap px-5 py-4 text-gray-600">{ticket.username}</td>}
                    <td className="whitespace-nowrap px-5 py-4 text-gray-600">{ticket.cName || '—'}</td>
                    <td className="whitespace-nowrap px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${ticket.priority?.toLowerCase() === 'high' ? 'bg-rose-50 text-rose-700' : ticket.priority?.toLowerCase() === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>{ticket.priority || 'Normal'}</span></td>
                    <td className="whitespace-nowrap px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${ticket.tStatus ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{ticket.tStatus ? 'Complete' : 'Open'}</span></td>
                    <td className="whitespace-nowrap px-5 py-4 text-gray-500">{ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

export default Dashboard
