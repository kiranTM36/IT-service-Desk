import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Ticket from '../pages/Ticket'
import type { RootState, AppDispatch } from '../store/store'
import { clearTickets, getAllTicket } from '../store/ticketSlice'

const AllTicket = () => {
    const dispatch = useDispatch<AppDispatch>()

    const { tickets } = useSelector(
        (state: RootState) => state.ticket
    )

    useEffect(() => {
        dispatch(clearTickets())
        dispatch(getAllTicket())
    }, [dispatch])

    console.log(tickets);
    
    return (
        <Ticket name="All Ticket" tickets={tickets} />
    )
}

export default AllTicket