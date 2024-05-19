import { Console } from 'console';
import _ from 'lodash';

export default (data: any, dataValueKey?: string): Object => {
  let result: any = {}
  for(const key in data) {
    if(Array.isArray(data[key])) {
      // Use id as a default filter value
      const query = data[key].map((e: any) => dataValueKey ? e[dataValueKey] : e.id)
      if(Array.isArray(query) && query.length > 1) {
        result[`${key}__in`] = query.join(',')
      }
      else{
        result[`${key}`] = query[0]
      }

      // NULL Filter
      const nullFilterIndex = _.find(data[key], (f) => _.has(f, '__isnull'))
      if(nullFilterIndex != undefined) result[`${key}__isnull`] = true;
    }else {
      result[key] = data[key]
    }
  }

  return result;
}