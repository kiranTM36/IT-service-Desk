import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Ticket from '../pages/Ticket'
import type { RootState, AppDispatch } from '../store/store'
import { clearTickets, getMyTicket } from '../store/ticketSlice'

const MyTicket = () => {
    const dispatch = useDispatch<AppDispatch>()

    const { tickets } = useSelector(
        (state: RootState) => state.ticket
    )

    useEffect(() => {
        dispatch(clearTickets())
        dispatch(getMyTicket())
    }, [dispatch])

    console.log(tickets);
    
    return (
        <Ticket name="My Ticket" tickets={tickets} />
    )
}

export default MyTicket