const fs = require('fs');
fs.readFile('day25data.txt', 'utf8', (err, data) => {
  const SUBJNUM = 7;
  const [cardpub, doorpub] = data.split("\r\n").map(n => parseInt(n));
  console.log(cardpub, doorpub);

  const loopSize = (num, subjectnum) => {
    let loops = 0;
    let currNum = 1;
    while (currNum !== num) {
      loops += 1;
      currNum *= subjectnum;
      currNum = currNum % 20201227;
      // console.log(currNum);
    }
    return loops;
  }
  const cardLoop = loopSize(cardpub, SUBJNUM);
  const doorLoop = loopSize(doorpub, SUBJNUM);
  console.log(cardLoop, doorLoop);

  const loop = (pubKey, loopSize) => {
    let currNum = 1;
    for (let i = 0; i < loopSize; i++ ) {
      currNum *= pubKey;
      currNum = currNum % 20201227;
      // console.log(currNum);
    }
    return currNum;
  }

  console.log(loop(cardpub, doorLoop));
  console.log(loop(doorpub, cardLoop));

})