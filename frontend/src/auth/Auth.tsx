// import { useAuth0 } from "@auth0/auth0-react";

import { useState } from "react"
import { Link } from "react-router-dom"
import type { userData } from "../store/userSlice"

// function Auth() {
//   const {
//     isLoading, // Loading state, the SDK needs to reach Auth0 on load
//     isAuthenticated,
//     error,
//     loginWithRedirect: login, // Starts the login flow
//     logout: auth0Logout, // Starts the logout flow
//     user, // User profile
//   } = useAuth0();

//   const signup = () =>
//     login({ authorizationParams: { screen_hint: "signup" } });

//   const logout = () =>
//     auth0Logout({ logoutParams: { returnTo: window.location.origin } });

//   if (isLoading) return "Loading...";

//   return isAuthenticated ? (
//     <>
//       <p>Logged in as {user?.email}</p>

//       <h1>User Profile</h1>

//       <pre>{JSON.stringify(user, null, 2)}</pre>

//       <button onClick={logout}>Logout</button>
//     </>
//   ) : (
//     <>
//       {error && <p>Error: {error.message}</p>}

//       <button onClick={signup}>Signup</button>

//       <button onClick={e=>login}>Login</button>
//     </>
//   );
// }

// export default Auth;



interface props {
  name: string
  onEvent: (data: userData) => void
}

const Auth: React.FC<props> = ({ name , onEvent }) => {

  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setData((data) => ({
      ...data,
      [name]: value
    }))
  }

  const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    onEvent(data)
  }

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white text-gray-500 max-w-85 w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">{name}</h2>
        {
          name === "Sign up" && (
            <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
              <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.125 13.125a4.375 4.375 0 0 1 8.75 0M10 4.375a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input onChange={handleChange} className="w-full outline-none bg-transparent py-2.5" type="text" placeholder="Username" name="username" required />
            </div>
          )
        }
        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375" stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z" stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <input onChange={handleChange} className="w-full outline-none bg-transparent py-2.5" type="email" placeholder="Email" name="email" required />
        </div>
        <div className="flex items-center mt-2 mb-8 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375" stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z" stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <input onChange={handleChange} className="w-full outline-none bg-transparent py-2.5" type="password" placeholder="Password" name="password" required />
        </div>



        <button className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">Create Account</button>

        <div className="flex items-center justify-center">
          <button className="px-4 py-2 border flex gap-2 border-slate-200 rounded-md text-slate-700 dark:text-slate-200 hover:border-slate-400  hover:text-slate-900 hover:shadow transition duration-150 w-full items-center justify-center">
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
            <span className="text-gray-600">Login with Google</span>
          </button>
        </div>

        {
          name === "Sign up" && 
          (<p className="text-center mt-4">Already have an account? <Link to='/login' className="text-blue-500 underline">Log In</Link></p>)
        }

        {
          name === "Login" && 
          (<p className="text-center mt-4">Didn't Already have an account? <Link to='/signup' className="text-blue-500 underline">Sign Up</Link></p>)
        }

      </form>
    </div>
  )
}

export default Auth