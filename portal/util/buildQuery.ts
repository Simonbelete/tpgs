export default (data: any, dataValueKey?: string): Object => {
  let result: any = {}
  for(const key in data) {
    if(Array.isArray(data[key])) {
      const query = data[key].map((e: any) => dataValueKey ? e[dataValueKey] : e.id)
      if(Array.isArray(query) && query.length > 1)
        result[`${key}__in`] = query.join(',')
      else
        result[`${key}`] = query[0]
    }else {
      result[key] = data[key]
    }
  }

  return result;
}