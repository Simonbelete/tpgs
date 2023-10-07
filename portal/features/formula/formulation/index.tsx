import React from "react";
import { useGetNutrientsQuery } from '@/features/nutrients/services';
import { Loading } from "@/components";

const Formulation = ({ saveRef }: { saveRef: React.Ref<unknown> }) => {
  const {data: nutrientsData, isLoading: nutrientsIsLoading } = useGetNutrientsQuery({limit: 100});

  return (
    <>
      <Loading open={true} />
    </>
  )
}

export default Formulation;