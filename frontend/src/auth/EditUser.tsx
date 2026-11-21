import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { type AppDispatch, type RootState } from '../store/store'
import { getSingleUser } from '../store/userSlice'

const EditUser = () => {

    const { id } = useParams()

    const dispatch = useDispatch<AppDispatch>()

    const { user } = useSelector(
        (state: RootState) => state.user
    )

    const [newData, setNewData] = useState({
        username: '',
        email: ''
    })

    useEffect(() => {
        if (id) {
            dispatch(getSingleUser(Number(id)))
        }
    }, [dispatch, id])

    useEffect(() => {
        if (user) {
            setNewData({
                username: user.username || '',
                email: user.email || ''
            })
        }
    }, [user])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setNewData(prev => ({
            ...prev,
            [name]: value
        }))
        console.log(newData);
        
    }

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg border">

            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">
                    Edit User Profile
                </h3>
            </div>

            <div className="border-t border-gray-200 px-4 py-5">

                <div className="space-y-5">

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-500">
                            Full name
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={newData.username}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded-md px-3 py-2"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-500">
                            Email address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={newData.email}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded-md px-3 py-2"
                        />
                    </div>

                    <button
                        type="button"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md"
                        onClick={() => console.log(newData)}
                    >
                        Update User
                    </button>

                </div>
            </div>
        </div>
    )
}

export default EditUser