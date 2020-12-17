const fs = require('fs');
fs.readFile('day2data.txt', (err, data) => {
  const d = data.toString().split("\n");
  let correctPws = 0;
  // console.log(d);
  for (let i = 0; i < d.length; i++) {
    let [minmax, letter, pw] = d[i].split(' ');
    const [min, max] = minmax.split('-');
    letter = letter.split(':')[0];
    // console.log(min, max, letter, pw);
    let count = 0;
    pw.split('').forEach((l) => {
      if (l === letter) {
        count += 1;
      }
    })
    if (count >= min && count <= max) {
      correctPws += 1;
    }
  }
  console.log(correctPws);
});

fs.readFile('day2data.txt', (err, data) => {
  const d = data.toString().split("\n");
  let correctPws = 0;
  // console.log(d);
  for (let i = 0; i < d.length; i++) {
    let [positions, letter, pw] = d[i].split(' ');
    positions = positions.split('-').map((n) => parseInt((n)));
    letter = letter.split(':')[0];
    // console.log(min, max, letter, pw);
    // let count = 0;
    // positions.forEach((j) => {
    //   if (pw[j]
    // })
    // console.log(letter, positions, pw);
    if ((pw[positions[0]-1] === letter && pw[positions[1]-1] !== letter) || (pw[positions[0]-1] !== letter && pw[positions[1]-1] === letter)) {
      // console.log(pw[positions[0]-1], pw[positions[1]-1], positions, letter);
      correctPws += 1;
    }
  }
  console.log(correctPws);
});