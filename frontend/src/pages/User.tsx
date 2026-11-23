import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../store/store'
import { getAllUser, updateStatus } from '../store/userSlice'
import { Link } from 'react-router-dom'

const User = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [selectedUid, setSelectedUid] = useState<number | null>(null)

  const { users, status } = useSelector(
    (state: RootState) => state.user
  )

  useEffect(() => {
    dispatch(getAllUser())
  }, [dispatch])

  const handleDelete = (uid: number) => {
    dispatch(updateStatus(uid))
    setSelectedUid(null)
  }

  return (
    <>
      <div className="w-full overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-500">
            <tr>
              <th className="p-4">SN</th>
              <th className="p-4">Name</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Joining Date</th>
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
                  key={user.uid ?? index}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="p-4 text-gray-500">
                    {index + 1}
                  </td>

                  <td className="p-4 font-medium text-gray-800">
                    <Link to={`/${user.uid}`}>
                      {user.username}
                    </Link>
                  </td>

                  <td className="p-4 text-gray-600">
                    {user.name}
                  </td>

                  <td className="p-4">
                    {user.status ? (
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                        Active
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                        InActive
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>

                  <td className="p-4">
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => setSelectedUid(user.uid)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedUid !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur confirm-dialog">
          <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div className="opacity-25 w-full h-full absolute z-10 inset-0" />
            <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
              <div className="md:flex items-center">
                <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 shrink-0 mx-auto">
                  <i className="bx bx-error text-3xl">
                    &#9888;
                  </i>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                  <p className="font-bold">Warning!</p>
                  <p className="text-sm text-gray-700 mt-1">
                    You will lose all of your data by deleting this. This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                <button
                  type="button"
                  onClick={() => handleDelete(selectedUid)}
                  id="confirm-delete-btn"
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedUid(null)}
                  id="confirm-cancel-btn"
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default User