function callAll(...fns) {
  return function callAllImpl(event, ...args) {
    return fns.some(function invoke(fn) {
      if (fn) {
        return fn(event, ...args);
      }
      return undefined;
    });
  };
}

export default callAll;
