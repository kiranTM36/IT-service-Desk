import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../store/store"
import { useEffect } from "react"

const MyTeam = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { user } = useSelector((state:RootState) => state.user )

  
  
  return (
    <div>MyTeam</div>
  )
}

export default MyTeam