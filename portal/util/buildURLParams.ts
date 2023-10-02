export default (data: any): string => {
  let result: string = ""
  for(const key in data) {
    if(data[key].isArray) {
      result += `&${key}__in=` + data[key].map((e: any) => e.id).join(',')
    }else {
      result += `&${key}=` + data[key] 
    }
  }
  return result;
}