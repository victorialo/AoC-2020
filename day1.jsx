// fetch('https://adventofcode.com/2020/day/1/input')
//   .then((response) => {
//     return data;
//   })
//   .then ((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(error);
//   });
// let fr = newFileReader();
// fr.onload = () => {
//   document.textContent = fr.result;
// }
// fr.readAsText(this.files[0]);
// console.log(fr.result);
const fs = require('fs');
// let final = 0;
fs.readFile('day1data.txt', (err, data) => {
  let d = data.toString();
  let nums = d.split("\n").map((n) => parseInt((n)));
  // console.log(nums);
  let diffs = [];
  for (let i=0; i < nums.length; i++) {
    const n = nums[i];
    if (diffs.includes(n)) {
      // final = n * (2020-n);
      console.log(n * (2020-n), n);
      return;
    } else {
      diffs.push(2020-n);
    }
  }
});
// console.log(final);


// const fs = require('fs');
// let final = 0;
fs.readFile('day1data.txt', (err, data) => {
  let d = data.toString();
  let nums = d.split("\n").map((n) => parseInt((n)));
  // console.log(nums);
  // let diffs = {};
  for (let i=0; i < nums.length; i++) {
    const n = nums[i];
    // if (diffs[n])) {
    //   // final = n * (2020-n);
    //   console.log(n * (2020-n), n);
    //   return;
    // } else {
    //   diffs[2020-n] = diffs[2020-n] || [];
    //   if (diffs[2020-n].length == 1) {
    //     const n2 = diffs[2020-n][0];
    //     diffs[2020-n-n2] = [n, n2];
    //   }
    //   diffs[2020-n].push(n);
    // }
    for (let j=0; j < nums.length; j++) {
      const third = 2020 - n - nums[j];
      if (nums.includes(third)) {
        console.log(n * nums[j] * third, n, nums[j]);
        return;
      }
    }
  }
});
// console.log(final);