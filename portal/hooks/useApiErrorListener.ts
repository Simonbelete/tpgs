import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";
import errorToForm from "@/util/errorToForm";

const useApiErrorListener = (errors: Array<unknown>, setError: () => void) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    for(let i=0; i< errors.length; i=i+1) {
      // @ts-ignore
      if(errors[i].status == 400) {
        errorToForm(errors[i], setError);
      }
      // enqueueSnackbar("Error", {variant: "error"});
    }
  }, [errors])
}

export default useApiErrorListener;