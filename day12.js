const fs = require('fs');
fs.readFile('day12data.txt', (err, data) => {
  const movements = data.toString().split("\r\n");
  // console.log(movements);
  let currentDir = 'E';
  let EW = 0;
  let NS = 0;

  const move = (dir, num, NS, EW) => {
    let newNS = NS;
    let newEW = EW;
    switch (dir) {
      case 'N':
        newNS += num;
        break;
      case 'S':
        newNS -= num;
        break;
      case 'E':
        newEW -= num;
        break;
      case 'W':
        newEW += num;
        break;
    }
    // console.log(newNS, newEW);
    return [newNS, newEW];
  }

  const rotate = (dir, num) => {
    const mappingDir = {'N': 0, 'E': 90, 'S': 180, 'W': 270};
    const mappingAngle = {0: 'N', 90: 'E', 180: 'S', 270: 'W', 360: 'N'};
    let currAngle = mappingDir[currentDir];
    if (dir === 'R') {
      currAngle = (currAngle + num) % 360;
    } else if (dir === 'L') {
      currAngle = (currAngle - num) % 360;
    }
    if (currAngle < 0) { currAngle += 360 }
    // console.log(currAngle);
    return mappingAngle[currAngle];
  }
  movements.forEach((m) => {
    let [dir, num] = m.split(/(\d+)/);
    num = parseInt(num);
    // console.log(dir, num);
    if (['N', 'S', 'E', 'W'].includes(dir)) {
      [NS, EW] = move(dir, num, NS, EW);
    } else if (dir === 'F') {
      [NS, EW] = move(currentDir, num, NS, EW);
    } else if (['L', 'R'].includes(dir)) {
      currentDir = rotate(dir, num);
    }
    // console.log("currentDir NS EW", currentDir, NS, EW);
  });

  console.log(Math.abs(EW) + Math.abs(NS));


})

fs.readFile('day12data.txt', (err, data) => {
  const movements = data.toString().split("\r\n");
  // let currentDir = 'E';
  let sEW = 0;
  let sNS = 0;
  let wEW = 10;
  let wNS = 1;

  const move = (dir, num, NS, EW) => {
    let newNS = NS;
    let newEW = EW;
    switch (dir) {
      case 'N':
        newNS += num;
        break;
      case 'S':
        newNS -= num;
        break;
      case 'E':
        newEW += num;
        break;
      case 'W':
        newEW -= num;
        break;
    }
    // console.log(newNS, newEW);
    return [newNS, newEW];
  }

  const rotate = (dir, num, wEW, wNS) => {
    // const mappingDir = {'N': 0, 'E': 90, 'S': 180, 'W': 270};
    // const mappingAngle = {0: 'N', 90: 'E', 180: 'S', 270: 'W', 360: 'N'};
    // let currAngle = mappingDir[currentDir];
    // const r = Math.sqrt(sEW**2 + sNS**2)
    // const angle = (sNS-wNS)/(sEW-wEW);
    // let radians = (Math.PI / 180) * num;
    // const cos = Math.cos(radians);
    // const sin = Math.sin(radians);
    // const [cx,cy] = [sEW, sNS];
    // const [x, y] = [wEW, wNS];
    // s + R(w-s)
    // console.log(dir, wEW, wNS, num, "expecting -10, 4");
    let wEW2 = wEW;
    let wNS2 = wNS;
    if (dir === 'R') {
      // [x, y] = [y, -x] === [wEW, wNS] = [wNS, -wEW]
      for (let i = 0; i < num/90; i++) {
        [wEW2, wNS2] = [wNS2, -wEW2];
      }
      // wEW2 = wNS * (num/90);
      // wNS2 = -wEW * (num/90);
      // currAngle = (currAngle + num) % 360;
      // wEW = sEW + (r * Math.cos((num + angle) * Math.PI / 180));
      // wNS = sNS + (r * Math.sin((num + angle) * Math.PI / 180));
      // wEW = sEW + (wNS)
      // radians = radians;

    } else if (dir === 'L') {
      // [x, y] = [-y, x] === [wEW, wNS] = [-wNS, wEW]
      // wEW2 = -wNS * (num/90);
      // wNS2 = wEW * (num/90);
      for (let i = 0; i < num/90; i++) {
        [wEW2, wNS2] = [-wNS2, wEW2];
      }
      // currAngle = (currAngle - num) % 360;
      // wEW = sEW + (r * Math.cos((num - angle)* Math.PI / 180));
      // wNS = sNS + (r * Math.sin((num - angle)* Math.PI / 180));
      // radians *= -1;
    }
    // if (currAngle < 0) { currAngle += 360 }
    // // console.log(currAngle);
    // return mappingAngle[currAngle];
    // wEW = (cos * (x - cx)) + (sin * (y - cy)) + cx;
    // wNS = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [wEW2, wNS2];
  }
  movements.forEach((m) => {
    let [dir, num] = m.split(/(\d+)/);
    num = parseInt(num);
    // console.log(dir, num);
    if (['N', 'S', 'E', 'W'].includes(dir)) {
      [wNS, wEW] = move(dir, num, wNS, wEW);
    } else if (dir === 'F') {
      sNS += wNS*num;
      sEW += wEW*num;
    } else if (['L', 'R'].includes(dir)) {
      // currentDir = rotate(dir, num);
      [wEW, wNS] = rotate(dir, num, wEW, wNS);
    }
    console.log(dir, num, "sEW sNS", sEW, sNS, "wEW wNS", wEW, wNS);
  });

  console.log(Math.abs(sEW) + Math.abs(sNS));


})