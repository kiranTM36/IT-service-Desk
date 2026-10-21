import { useDispatch } from "react-redux";
import { LoginAction, type userData } from "../store/userSlice"
import Auth from "./Auth";
import { type AppDispatch } from "../store/store";

const Login = () => {
    const dispatch = useDispatch<AppDispatch>()
    const handleLogin = async(data : userData) => {
        await dispatch(LoginAction(data))
    }
  return (
    <Auth name="Login" onEvent={handleLogin} />
  )
}

export default Login