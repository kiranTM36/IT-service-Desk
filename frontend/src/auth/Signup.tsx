import { type userData } from "../store/userSlice"
import Auth from "./Auth";

const Signup = () => {
    const handleSignup = async(data : userData) => {
        console.log("Signup Data",data);
        
    }
  return (
    <Auth name="Sign up" onEvent={handleSignup} />
  )
}

export default Signup