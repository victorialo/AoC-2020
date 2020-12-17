const fs = require('fs');
const crt = require('nodejs-chinese-remainder');
fs.readFile('day13data.txt', (err, data) => {
  let [startTime, buses] = data.toString().split("\r\n");
  // console.log(info);
  startTime = parseInt(startTime);
  const buses2 = buses.split(',').filter((b) => b !== 'x').map((n) => parseInt(n));
  console.log(startTime, buses2);
  let found = 0;
  let busTime = startTime;
  while (found === 0) {
    busTime += 1;
    for (let i in buses2) {
      if (busTime % buses2[i] === 0) { found = buses2[i] }
    }
  }
  console.log(busTime, found, found * (busTime - startTime));

  // console.log( '   x = 5 mod4' );
  // console.log( '   x = 3 mod5' );
  // console.log( '   x = 7 mod11' );
  // console.log( '  The solution is: ' + crt([5,3,7], [4,5,11]));
//  x % 7 === 0
//  x % 13 === 1
//   x = 7 mod 0
  // x = 13 mod 1

  // 7a = x
  // 13b = x+1
  // 59c = x+4
  // 31d = x+6
  // 19e = x+7
  // [7 0 0 0 1]
  const buses3 = buses.split(','); //.map(n => parseInt(n));
  console.log(buses3);
  let divisors = [];
  let remainders = [];
  for (let i = 0; i < buses3.length; i++) {
    if (buses3[i] !== 'x') {
      divisors.push(parseInt(buses3[i]));
      remainders.push(i);
    }
  }
  // console.log("crt", crt([5,3,7], [4,5,11]));
  console.log(divisors, remainders);

//  all numbers are prime
//  13*7*59-59
//   (13*7*59)-91
  let matches = [divisors[0]];
  let lcm = divisors[0];
  for (let i = 1; i < divisors.length; i++) {
    let currentFactor = divisors[i];
    let t = matches[i-1];

    // let currentBigger = currentFactor;
    // let currentSmaller = smallerFactor;

    console.log(currentFactor, lcm);
    // let latestMatch = 0;
    // while ((currentBigger - remainders[i]) % divisors[i-1] !== 0) {
    //   console.log("checking", smallerFactor, currentBigger);
    //   if (currentBigger < smallerFactor) {
    //     currentBigger += currentFactor;
    //   } else {
    //     t += lcm;
    //   }
    // }
    while ((t + remainders[i]) % currentFactor !== 0) {
      t += lcm;
    }
    // latestMatch = currentSmaller;
    // matches.push(latestMatch);
    lcm *= currentFactor;
    // currentSmaller = currentBigger - remainders[i];
    // console.log("currentSmaller", currentSmaller);
    matches.push(t);
    console.log("t", t);
  }



});