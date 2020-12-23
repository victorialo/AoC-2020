const DATA = '398254716'; //'389125467';
const CYCLES = 100;
const CYCLES2 = 1;
let cups = DATA.split('').map(n => parseInt(n));
// console.log(cups);

const part1 = (cups, cycles, max) => {
  let num = cups[0];
  let currentCups = [...cups];
  for (let c = 0; c < cycles; c++ ) {
    if (c % 100 === 0) {console.log(`-- move ${c+1} --`)}
    // console.log(`-- move ${c+1} --`);
    // console.log("currentCup", num);
    const currentInd = currentCups.indexOf(num);
    const pickedUp = currentCups.splice(currentInd+1, 3);
    while (pickedUp.length < 3) {
      pickedUp.push(currentCups.shift());
    }
    // console.log(currentCups, pickedUp, currentInd, num);
    let dest = num - 1;
    // console.log(dest, currentCups.includes(dest));
    while (pickedUp.includes(dest)) {
      dest -= 1;
      if (dest < 1) {
        dest = max;
      }
      // console.log(dest);
    }
    const destIndex = currentCups.indexOf(dest);
    currentCups = [...currentCups.slice(0, destIndex+1), ...pickedUp, ...currentCups.slice(destIndex+1, cups.length-1)]
    // console.log("cups for next step", currentCups);
    let nextInd = currentCups.indexOf(num)+1;
    if (nextInd > cups.length-1) {
      nextInd = 0;
    }
    num = currentCups[nextInd];
  }
  return currentCups;
}
console.log(CYCLES, part1(cups, CYCLES, Math.max(...cups)));

const part2extend = cups => {
  // let cups = [...Array(max-min)].map((i,x)=>x+min);
  // let i = 0; let x = new Array(1000).fill(0).map(() => ++i);
  for (let i = Math.max(...cups)+1; i <= 1000000; i++) {
    cups.push(i);
  }
  return cups;
  // console.log(cups);
}

let lookup = new Map();
const createLookup = (lookup, cups) => {
  cups.forEach((n, i) => {
    lookup.set(n, cups[i+1]);
  })
  lookup.set(cups[cups.length-1], cups[0]);
  return lookup;
}
// console.log(createLookup(lookup, cups));

const part2lookup = (cups, cycles, max, lookup) => {
  let num = cups[0];
  // let currentCups = [...cups];
  for (let c = 0; c < cycles; c++ ) {
    if (c % 1000000 === 0) {console.log(`-- move ${c+1} --`)}
    const pickedUp = num => {
      let list = [];
      let cur = num;
      for (let i = 0; i < 3; i++) {
        cur = lookup.get(cur);
        list.push(cur);
      }
      return list;
    }
    let dest = num - 1;
    const picked = pickedUp(num);
    while (picked.includes(dest) || dest < 1) {
      dest -= 1;
      if (dest < 1) {
        dest = max;
      }
      // console.log(dest);
    }
    // console.log(picked, "setting",  num, "to", lookup.get(picked[2]));
    lookup.set(num, lookup.get(picked[2]));
    // console.log("dest", dest, lookup.get(dest));
    lookup.set(picked[2], lookup.get(dest));
    lookup.set(dest, picked[0]);
    // console.log(lookup);
    num = lookup.get(num);
  }
  return lookup;
}

const part22A = output => {
  const ind = output.indexOf(1);
  console.log("ind", ind, "out of", output.length);
  return output.slice(ind-2, ind+3);
}

const part22L = output => {
  let list = [];
  let cur = 1;
  for (let i = 0; i < 3; i++) {
    cur = output.get(cur);
    list.push(cur);
  }
  return list;
}
// console.log(part2(cups));
cups = part2extend(cups);
lookup = createLookup(lookup, cups);
const output = part2lookup(cups, 10000000, 1000000, lookup);
// console.log(output);
const final = part22L(output);
console.log(final, final[0] * final[1]);
