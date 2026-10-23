import { useDispatch } from "react-redux";
import { LoginAction, type userData } from "../store/userSlice"
import Auth from "./Auth";
import { type AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const handleLogin = async(data : userData) => {
        const success = await dispatch(LoginAction(data))

        if(success){
          navigate('/')
        }
    }
  return (
    <Auth name="Login" onEvent={handleLogin} />
  )
}

export default Login