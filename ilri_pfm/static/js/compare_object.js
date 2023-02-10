const getUpdatedKeys = (oldData, newData) => {
  const data = uniq([...Object.keys(oldData), ...Object.keys(newData)]);
  const keys = [];
  for(const key of data){
    if(!isEqual(oldData[key], newData[key])){
      keys.push(key);
    }
  }

  return keys;
}
