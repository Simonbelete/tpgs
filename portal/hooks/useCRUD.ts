import { useEffect } from "react";
import { TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react'
import errorToForm from "@/util/errorToForm";

const useCRUD = ({results, setError }: {results: any[], setError: any}) => {
  const process201 = () => {
    
  }

  for(const result of results) {
    const error = result.error
    const isError = result.isError
    const isSuccess = result.isSuccess

    let data = {}
    
    if(isError) data = error.data
    else if(isSuccess) data = result.data

    const statusCode = isError && !isSuccess ? error.status : 0

    console.log(result);
    console.log('sTatsu')
    console.log(statusCode)
    console.log(data)

    if(isError) {
      if(statusCode == 400) errorToForm(data, setError);
    } else {
    }
  }
}

export default useCRUD;