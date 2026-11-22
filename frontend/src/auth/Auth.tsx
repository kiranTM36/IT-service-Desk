
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { googleSignup, type userData } from "../store/userSlice";
import type { AppDispatch } from "../store/store";

interface Props {
  name: string;
  onEvent: (data: userData) => void;
}

const Auth: React.FC<Props> = ({ name, onEvent }) => {
  const {
    loginWithRedirect,
    isLoading,
    isAuthenticated,
    user,
  } = useAuth0();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const googleProcessed = useRef(false);

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Normal email/password input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Normal signup/login
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEvent(data as userData);
  };

  // Google login and signup use the same Auth0 flow
  const handleGoogleAuth = async () => {
    try {
      setError("");

      // Save this before redirecting because React state
      // will not survive the Auth0 redirect.
      sessionStorage.setItem("googleAuthRequested", "true");

      await loginWithRedirect({
        authorizationParams: {
          connection: "google-oauth2",
        },
        appState: {
          returnTo: window.location.pathname,
        },
      });
    } catch (error) {
      sessionStorage.removeItem("googleAuthRequested");
      console.error("Google authentication error:", error);
      setError("Unable to start Google authentication.");
    }
  };

  // Runs after Auth0 redirects back to the application
  useEffect(() => {
    const processGoogleAuth = async () => {
      const requested = sessionStorage.getItem("googleAuthRequested");

      // Do not call backend just because Auth0 has a session.
      if (!requested || !isAuthenticated || !user) return;

      // Prevent duplicate requests.
      if (googleProcessed.current) return;

      if (!user.email || !user.sub) {
        setError("Google account email or ID is missing.");
        sessionStorage.removeItem("googleAuthRequested");
        return;
      }

      googleProcessed.current = true;
      sessionStorage.removeItem("googleAuthRequested");

      try {
        const googleData = {
          email: user.email,
          sub: user.sub,
          name: user.name || user.nickname || user.email,
        };

        console.log("Sending Google user to backend:", googleData);

        const response = await dispatch(googleSignup(googleData));

        console.log("Google backend response:", response);

        // Your thunk should return response.data.
        if (response?.success === true || response?.success === undefined) {
          navigate("/");
        } else {
          setError("Google authentication failed.");
          googleProcessed.current = false;
        }
      } catch (error) {
        console.error("Google backend error:", error);
        setError("Google authentication failed. Please try again.");
        googleProcessed.current = false;
      }
    };

    processGoogleAuth();
  }, [isAuthenticated, user, dispatch, navigate]);

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 max-w-85 w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">
          {name}
        </h2>

        {name === "Sign up" && (
          <input
            onChange={handleChange}
            value={data.username}
            className="w-full border rounded p-2.5 my-2"
            type="text"
            placeholder="Username"
            name="username"
            required
          />
        )}

        <input
          onChange={handleChange}
          value={data.email}
          className="w-full border rounded p-2.5 my-2"
          type="email"
          placeholder="Email"
          name="email"
          required
        />

        <input
          onChange={handleChange}
          value={data.password}
          className="w-full border rounded p-2.5 my-2 mb-8"
          type="password"
          placeholder="Password"
          name="password"
          required
        />

        <button
          type="submit"
          className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 py-2.5 rounded text-white font-medium"
        >
          {name === "Login" ? "Login" : "Create Account"}
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="h-px bg-gray-200 flex-1" />
          <span>OR</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <button
          type="button"
          onClick={handleGoogleAuth}
          className="px-4 py-2 border rounded-md w-full flex gap-2 items-center justify-center hover:bg-gray-50"
        >
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
          />

          {name === "Sign up"
            ? "Sign up with Google"
            : "Login with Google"}
        </button>

        {error && (
          <p className="text-red-500 text-center mt-4">
            {error}
          </p>
        )}

        {name === "Sign up" && (
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 underline">
              Log In
            </Link>
          </p>
        )}

        {name === "Login" && (
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 underline">
              Sign Up
            </Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default Auth;
