export default (...args) => {
  return args.map((string) => (
    string.toLowerCase().split(" ").join("-")
  )).join("-")
}
