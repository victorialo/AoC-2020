const fs = require('fs');
const rightC = 3;
const downC = 1;
fs.readFile('day3data.txt', (err, data) => {
  let map = data.toString().split("\n");
  // console.log(map);
  map = map.map((row) => {
    // console.log(row);
    return row.split('');
  });
  // console.log(map);
  const height = map.length;
  const width = map[0].length-1;
  // console.log(height, width);

  let treeCount = 0;
  let currentRow = 0;
  let currentCol = 0;
  while (((currentRow < height) || (currentRow + downC <= height))) {
    let item = map[currentRow][currentCol % width];
    // console.log('tree?', item, currentCol, currentCol % width);
    if (item === '#') { treeCount += 1;}
    currentCol += rightC;
    currentRow += downC;
  }
  console.log(treeCount);
});

let product = 1;
const rights = [1, 3, 5, 7, 1];
const downs = [1, 1, 1, 1, 2];
for (let i = 0; i < rights.length; i ++ ) {
  const right = rights[i];
  const down = downs[i];

  fs.readFile('day3data.txt', (err, data) => {
    let map = data.toString().split("\n");
    // console.log(map);
    map = map.map((row) => {
      // console.log(row);
      return row.split('');
    });
    // console.log(map);
    const height = map.length;
    const width = map[0].length-1;
    // console.log(height, width);

    let treeCount = 0;
    let currentRow = 0;
    let currentCol = 0;
    while (((currentRow < height) || (currentRow + down <= height))) {
      let item = map[currentRow][currentCol % width];
      // console.log('tree?', item, currentCol, currentCol % width);
      if (item === '#') { treeCount += 1;}
      currentCol += right;
      currentRow += down;
    }
    console.log("treecount", treeCount);
    // console.log()
    product *= treeCount;
    console.log(product);
  });
  // console.log(product);
}
// console.log(product);
