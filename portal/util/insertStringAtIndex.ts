export default (str: string, substring: string, index: number) => {
  return str.substring(0, index) + substring + str.substring(index);
};
