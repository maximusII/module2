export const greet = function() {
    return "hello";
  },

export const reduceFunc = function(arr) {
  if (!Array.isArray(arr)) {
    return false;
  }
  return Number(arr.reduce((acc, el) => acc + el, 0).toFixed(1));
  }

