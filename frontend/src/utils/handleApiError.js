import { toast } from "react-toastify";

const handleApiError = (error, functionName) => {
  const message =
    error?.response?.data?.message || error?.message || "Unknown error";

  console.log(`Error in ${functionName}:`, message);

  toast.error(message);

  return message;
};

export default handleApiError;
