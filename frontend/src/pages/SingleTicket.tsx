import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {type AppDispatch, type RootState } from '../store/store'
import { getSingleTicket } from '../store/ticketSlice'

const SingleTicket = () => {
    const {id} = useParams()
    const dispatch = useDispatch<AppDispatch>()

    const {ticket , status} = useSelector((state:RootState) => state.ticket)

    useEffect(() => {
        if(id){
            dispatch(getSingleTicket(Number(id)))
        }
    }, [dispatch , id])

    
  return (
    <div>
      <div>
        <div>{ticket?.status === false ? "In Progress" : "Completed"}</div>
      </div>
    </div>
  )
}

export default SingleTicket