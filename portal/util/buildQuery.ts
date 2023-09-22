export default (data: any): Object => {
  let result: any = {}
  for(const key in data) {
    if(data[key].isArray) {
      result[`${key}__in`] = data[key].map((e: any) => e.id).join(',')
    }else {
      result[key] = data[key]
    }
  }
  return result;
}