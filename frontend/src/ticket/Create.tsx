import { useDispatch } from 'react-redux'
import Ticketform from './Ticketform'
import { type AppDispatch } from '../store/store'
import { createTicket } from '../store/ticketSlice'

const Create = () => {

  const dispatch = useDispatch<AppDispatch>()

  const handleTicketSubmit = async(data:FormData) => {
    const success = await dispatch(createTicket(data))
    if(success){
      alert("Created")
    }
  }
  return (
    <Ticketform name='Create' onEvent={handleTicketSubmit} />
  )
}

export default Create