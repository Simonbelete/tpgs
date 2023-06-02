import { toast } from "react-toastify";

export const alert = ({ message }: { message: string }) => {
  return toast(message);
};

export const alertError = ({ message = "Error" }: { message?: string }) => {
  return toast.error(message);
};

export const alertWarning = ({ message }: { message: string }) => {
  return toast.warning(message);
};

export const alertInfo = ({ message }: { message: string }) => {
  return toast.info(message);
};

export const alertSuccess = ({ message = "Success" }: { message?: string }) => {
  return toast.success(message);
};
