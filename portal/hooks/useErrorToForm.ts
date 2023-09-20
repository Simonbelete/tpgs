import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";
import errorToForm from "@/util/errorToForm";

const useErrorToForm = (errors: Array<any>, setError: any) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    for(let i=0; i< errors.length; i=i+1) {
      if(errors[i] === undefined) continue;

      if(errors[i].status == 400) {
        errorToForm(errors[i].data, setError);
      }
    }
  }, [errors])
}

export default useErrorToForm;