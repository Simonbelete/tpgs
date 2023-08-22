export default interface Response<T = any> {
  count?: number;
  results: T;
}
