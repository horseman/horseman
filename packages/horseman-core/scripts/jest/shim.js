// Fail tests on any warning
console.error = message => {
  throw new Error(message);
};

// https://reactjs.org/docs/javascript-environment-requirements.html
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};
