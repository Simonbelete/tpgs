import { GridSortModel } from "@mui/x-data-grid";

export default (data: GridSortModel): Object => {
  let result: any = {};
  if (data[0].sort == "asc") {
    return {
      ordering: data[0].field,
    };
  } else if (data[0].sort == "desc") {
    return {
      ordering: `-${data[0].field}`,
    };
  } else {
    return "";
  }

  return result;
};
