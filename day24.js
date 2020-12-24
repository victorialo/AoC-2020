const fs = require('fs');
fs.readFile('day24data.txt', 'utf8', (err, data) => {

  const dir = {
    'e': [1,-1,0],
    'se': [0,-1,1],
    'sw': [-1,0,1],
    'w': [-1,1,0],
    'nw': [0,1,-1],
    'ne': [1,0,-1]
  }
  const dirs = Object.keys(dir);
  const neighbors = Object.values(dir);

  const part1 = (data) => {
    const toFlip = data.trim().split("\r\n");
    // console.log(toFlip);

    let flipped = new Set();
    toFlip.forEach(l => {
      // console.log(l);
      let currX = 0;
      let currY = 0;
      let currZ = 0;
      let currDir = '';
      l.split('').forEach((c) => {
        // console.log(c);
        currDir += c;
        // console.log(currDir);
        if (dirs.includes(currDir)) {
          const [x,y,z] = dir[currDir];
          currX += x;
          currY += y;
          currZ += z;
          // console.log("newTile", currX, currY, currZ);
          currDir = '';
        }
      })
      const flipTile = `${currX},${currY},${currZ}`;
      // console.log(flipTile);
      if (flipped.has(flipTile)) {
        flipped.delete(flipTile);
      } else {
        flipped.add(flipTile);
      }
      // console.log(flipped, flipped.size);
    })
    return [flipped, flipped.size];
  }
  console.log(part1(data));
  let blacks = part1(data)[0];

  const part2 = (blacks) => {
    let whites = new Set();
    let newBlacks = new Set(blacks);
    //check blacks and add neighbors
    [...blacks].forEach(b => {
      const [x,y,z] = b.split(',').map(n => parseInt(n));
      let blackCount = 0;
      neighbors.forEach(d => {
        const [xd, yd, zd] = d;
        const neighbor = `${x+xd},${y+yd},${z+zd}`;
        if (blacks.has(neighbor)) {
          blackCount += 1;
        } else {
          whites.add(neighbor);
        }
      })
      // console.log(blackCount, b);
      if (blackCount === 0 || blackCount > 2) {
        newBlacks.delete(b);
      }
    });
    // console.log(whites);

    //check whites
    [...whites].forEach(t => {
      const [x,y,z] = t.split(',').map(n => parseInt(n));
      let blackCount = 0;
      neighbors.forEach(d => {
        const [xd, yd, zd] = d;
        const neighbor = `${x+xd},${y+yd},${z+zd}`;
        if (blacks.has(neighbor)) {
          blackCount += 1;
        }
      })
      // console.log(blackCount, t);
      if (blackCount === 2) {
        newBlacks.add(t);
      }
    })
    return [newBlacks, newBlacks.size];
  }

  let [newBlacks, len] = part2(blacks);
  console.log(newBlacks, len);
  for (let i = 1; i < 100; i++) {
    [newBlacks, len] = part2(newBlacks);
    console.log(i+1, len);
  }
  console.log(newBlacks, newBlacks.size);
})