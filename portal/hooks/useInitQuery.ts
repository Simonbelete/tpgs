import { useEffect } from "react";
import { FilterState, filterSlice } from "@/store/slices";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

const useInitQuery = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    const result: FilterState = {
      search: (router.query.search as string) || "",
      is_active: router.query.is_active === 'true' ? true : false,
      filters: {}
    }

    for(const key in router.query) {
      if(['search', 'is_active'].includes(key)) continue;

      if(key.includes('__in')) {
        const q: string = (router.query[key] as string) || "";
        result.filters[key] = q.split(','); 
      }else {
        result.filters[key] = router.query[key];
      }

    }

    dispatch(filterSlice.actions.init(result))

  }, [router.isReady])
}

export default useInitQuery;