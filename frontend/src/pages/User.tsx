import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../store/store'
import { getAllUser, getSingleUser, updateStatus } from '../store/userSlice'
import { Link } from 'react-router-dom'

const User = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { users, status } = useSelector(
    (state: RootState) => state.user
  )

  useEffect(() => {
    dispatch(getAllUser())
  }, [dispatch])


  const handleDelete = (uid : number) => {
    dispatch(updateStatus(uid))
  }



  return (
    <div className="w-full overflow-x-auto rounded-2xl bg-white shadow-sm">

      <table className="w-full text-left">
        <thead className="bg-gray-50 text-sm text-gray-500">
          <tr>
            <th className="p-4">SN</th>
            <th className="p-4">Name</th>
            <th className="p-4">Role</th>
            <th className="p-4">Team</th>
            <th className="p-4">Status</th>
            <th>Joining Date</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 text-sm">

          {status === 'loading' ? (
            <tr>
              <td colSpan={6} className="p-6 text-center">
                Loading...
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-6 text-center text-gray-500">
                User Not Available
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition"
              >
                <td className="p-4 text-gray-500">
                  {index + 1}
                </td>

                <td className="p-4 font-medium text-gray-800" >
                  <Link to={`/${user.uid}`}>
                    {user.username}
                  </Link>
                </td>

                <td className="p-4 text-gray-600">
                  {user.name}
                </td>

                <td className="p-4 text-gray-600">
                  {user.uid || 'N/A'}
                </td>

                <td className="p-4">
                  {
                    user.status ? (<span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                      Active
                    </span>) : (<span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                      InActive
                    </span>)
                  }
                </td>

                <td className="p-4">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>

                <td className="p-4">
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(user.uid)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}

        </tbody>
      </table>
    </div>
  )
}

export default User
