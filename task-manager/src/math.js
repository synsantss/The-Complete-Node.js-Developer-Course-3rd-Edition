const calculateTip = (total, tipPercent = 0.5) => total + total * tipPercent;
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000);
  });
};

module.exports = {
  calculateTip,
  add
};
