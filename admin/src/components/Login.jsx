import { useContext, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAdminContext } from "../context/AdminContext";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const DEMO_EMAIL = "admin@gmail.com";
const DEMO_PASSWORD = "admin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoggingIn } = useAdminContext();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="">
        {/* Demo banner for recruiters */}
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-700 flex flex-col gap-1 items-center">
          <p>🔐 Demo mode available</p>
          <button
            type="button"
            onClick={() => {
              setEmail(DEMO_EMAIL);
              setPassword(DEMO_PASSWORD);
            }}
            className="underline font-medium hover:text-yellow-900"
          >
            Click here to auto-fill demo credentials
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3 min-w-72">
              <p className="font-medium text-gray-700 mb-2">Email Address</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email address"
                className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              />
            </div>
            <div className="mb-3 min-w-72">
              <p className="font-medium text-gray-700 mb-2">Password</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              />
            </div>
            <button
              className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
