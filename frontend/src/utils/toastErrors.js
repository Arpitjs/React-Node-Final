import { toast } from "react-toastify";

const toastErrors = (error) => {
  return toast.error(
    error.msg ? error.msg : error.err.msg ? error.err.msg : error.err.message
  );
};

export { toastErrors };
