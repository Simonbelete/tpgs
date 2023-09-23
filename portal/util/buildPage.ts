export default ({page, pageSize}: {page: number, pageSize: number}) => {
  const offset = page * pageSize;
  return {
    limit: pageSize,
    offset: offset
  }
}