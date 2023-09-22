import { useEffect } from "react";
import { TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react'
import errorToForm from "@/util/errorToForm";
import { useSnackbar } from "notistack";

const useCRUD = ({results, setError }: {results: any[], setError?: any}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    for(const result of results) {
      if(result.status !== "fulfilled") continue;
      console.log('------');
      console.log(result)
      
      const isError = result.isError
      const isSuccess = result.isSuccess
  
      let data: any = {}
      let statusCode: number = 0
      
      if(isError) {
         data = result.error.data
         statusCode = result.error.status
      }
      else if(isSuccess) {
        data = result.data
        statusCode = result.data.status
      }
  
      if(isError) {
        if(statusCode == 400) errorToForm(data, setError);
      } else if(isSuccess) {
        if(statusCode == 201) enqueueSnackbar("Created", {variant: 'success'})
        console.log(statusCode)
        if(statusCode == 200) enqueueSnackbar("Updated Success", {variant: 'success'})
      } 
    }
  }, [results])
}

export default useCRUD;