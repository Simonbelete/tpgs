export default (negative: boolean = false) => {
  if (negative) return Math.random() * -100;
  return Math.random() * 100;
};
