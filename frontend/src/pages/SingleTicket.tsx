import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { type AppDispatch, type RootState } from '../store/store'
import { getSingleTicket } from '../store/ticketSlice'
import { Pencil, TimerIcon, Trash} from 'lucide-react'

const SingleTicket = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()

  const { ticket } = useSelector((state: RootState) => state.ticket)

  useEffect(() => {
    if (id) {
      dispatch(getSingleTicket(Number(id)))
    }
  }, [dispatch, id])

  console.log(ticket?.tId );
  

  return (
    <div className='flex justify-start items-start flex-col gap-3'>
      <div className='flex justify-start items-center gap-3'>
        <div className='bg-blue-50 border flex justify-center items-center gap-1 border-blue-200 px-2 text-blue-600 text-[13px] font-medium rounded-lg'><span className='w-2 h-2 bg-blue-600 rounded-full'></span>{ticket?.tStatus ? "Completed" : "In Progress"}</div>
        <div className='bg-blue-50 border flex justify-center items-center gap-1 border-blue-200 px-2 text-blue-600 text-[13px] font-medium rounded-lg'>{ticket?.priority}</div>
        <div className='bg-gray-100 border flex justify-center items-center gap-1 border-gray-200 px-2 text-gray-600 text-[13px] font-medium rounded-lg'><TimerIcon size={15} />{ticket?.createdAt && new Date(ticket.createdAt).toLocaleDateString("us-US", {
          year: "numeric",
          month: "short",
          day: "2-digit"
        })}</div>
      </div>

      <div className='flex justify-between items-center w-full'>
        <h1 className='text-3xl font-semibold'>{ticket?.title}</h1>

        <div className='flex justify-center items-center gap-2'>
          <Link to={`/edit/${ticket?.tId}`}>
          <button className='flex justify-center items-center bg-[#4F46E5] text-white px-3 py-1 gap-1 rounded-md cursor-pointer hover:scale-105 active:bg-[#3e35e7]'><Pencil size={15}/>Edit</button>
          </Link>
          <button className='flex justify-center items-center bg-red-500 text-white px-3 py-1 gap-1 rounded-md cursor-pointer hover:scale-105 active:bg-red-700'><Trash size={16}/>Delete</button>
        </div>
      </div>

      <div className='w-full grid grid-cols-[70%_30%] gap-5 p-1 items-start'>
        <div className='w-full bg-white shadow-md rounded-2xl px-3 py-2'>

        <div className='flex justify-start items-center gap-2 mb-4'>
          <div className='h-9 w-9 bg-black rounded-full bg-center bg-no-repeat bg-cover' style={{
            backgroundImage : `url("${ticket?.profile}")`
          }}></div>
          <div>{ticket?.username}</div>
          <div className='text-[13px] bg-blue-100 border-2 border-blue-200 px-2 rounded-lg'>{ticket?.name}</div>
        </div>

        <div className='mb-4'>
          {ticket?.description}
        </div>

        <div className='h-[70vh] w-full bg-black bg-center bg-no-repeat bg-cover rounded-xl' style={{
          backgroundImage: `url("http://localhost:9999/uploads/${ticket?.image}")`
        }}></div>

        </div>
        <div className='w-full h-auto bg-white shadow-md rounded-2xl p-3 gap-4'>

          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-semibold'>Ticket Properties</h1>
            <div className='border-b border-gray-200'></div>
          </div>

          <div className='flex justify-start items-start flex-col gap-2 mt-2'>

            <div className='w-full flex justify-between items-center'>Status <div className='bg-blue-50 border flex justify-center items-center gap-1 border-blue-200 px-2 text-blue-600 text-[14px] font-medium rounded-md'> <span className='w-2 h-2 bg-blue-600 rounded-full' ></span>{ticket?.tStatus ? "Completed" : "In Progress"}</div></div>
            <div className='w-full flex justify-between items-center'>priority <div className='bg-blue-50 border flex justify-center items-center gap-1 border-blue-200 px-2 text-blue-600 text-[14px] font-medium rounded-md'> <span className='w-2 h-2 bg-blue-600 rounded-full' ></span>{ticket?.priority}</div></div>
            <div className='w-full flex justify-between items-center'>priority <div className='bg-blue-50 border flex justify-center items-center gap-1 border-blue-200 px-2 text-blue-600 text-[14px] font-medium rounded-md'> <span className='w-2 h-2 bg-blue-600 rounded-full' ></span>{ticket?.priority}</div></div>
            <div className='w-full flex justify-between items-center'>priority <div className='bg-blue-50 border flex justify-center items-center gap-1 border-blue-200 px-2 text-blue-600 text-[14px] font-medium rounded-md'> <span className='w-2 h-2 bg-blue-600 rounded-full' ></span>{ticket?.priority}</div></div>
            <div className='w-full flex justify-between items-center'>priority <div className='bg-blue-50 border flex justify-center items-center gap-1 border-blue-200 px-2 text-blue-600 text-[14px] font-medium rounded-md'> <span className='w-2 h-2 bg-blue-600 rounded-full' ></span>{ticket?.priority}</div></div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default SingleTicket