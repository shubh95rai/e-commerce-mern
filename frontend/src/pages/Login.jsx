import { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Sign Up" && (
        <input
          type="text"
          required
          className="w-full px-3 py-3 border border-gray-800"
          placeholder="Name"
        />
      )}
      <input
        type="email"
        required
        className="w-full px-3 py-3 border border-gray-800"
        placeholder="Email"
      />
      <input
        type="password"
        required
        className="w-full px-3 py-3 border border-gray-800"
        placeholder="Password"
      />
      <div className="w-full text-center text-sm -mt-2">
        {/* <p className="cursor-pointer hover:underline underline-offset-2">
          Forgot your password?
        </p> */}
        {currentState === "Sign Up" ? (
          <p>
            Already have an account?
            <span
              onClick={() => {
                setCurrentState("Login");
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
                setCurrentState("Sign Up");
              }}
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
      <button className="bg-black text-white px-8 py-2 mt-4 font-light">
        {currentState === "Sign Up" ? "Sign Up" : "Login"}
      </button>
    </form>
  );
};
export default Login;
