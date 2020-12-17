const fs = require("fs");
fs.readFile('day10data.txt', (err, data) => {
  const nums = data.toString().split("\r\n").map((n) => parseInt((n))).sort((a,b) => a-b );
  console.log(nums);
  let currentJ = 0;
  let counts = Array(3).fill(0);
  // console.log(counts);
  nums.forEach((n) => {
    const diff = n - currentJ;
    // console.log(diff);
    if (diff < 1 || diff > 3) {
      console.log("bad adapter", diff);
    } else {
      counts[diff-1] += 1;
      currentJ = n;
    }

  })
  console.log(counts, counts[0] * (counts[2]+1));

  let streaks = Array(6).fill(0);
  let currStreak = 0;
  nums.unshift(0);
  // console.log("wtf", nums2);
  nums.forEach((n, i) => {
    const diff = n - nums[i-1];
    if (diff === 1) {
      currStreak += 1;
      // console.log("current streak", currStreak, "between", n, nums[i-1]);
      if (i === nums.length-1) {
        streaks[currStreak] += 1;
        currStreak = 0;
      }
    } else {
        streaks[currStreak] += 1;
        currStreak = 0;
    }
  })
  console.log("streak count", streaks);

  const perms = [0, 1, 2, 4, 7];

  let total = 1;
  for (let i=2; i < perms.length; i++ ) {
    if (streaks[i] > 0) {
      total *= perms[i] ** streaks[i];
      // console.log(total, "using", perms[i], streaks[i]);
    }
    console.log(total);
  }


})