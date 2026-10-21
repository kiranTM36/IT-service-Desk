import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../store/store'
import { getAllUser } from '../store/userSlice'

const User = () => {

    const dispatch = useDispatch<AppDispatch>()

    const { users , status} = useSelector((state : RootState) => state.user)

    useEffect(() => {
        dispatch(getAllUser())
    }, [dispatch])

    console.log(users , status);
    
  return (
    <div>User</div>
  )
}

export default User