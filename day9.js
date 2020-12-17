const fs = require("fs");
const LIMIT = 25;
fs.readFile('day9data.txt', (err, data) => {
  const list = data.toString().split("\r\n").map((e) => parseInt(e));
  let lastFew = list.slice(0,LIMIT);
  console.log(lastFew);
  let wrongNumber = 0;
  for (let i=LIMIT; i < list.length; i++) {
    const currentNum = list[i];
    let moveOn = false;
    for (let j = 0; j < LIMIT; j++) {
      if (lastFew.includes(currentNum - lastFew[j])) {
        moveOn = true;
        lastFew.shift();
        lastFew.push(currentNum);
        break;
      }
    }
    if (moveOn === false) {
      console.log("never moved on", currentNum);
      wrongNumber = currentNum;
      break;
    }
    moveOn = false;
  }

  console.log(wrongNumber);
  let found = [];

  for (let k = 0; k < list.length; k++) {
    if (found.length > 0) { break }
    let subseq = [];
    let sum = 0;
    for (let l = k; l < list.length; l++ ) {
      if (sum < wrongNumber) {
        sum += list[l];
        // console.log("sum", sum);
        subseq.push(list[l]);
      } else if (sum === wrongNumber) {
        found = subseq;
        console.log("found", subseq, "sums", Math.min(...found) + Math.max(...found));
        break;
      } else {
        break;
      }
    }
  }



})