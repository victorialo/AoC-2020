const fs = require('fs');
const iterations = 6;
fs.readFile('day17data.txt', 'utf8', (err,data) => {
  let layer = data.split("\r\n").map(r => r.split(''));
  let cubes = [layer];
  // console.log(cubes)
  let dim = layer.length;
  let depth = 1;

  const expand = (cubes, dim) => {
    cubes.forEach(l => {
      l.forEach(r => {
        r.unshift('.');
        r.push('.');
      })
      l.unshift(Array(dim).fill('.'));
      l.push((Array(dim).fill('.')));
    })
    cubes.unshift(Array(dim).fill('.').map(_ => Array(dim).fill('.')));
    cubes.push(Array(dim).fill('.').map(_ => Array(dim).fill('.')));
    // console.log(cubes);
    return cubes;
  }

  const createNewGrid = (cubes) => {
    return cubes.map(z => z.map(r => r.map(c => '.')));
  }
  for (let i = 0; i<iterations; i++) {
    dim += 2;
    depth += 2;
    cubes = expand(cubes, dim);
    // console.log(cubes);
    let newGrid = createNewGrid(cubes);

    const checkAdjs = (x, y, z, cubes) => {
      let adj = [];
      let count = 0;

      for (let zi=z-1; zi<=z+1; zi++) {
        if (zi <= 0 || zi >= depth) continue;
        for (let yi=y-1; yi<=y+1; yi++) {
          if (yi <= 0 || yi >= dim) continue;
          for (let xi=x-1; xi<=x+1; xi++) {
            if (xi <= 0 || xi >= dim) continue;
            if (xi === x && yi === y && zi === z) continue;
            const value = cubes[zi][yi][xi];
            adj.push(value); //only for debug
            if (value === '#') count += 1;
          }
        }
      }
      return [adj, count];
    }

    let totalCount = 0;
    cubes.forEach((l,z) => {
      l.forEach((r, y) => {
        r.forEach((c, x) => {
          // let [xlb, xub, ylb, yub, zlb, zub] = checkValidDim(x,y,z,dim);

          const [adj, count] = checkAdjs(x,y,z,cubes);
          // if (i !== 0) console.log(adj, count, "at", z, y, x);
          const on = c === '#';
          if (on) {
            if ([2,3].includes(count)) {
              newGrid[z][y][x] = '#';
              totalCount += 1;
            } else {
              newGrid[z][y][x] = '.'
            }
          } else {
            if (count === 3) {
              newGrid[z][y][x] = '#';
              totalCount += 1;
            } else {
              newGrid[z][y][x] = '.'
            }
          }
        })
      })
    })
    console.log("newgrid", i+1, newGrid, totalCount);
    cubes = newGrid;
  }


})



// if (xlb) {
//   adj.push(cubes[z-1][y][x]);
//   if (ylb) {
//     adj.push(cubes[z-1][y-1][x]);
//     if (zlb) {
//       adj.push(cubes[z-1][y-1][z-1]);
//     }
//   }
// }
// if (xlb) {adj.push(cubes[z][y][x-1])}
// if (ylb) {adj.push(cubes[z][y-1][x])}
// if (zlb) {adj.push(cubes[z-1][y][x])}
// if (xlb && ylb) {adj.push(cubes[z][y-1][x-1])}
// if (zlb && ylb) {adj.push(cubes[z-1][y-1][x])}
// if (xlb && zlb) {adj.push(cubes[z-1][y][x-1])}
// if (xlb && ylb && zlb) {adj.push(cubes[z-1][y-1][x-1])}
// if (xub) {adj.push(cubes[z][y][x+1])}
// if (yub) {adj.push(cubes[z][y+1][x])}
// if (zub) {adj.push(cubes[z+1][y][x])}
// if (xub && yub) {adj.push(cubes[z][y+1][x+1])}
// if (xub && zub) {adj.push(cubes[z+1][y][x+1])}
// if (zub && yub) {adj.push(cubes[z+1][y+1][x])}
// if (xub && yub && zub) {adj.push(cubes[z-1][y-1][x-1])}
// if (xlb && zub) {adj.push(cubes[z+1][y][x])}
// if (xlb) {
//   adj.push(cubes[z][y][x-1]);
//   if (ylb) {
//     adj.push(cubes[z][y-1][x-1]);
//     if (zlb) {
//       adj.push(cubes[z-1][y-1][x-1]);
//     }
//     if (yub) {
//       adj.push(cubes[z][y-1][x-1]);
//     }
//     if (zub) {
//       adj.push(cubes[z+1][y][x-1]);
//     }
//   }
// }
console.log("==================================================== part 2");

fs.readFile('day17data.txt', 'utf8', (err,data) => {
  let layer = data.split("\r\n").map(r => r.split(''));
  let quads = [[layer]];
  // console.log(cubes)
  let dim = layer.length;
  let depth = 1;
  let depth2 = 1;

  const expand = (quads, dim) => {
    quads.forEach(cubes => {
      cubes.forEach(l => {
        l.forEach(r => {
          r.unshift('.');
          r.push('.');
        })
        l.unshift(Array(dim).fill('.'));
        l.push((Array(dim).fill('.')));
      })
      cubes.unshift(Array(dim).fill('.').map(_ => Array(dim).fill('.')));
      cubes.push(Array(dim).fill('.').map(_ => Array(dim).fill('.')));
    })
    // console.log(Array(dim).fill('.').map(_ => Array(dim).fill('.').map(_ => Array(dim).fill('.'))));
    quads.unshift(Array(dim).fill('.').map(_ => Array(dim).fill('.').map(_ => Array(dim).fill('.'))));
    quads.push(Array(dim).fill('.').map(_ =>Array(dim).fill('.').map(_ => Array(dim).fill('.'))));
    // console.log(quads);
    // console.log(quads[0][0][0][2]);
    return quads;
  }

  const createNewGrid = (quads) => {
    return quads.map(cubes => cubes.map(z => z.map(r => r.map(c => '.'))));
  }
  for (let i = 0; i<iterations; i++) {
    dim += 2;
    depth += 2;
    depth2 += 2;
    quads = expand(quads, dim);
    // console.log(quads);
    let newGrid = createNewGrid(quads);

    const checkAdjs = (x, y, z, w, quads) => {
      let adj = [];
      let count = 0;

      for (let wi=w-1; wi<=w+1;wi++) {
        if (wi <= 0 || wi >= depth2) continue;
        for (let zi = z - 1; zi <= z + 1; zi++) {
          if (zi <= 0 || zi >= depth) continue;
          for (let yi = y - 1; yi <= y + 1; yi++) {
            if (yi <= 0 || yi >= dim) continue;
            for (let xi = x - 1; xi <= x + 1; xi++) {
              if (xi <= 0 || xi >= dim) continue;
              if (xi === x && yi === y && zi === z && wi === w) continue;
              const value = quads[wi][zi][yi][xi];
              adj.push(value); //only for debug
              if (value === '#') count += 1;
            }
          }
        }
      }
      return [adj, count];
    }

    let totalCount = 0;
    quads.forEach((s, w) => {
      s.forEach((l,z) => {
        l.forEach((r, y) => {
          r.forEach((c, x) => {
            // let [xlb, xub, ylb, yub, zlb, zub] = checkValidDim(x,y,z,dim);

            const [adj, count] = checkAdjs(x,y,z,w,quads);
            // if (i !== 0) console.log(adj, count, "at", z, y, x);
            const on = c === '#';
            if (on) {
              if ([2,3].includes(count)) {
                newGrid[w][z][y][x] = '#';
                totalCount += 1;
              } else {
                newGrid[w][z][y][x] = '.'
              }
            } else {
              if (count === 3) {
                newGrid[w][z][y][x] = '#';
                totalCount += 1;
              } else {
                newGrid[w][z][y][x] = '.'
              }
            }
          })
        })
      })
    })
    console.log("newgrid pt2", i+1, newGrid, totalCount);
    quads = newGrid;
  }


})



// if (xlb) {
//   adj.push(cubes[z-1][y][x]);
//   if (ylb) {
//     adj.push(cubes[z-1][y-1][x]);
//     if (zlb) {
//       adj.push(cubes[z-1][y-1][z-1]);
//     }
//   }
// }
// if (xlb) {adj.push(cubes[z][y][x-1])}
// if (ylb) {adj.push(cubes[z][y-1][x])}
// if (zlb) {adj.push(cubes[z-1][y][x])}
// if (xlb && ylb) {adj.push(cubes[z][y-1][x-1])}
// if (zlb && ylb) {adj.push(cubes[z-1][y-1][x])}
// if (xlb && zlb) {adj.push(cubes[z-1][y][x-1])}
// if (xlb && ylb && zlb) {adj.push(cubes[z-1][y-1][x-1])}
// if (xub) {adj.push(cubes[z][y][x+1])}
// if (yub) {adj.push(cubes[z][y+1][x])}
// if (zub) {adj.push(cubes[z+1][y][x])}
// if (xub && yub) {adj.push(cubes[z][y+1][x+1])}
// if (xub && zub) {adj.push(cubes[z+1][y][x+1])}
// if (zub && yub) {adj.push(cubes[z+1][y+1][x])}
// if (xub && yub && zub) {adj.push(cubes[z-1][y-1][x-1])}
// if (xlb && zub) {adj.push(cubes[z+1][y][x])}
// if (xlb) {
//   adj.push(cubes[z][y][x-1]);
//   if (ylb) {
//     adj.push(cubes[z][y-1][x-1]);
//     if (zlb) {
//       adj.push(cubes[z-1][y-1][x-1]);
//     }
//     if (yub) {
//       adj.push(cubes[z][y-1][x-1]);
//     }
//     if (zub) {
//       adj.push(cubes[z+1][y][x-1]);
//     }
//   }
// }