import { useState } from "react";
import { useUserContext } from "../context/UserContext";

const AUTH_MODE = {
  LOGIN: "login",
  SIGNUP: "signup",
};

const Login = () => {
  const [currentState, setCurrentState] = useState(AUTH_MODE.LOGIN);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, register, isLoggingIn, isRegistering } = useUserContext();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currentState === AUTH_MODE.LOGIN) {
      login(email, password);
    } else {
      register(name, email, password);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">
          {currentState === AUTH_MODE.SIGNUP ? "Sign Up" : "Login"}
        </p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === AUTH_MODE.SIGNUP && (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="w-full px-3 py-3 border border-gray-800"
          placeholder="Name"
        />
      )}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="w-full px-3 py-3 border border-gray-800"
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="w-full px-3 py-3 border border-gray-800"
        placeholder="Password"
      />
      <div className="w-full text-center text-sm -mt-2">
        {/* <p className="cursor-pointer hover:underline underline-offset-2">
          Forgot your password?
        </p> */}
        {currentState === AUTH_MODE.SIGNUP ? (
          <p>
            Already have an account?
            <span
              onClick={() => {
                setCurrentState(AUTH_MODE.LOGIN);
              }}
              className="cursor-pointer hover:underline underline-offset-2 ml-1"
            >
              Login
            </span>
          </p>
        ) : (
          <p>
            Don't have an account?
            <span
              className="cursor-pointer hover:underline underline-offset-2 ml-1"
              onClick={() => {
                setCurrentState(AUTH_MODE.SIGNUP);
              }}
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
      <button className="bg-black text-white px-8 py-2 mt-4 font-light">
        {currentState === AUTH_MODE.SIGNUP ? "Sign Up" : "Login"}
      </button>
    </form>
  );
};
export default Login;
