// max num
const maxNumber = (arrNumber) => {
  let n = arrNumber[0];
  arrNumber.map((ar_n) => {
    if (ar_n > n) {
      n = ar_n;
    }
  });
  return n;
};

const max2ndNum = (arr) => {
  const n = maxNumber(arr);
  const index = arr.indexOf(n);
  delete arr[index];
  const n2 = maxNumber(arr);
  return n2;
};

const max2ndNumber = (arr) => {
  let n1 = arr[0],
    n2 = arr[1],
    temp;
  for (const n of arr) {
    if (n > n2) {
      temp = n2;
      n2 = n;
    }
    if (n2 > temp) {
      n1 = temp;
    }
  }
  return {
    n1,
    n2,
  };
};
const arr = [4, 5, 12, 10, 3];
console.log(max2ndNumber(arr));

const fun1 = (args, callback) => {
  callback(args);
};

setTimeout(function () {
  console.log("hello");
}, 0);

console.log("world");
