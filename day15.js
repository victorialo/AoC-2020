const fs = require('fs');
fs.readFile('day15data.txt', (err,data) => {
  let list = data.toString().split(',').map((n) => parseInt(n));
  // console.log(list);
  // let positions = {};
  let positions = new Map();
  list.forEach((n,i) => {
    // positions[n] = positions[n] || [];
    positions.set(n,[i]);
    // positions[n].push(i);
  })

  for (let i = list.length; i < 2020; i++ ) {
    const previous = list[i-1];
    let diff = 0;
    if (positions.has(previous)) {
      const recent = positions.get(previous);
      if (recent.length >= 2) {
        const [one, two] = recent.slice(-2);
        diff = two-one;
      }
    }
    list.push(diff);
    if (positions.has(diff)) {
      positions.set(diff, [...positions.get(diff), i]);
    } else {
      positions.set(diff, [i]);
    }
    // if (i % 1000000) {console.log(diff);
  }
  console.log(list, positions, list.slice(-1)[0]);
})

fs.readFile('day15data.txt', (err,data) => {
  let list = data.toString().split(',').map((n) => parseInt(n));
  let positions = new Map();
  list.forEach((n,i) => {
    positions.set(n,[i]);
  })
  let previous = list.slice(-1)[0];

  for (let i = list.length; i < 30000000; i++ ) {
    // const previous = list[i-1];
    let diff = 0;
    let recent = [];
    if (positions.has(previous)) {
      recent = positions.get(previous);
      // console.log("previous", previous, recent);
      if (recent.length === 2) {
        // const [one, two] = recent;//.slice(-2);
        // diff = two-one;
        diff = recent[1] - recent[0];
      }
    }
    // list.push(diff);
    if (positions.has(diff)) {
      positions.set(diff, [positions.get(diff).slice(-1)[0], i]);
    } else {
      positions.set(diff, [i]);
    }
    previous = diff;
    if (i % 100000 === 0) {console.log(diff, "at", i)}
  }
  // console.log(list, positions, list.slice(-1)[0]);
  console.log(previous);
})