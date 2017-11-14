export default (...args) => {
  if (process.env.DEBUG === 'TRUE') {
    console.log(...args);
  }
};
