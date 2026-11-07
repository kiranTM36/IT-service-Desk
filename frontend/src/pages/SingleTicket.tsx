
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { type AppDispatch, type RootState } from '../store/store'
import { getSingleTicket } from '../store/ticketSlice'
import { Pencil, TimerIcon, Trash, Send } from 'lucide-react'
import { createComment, getComment } from '../store/commentSlice'

const SingleTicket = () => {

  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()

  const [commentData, setCommentData] = useState({
    ticketId: id || '',
    comment: ''
  })

  const { ticket } = useSelector((state: RootState) => state.ticket)
  const { comment } = useSelector((state: RootState) => state.comment)
  const { user } = useSelector((state: RootState) => state.user)

  // Update ticketId when route changes
  useEffect(() => {
    setCommentData(prev => ({
      ...prev,
      ticketId: id || ''
    }))
  }, [id])

  useEffect(() => {
    if (id) {
      dispatch(getSingleTicket(Number(id)))
      dispatch(getComment(Number(id)))
    }
  }, [dispatch, id])

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setCommentData(prev => ({
      ...prev,
      [name]: value
    }))
  }

const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  if (!commentData.comment.trim()) return

  await dispatch(createComment(commentData))

  setCommentData(prev => ({
    ...prev,
    comment: ''
  }))

  dispatch(getComment(Number(id)))
}

  return (
    <div className='flex justify-start items-start flex-col gap-4'>

      <div className='flex justify-start items-center gap-3'>

        <div className='bg-blue-50 border border-blue-200 px-2 text-blue-600 text-[13px] font-medium rounded-lg flex items-center gap-1'>
          <span className='w-2 h-2 bg-blue-600 rounded-full'></span>
          {ticket?.tStatus ? 'Completed' : 'In Progress'}
        </div>

        <div className='bg-blue-50 border border-blue-200 px-2 text-blue-600 text-[13px] font-medium rounded-lg'>
          {ticket?.priority}
        </div>

        <div className='bg-gray-100 border border-gray-200 px-2 text-gray-600 text-[13px] font-medium rounded-lg flex items-center gap-1'>
          <TimerIcon size={15} />

          {ticket?.createdAt && new Date(ticket.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
          })}
        </div>

      </div>

      <div className='flex justify-between items-center w-full'>

        <h1 className='text-3xl font-semibold'>
          {ticket?.title}
        </h1>

        <div className='flex items-center gap-2'>

          <Link to={`/edit/${ticket?.tId}`}>
            <button className='flex items-center bg-[#4F46E5] text-white px-3 py-1 gap-1 rounded-md cursor-pointer'>
              <Pencil size={15} />
              Edit
            </button>
          </Link>

          <button className='flex items-center bg-red-500 text-white px-3 py-1 gap-1 rounded-md cursor-pointer'>
            <Trash size={16} />
            Delete
          </button>

        </div>
      </div>

      <div className='w-full grid grid-cols-[70%_30%] gap-5 p-1 items-start'>

        <div className='w-full bg-white shadow-md rounded-2xl px-3 py-4'>

          <div className='flex items-center gap-2 mb-4'>

            <div
              className='h-9 w-9 bg-gray-200 rounded-full bg-center bg-cover'
              style={{
                backgroundImage: `url("${ticket?.profile}")`
              }}
            ></div>

            <div>{ticket?.username}</div>

            <div className='text-[13px] bg-blue-100 border border-blue-200 px-2 rounded-lg'>
              {ticket?.name}
            </div>

          </div>

          <div className='mb-4 text-gray-700'>
            {ticket?.description}
          </div>

          <div
            className='h-[70vh] w-full bg-gray-100 bg-center bg-no-repeat bg-cover rounded-xl'
            style={{
              backgroundImage: `url("http://localhost:9999/uploads/${ticket?.image}")`
            }}
          ></div>

        </div>

        <div className='w-full bg-white shadow-md rounded-2xl p-4'>

          <h1 className='text-xl font-semibold'>
            Ticket Properties
          </h1>

          <div className='border-b border-gray-200 my-3'></div>

          <div className='flex flex-col gap-4 text-sm'>

            <div className='flex justify-between'>
              Status
              <span className='text-blue-600 font-medium'>
                {ticket?.tStatus ? 'Completed' : 'In Progress'}
              </span>
            </div>

            <div className='flex justify-between'>
              Priority
              <span className='text-blue-600 font-medium'>
                {ticket?.priority}
              </span>
            </div>

            <div className='flex justify-between'>
              Assigned To
              <span>{ticket?.username}</span>
            </div>

            <div className='flex justify-between'>
              Ticket ID
              <span>#{ticket?.tId}</span>
            </div>

          </div>

        </div>

      </div>

      <div className='w-full bg-white rounded-2xl shadow-md border border-gray-100 p-5'>

        <div className='flex justify-between items-center mb-5'>

          <div>
            <h2 className='text-xl font-semibold text-gray-800'>
              Comment
            </h2>

          </div>

          <span className='bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium'>
            {comment?.length || 0} Comments
          </span>

        </div>

        <div className='border-b border-gray-100 mb-5'></div>

        <div className='h-[350px] overflow-y-auto flex flex-col gap-5 pr-2'>

          {comment?.length === 0 && (
            <div className='flex justify-center items-center h-full text-gray-400 text-sm'>
              No comments yet. Start the discussion.
            </div>
          )}

          {comment?.map((cmt) => {

            const isMyComment =
              Number(cmt.userId) === Number(user?.uid)

              console.log("cmt userId",cmt.userId);
              console.log("my Id",user?.uid);
              
              
            return (

              <div
                key={cmt.cmtId}
                className={`flex flex-col ${
                  isMyComment ? 'items-end' : 'items-start'
                }`}
              >

                <div className='flex items-center gap-2 mb-1'>

                  {!isMyComment && (
                    <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600'>
                      U
                    </div>
                  )}

                  <span className='text-sm font-medium text-gray-700'>
                    {isMyComment ? 'You' : `User ${cmt.userId}`}
                  </span>

                  <span className='text-xs text-gray-400'>
                    {new Date(cmt.createdAt).toLocaleString('en-US', {
                      month: 'short',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>

                  {isMyComment && (
                    <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-600'>
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>
                  )}

                </div>

               
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-6 break-words ${
                    isMyComment
                      ? 'bg-blue-600 text-white rounded-tr-sm'
                      : 'bg-gray-100 text-gray-700 rounded-tl-sm'
                  }`}
                >
                  {cmt.comment}
                </div>

              </div>

            )
          })}

        </div>


        <form
          onSubmit={handleSubmitComment}
          className='mt-5 pt-4 border-t border-gray-100'
        >

          <div className='flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-blue-400'>

            <input
              type='text'
              name='comment'
              value={commentData.comment}
              onChange={handleComment}
              placeholder='Write a comment...'
              className='flex-1 bg-transparent outline-none text-sm text-gray-700'
            />

            <button
              type='submit'
              disabled={!commentData.comment.trim()}
              className='bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed'
            >
              <Send size={15} />
              Send
            </button>

          </div>


        </form>

      </div>

    </div>
  )
}

export default SingleTicket
