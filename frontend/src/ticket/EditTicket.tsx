import Ticketform from './Ticketform'

const EditTicket = () => {
    const handleEdit = (data : FormData ) => {
        console.log(data);
    }
  return (
    <Ticketform name='Edit' onEvent={handleEdit} />
  )
}

export default EditTicket