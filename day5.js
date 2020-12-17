const fs = require('fs');
fs.readFile('day5data.txt', (err, data) => {
  const d = data.toString().split('\n');
  // console.log(d);

  const binaryRange = (begin, end, letter) => {
    const mid = Math.floor((begin+end)/2);
    if (letter === 'F' || letter === 'L') {
      return [begin, mid];
    } else if (letter === 'B' || letter === 'R') {
      return [mid+1, end];
    }
  }

  let highest = 0;
  d.forEach((p) => {
    let beginRow = 0;
    let endRow = 127;
    let beginCol = 0;
    let endCol = 7;
    // let row = 0;
    // let col = 0;
    p.split('').forEach((d) => {
      if (['F', 'B'].includes(d)) {
        let [newBeginRow, newEndRow] = binaryRange(beginRow, endRow, d);
        // console.log(newBeginRow, newEndRow);
        beginRow = newBeginRow;
        endRow = newEndRow;
      } else if (['L', 'R'].includes(d)) {
        let [newBeginCol, newEndCol] = binaryRange(beginCol, endCol, d);
        // console.log(newBeginCol, newEndCol);
        beginCol = newBeginCol;
        endCol = newEndCol;
      }
    })
    let id = beginRow * 8 + beginCol;
    // console.log("id", id);
    if (id > highest) { highest = id; }
  })
  console.log(highest);
});



let seats = [];
fs.readFile('day5data.txt', (err, data) => {
  const d = data.toString().split('\n');

  const binaryRange = (begin, end, letter) => {
    const mid = Math.floor((begin+end)/2);
    if (letter === 'F' || letter === 'L') {
      return [begin, mid];
    } else if (letter === 'B' || letter === 'R') {
      return [mid+1, end];
    }
  }

  // let highest = 0;
  d.forEach((p) => {
    let beginRow = 0;
    let endRow = 127;
    let beginCol = 0;
    let endCol = 7;
    p.split('').forEach((d) => {
      if (['F', 'B'].includes(d)) {
        let [newBeginRow, newEndRow] = binaryRange(beginRow, endRow, d);
        // console.log(newBeginRow, newEndRow);
        beginRow = newBeginRow;
        endRow = newEndRow;
      } else if (['L', 'R'].includes(d)) {
        let [newBeginCol, newEndCol] = binaryRange(beginCol, endCol, d);
        // console.log(newBeginCol, newEndCol);
        beginCol = newBeginCol;
        endCol = newEndCol;
      }
    })
    let id = beginRow * 8 + beginCol;
    // console.log("id", id);
    // if (id > highest) { highest = id; }
    seats.push(id);
  })
  // console.log(highest);
  seats.sort((a,b) => {return a-b});
  // console.log(seats);
  const min = seats[0];
  const max = seats[seats.length-1];

  const full = Array.from(new Array(max-min), (x, i) => i + min);
  // console.log(full);
  for (let i = 0; i < full.length; i ++) {
    if (seats[i] !== full[i]) {
      console.log(full[i], "is your seat");
      break;
    }
  }
});


let seats2 = Array.from(new Array(1023), (x, i) => i + 1);
// console.log(seats2);
fs.readFile('day5data.txt', (err, data) => {
  const d = data.toString().split('\n');
  // console.log(d);

  const binaryRange = (begin, end, letter) => {
    const mid = Math.floor((begin+end)/2);
    if (letter === 'F' || letter === 'L') {
      return [begin, mid];
    } else if (letter === 'B' || letter === 'R') {
      return [mid+1, end];
    }
  }

  d.forEach((p) => {
    let beginRow = 0;
    let endRow = 127;
    let beginCol = 0;
    let endCol = 7;
    p.split('').forEach((d) => {
      if (['F', 'B'].includes(d)) {
        let [newBeginRow, newEndRow] = binaryRange(beginRow, endRow, d);
        // console.log(newBeginRow, newEndRow);
        beginRow = newBeginRow;
        endRow = newEndRow;
      } else if (['L', 'R'].includes(d)) {
        let [newBeginCol, newEndCol] = binaryRange(beginCol, endCol, d);
        // console.log(newBeginCol, newEndCol);
        beginCol = newBeginCol;
        endCol = newEndCol;
      }
    })
    let id = beginRow * 8 + beginCol;
    // console.log("id", id);
    // if (id > highest) { highest = id; }
    // seats.push(id);
    // seats.delete()
    seats2 = seats2.filter((i) => i !== id);
    // console.log(seats2);
  })
  console.log(seats2);
  // console.log(highest);
  // seats.sort((a,b) => {return a-b});
  // console.log(seats);
  // const min = seats[0];
  // const max = seats[seats.length-1];

  // const full = Array.from(new Array(max-min), (x, i) => i + min);
  // console.log(full);
});