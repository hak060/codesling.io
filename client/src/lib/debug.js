const debug = (...args) => {
  process.env.REACT_APP_DEBUG === 'true' && console.log(...args);
};

export default debug;
