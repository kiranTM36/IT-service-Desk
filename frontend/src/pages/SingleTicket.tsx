import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {type AppDispatch, type RootState } from '../store/store'
import { getSingleTicket } from '../store/ticketSlice'

const SingleTicket = () => {
    const {id} = useParams()
    const dispatch = useDispatch<AppDispatch>()

    const {ticket } = useSelector((state:RootState) => state.ticket)

    useEffect(() => {
        if(id){
            dispatch(getSingleTicket(Number(id)))
        }
    }, [dispatch , id])

    console.log(ticket?.priority);
    
  return (
    <div>
      <div>
        <div>{ticket?.tStatus ? "Completed" : "In Progress"}</div>
        <div>{ticket?.priority}</div>
      </div>
    </div>
  )
}

export default SingleTicket