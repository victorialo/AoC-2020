const fs = require('fs');
fs.readFile('day20data.txt', 'utf8', (err, data) => {
  const part1 = () => {
    const tiles = data.split("\r\n\r\n").map(t => t.split(':'));
    let tilesMap = {};
    let sidesMap = {};
    tiles.forEach(t => {
      let [tileNum, tile] = t;
      tileNum = parseInt(tileNum.split(" ")[1]);
      tile = tile.split("\r\n").map(r => r.split(''));
      tile.shift();
      // console.log(tileNum, tile);
      tilesMap[tileNum] = tile;
      const side1 = tile[0]; //top
      const side2 = tile[0].map((s, i) => tile[i][0]); //left
      const side3 = tile[tile.length-1]; //bottom
      const side4 = tile[0].map((s, i) => tile[i][tile.length-1]); //right
      const sides = [side1, side2, side3, side4];
      // console.log(sides);
      //  consider mirrored sides later if not working
      sides.forEach(s => {
        sidesMap[s] = sidesMap[s] || [];
        sidesMap[s].push(tileNum);
        //  mirrored
        const rev = s.reverse();
        sidesMap[rev] = sidesMap[rev] || [];
        sidesMap[rev].push(`${tileNum}-r`);
      })
    })
    console.log(sidesMap);
    // console.log(tiles, tiles.length);
    const oddSides = Object.values(sidesMap).filter(n => (n.length === 1 && typeof n[0] !== "string"));
    console.log(oddSides);
    let corners = [];
    let seen = [];
    oddSides.flat(1).forEach(s => {
      if (seen.includes(s)) {
        corners.push(s);
      } else {
        seen.push(s);
      }
    })
    // console.log(corners, corners.reduce((p, n) => p*n));
    // console.log(seen.flat(1));
    return corners.reduce((p, n) => p*n);
  }
  console.log(part1());
  // corners hardcoded below so that I don't have to recompute
  const corners = [ 2551, 1697, 1129, 3313 ]; //real data
  // const corners = [ 1951, 3079, 2971, 1171 ]; //sample
  // const sides = [1249, 1481, 3169, 1229, 1489, 2897, 1069, 2357, 2017, 3301, 2153, 3581, 2927, 2851, 3319, 2143, 1847, 2389, 3361, 1997, 1063, 3109, 2551, 2677, 2659, 1621, 3037, 1669, 1087, 1697, 3617, 1543, 3631, 2381, 2687, 3259, 2333, 2351, 1129, 1091, 2267, 2549, 2789, 3313, 1607, 2903];

  const part2 = () => {
    const tiles = data.split("\r\n\r\n").map(t => t.split(':'));
    let tilesMap = {};
    let sidesMap = {};
    let sidesMapClean = {}; // flatter and simpler sidesMap
    let nextPieces = {};

    tiles.forEach(t => {
      let [tileNum, tile] = t;
      tileNum = parseInt(tileNum.split(" ")[1]);
      tile = tile.split("\r\n").map(r => r.split(''));

      tile.shift();
      // console.log(tileNum, tile);
      tilesMap[tileNum] = tile;
      const side1 = tile[0]; //top
      const side2 = [...tile[0]].map((s, i) => tile[i][0]); //left
      const side3 = tile[tile.length-1]; //bottom
      const side4 = [...tile[0]].map((s, i) => tile[i][tile.length-1]); //right
      const sides = [side1, side2, side3, side4];
      // console.log(sides);

      sides.forEach((s, i) => {
        sidesMap[s] = sidesMap[s] || [];
        sidesMap[s].push([tileNum, i]);
        sidesMapClean[s] = sidesMapClean[s] || [];
        sidesMapClean[s].push(tileNum);

        //  mirrored
        const rev = [...s].reverse();
        sidesMap[rev] = sidesMap[rev] || [];
        sidesMap[rev].push([`${tileNum}-r`, i]);
        // sidesMap[rev].push([tileNum, i]);
        sidesMapClean[rev] = sidesMapClean[rev] || [];
        sidesMapClean[rev].push(tileNum); // taking out reversal for easier filtering later

        nextPieces[tileNum] = nextPieces[tileNum] || [];
        if (sidesMap[s].length === 2) {
          const otherSide = sidesMap[s][0];
          // nextPieces[tileNum].push(otherSide);
          nextPieces[tileNum].push([...otherSide, i]);
          nextPieces[otherSide[0]] = nextPieces[otherSide[0]] || [];
          // nextPieces[otherSide[0]].push([tileNum, i]);
          nextPieces[otherSide[0]].push([tileNum, i, otherSide[1]]);
        }
        nextPieces[`${tileNum}-r`] = nextPieces[`${tileNum}-r`] || [];
        if (sidesMap[rev].length === 2) {
          const otherSide = sidesMap[rev][0];
          // nextPieces[`${tileNum}-r`].push(otherSide);
          nextPieces[`${tileNum}-r`].push([...otherSide, i]);
          nextPieces[otherSide[0]] = nextPieces[otherSide[0]] || [];
          // nextPieces[otherSide[0]].push([`${tileNum}-r`, i]);
          nextPieces[otherSide[0]].push([`${tileNum}-r`, i, otherSide[1]]);
        }
      })
    })
    console.log(nextPieces);
    // console.log(sidesMap);
    // console.log(tiles, tiles.length);
    const oddSides = Object.values(sidesMap).filter(n => (n.length === 1 && typeof n[0] !== "string"));
    // filter out anything with 0-1 match
    console.log(oddSides, Object.values(sidesMap));
    let seen = [];
    oddSides.flat(1).forEach(s => {
      if (seen.includes(s)) {
      } else {
        seen.push(s);
      }
    })

    // const sidesS = seen;
    // console.log("side pieces", sidesS);
    // const sidesPairs = Object.values(sidesMap).filter(p => p.length === 2);
    // console.log(sidesPairs);

    // const rotateData = (data) => {
    //   let newData = [...data];
    //   newData.forEach(d => {
    //     d[2] -= 1;
    //     if (d[2] < 0) {d[2] = 3}
    //   })
    //   return newData;
    // }
    //
    // const rotateData2 = (data) => {
    //   let presentSides = data.map(d => d[2]);
    //   let newData = [...data];
    //   while (!presentSides.includes(2) && !presentSides.includes(3)) {
    //     newData = rotateData(newData);
    //     presentSides = newData.map(d => d[2]);
    //   }
    //   return newData;
    // }

    const getSides = (tile) => {
      const side1 = tile[0]; //top
      const side2 = [...tile[0]].map((s, i) => tile[i][0]); //left
      const side3 = tile[tile.length-1]; //bottom
      const side4 = [...tile[0]].map((s, i) => tile[i][tile.length-1]); //right
      return [side1, side2, side3, side4];
    }

    //actually flipping both x and y - deprecated
    // const flipBoth = (tile) => {
    //   // const tile = tilesMap[tileNum];
    //   let newTile = [];
    //   for (let i=0; i<tile.length; i++) {
    //     newTile.push([...tile[0]].map((r,j) => tile[j][i]));
    //   }
    //   return newTile;
    // }

    const rotateClockwise = (tile) => {
      let newTile = [];
      for (let i=0; i<tile.length; i++) {
        newTile.push([...tile[i]].map((r,j) => tile[j][i]).reverse());
      }
      return newTile;
    }

    //reversal of sides ind 1,3 (label 2,4)
    const flipX = (tile) => {
      // return tilesMap[tileNum].reverse();
      return tile.reverse();
    }
    //reversal of sides ind 0,2 (label 1,3)
    const flipY = (tile) => {
      let newTile = [];
      // tilesMap[tileNum].forEach(r => {
      tile.forEach(r => {
        newTile.push(r.reverse());
      })
      return newTile;
    }

    // console.log(tilesMap[2551]);
    // console.log(flipY(tilesMap[2551]));
    // console.log(flipX(tilesMap[2551]));
    // console.log(rotateClockwise(tilesMap[2551]));
    // console.log(flipY(2551));
    // console.log(flipX(2551));
    // console.log(rotateClockwise(2551));
    // console.log(removeBorders(2551));

    const createAllVariants = (tile) => {
      let variants = new Set();
      variants.add(tile);
      let modTile = [...tile];
      let flipXT = flipX([...tile]);
      variants.add(flipXT);
      let flipYT = flipY([...tile]); // i guess only one flip was needed but oh well
      variants.add(flipYT);
      // let flipXYT= flipBoth([...tile]); // not needed
      for (let i = 0; i < 4; i++) {
        modTile = rotateClockwise(modTile);
        variants.add(modTile);
        flipXT = rotateClockwise(flipXT);
        variants.add(flipXT);
        flipYT = rotateClockwise(flipYT);
        variants.add(flipYT);
        // flipXYT = rotateClockwise(flipXYT); // not needed
        // variants.add(flipXYT);
      }
      // console.log(variants, variants.size);
      return [...variants];
    }

    // deprecated to merge with nextTile below
    // const firstTile = (currentPiece) => {
    //   let tile = [...tilesMap[currentPiece]];
    //   console.log(currentPiece, tile);
    //   // let [top, left, bottom, right] = getSides(tile)
    //   // console.log(top, left, bottom, right);
    //   // console.log(sidesMap[top], sidesMap[left], sidesMap[left].length);
    //   // console.log(rotateClockwise(tile));
    //   // console.log(createAllVariants(tile));
    //   const variants = createAllVariants(tile);
    //   let correctTile = [];
    //   let bottomright = [];
    //   for (let i=0; i<variants.length; i++) {
    //     let currTile = variants[i];
    //     let [top, left, bottom, right] = getSides(currTile);
    //     if (sidesMap[top.join()].length === 1 && sidesMap[left.join()].length === 1) {
    //       console.log("variant", i, currTile, sidesMap[top.join()],left.join(), sidesMap[left.join()] );
    //       // for (let i=0; i<4; i++) {
    //       // tile = rotateClockwise(tile);
    //       // console.log(tile);
    //       // [top, left, bottom, right] = getSides(tile);
    //       // console.log("side mapping", sidesMap[top], sidesMap[left]);
    //       // return currTile;
    //       correctTile = currTile;
    //       bottomright = [bottom, right];
    //       break;
    //     }
    //   }
    //   let bottom = sidesMap[bottomright[0]].filter(p => p[0] !== currentPiece)[0][0];
    //   let right = sidesMap[bottomright[1]].filter(p => p[0] !== currentPiece)[0][0];
    //   return [correctTile, bottom, right];
    // }

    let pieces = Object.keys(tilesMap).map(n => parseInt(n));
    const dim = Math.sqrt(pieces.length);
    // console.log(dim);
    let grid = [...Array(dim)].map(_ => Array(dim));
    // console.log(grid); // just checking to make sure it's clean
    // console.log(pieces);
    // console.log(corners); // just checking

    // let currentPiece = corners[0];
    // grid[0][0] = currentPiece;
    let currentPiece = corners[0];
    // console.log(grid); // check grid to make sure it's clean
    // console.log(grid.length)
    // console.log(nextPieces[currentPiece]);
    // console.log(sidesMap);

    let gridNum = [...Array(dim)].map(_ => Array(dim));

    const nextTile = (currentPiece, orient, prevTopTile, prevLeftTile) => {
      let tile = [...tilesMap[currentPiece]];
      // let [top, left, bottom, right] = getSides(tile)
      // console.log(createAllVariants(tile));
      const variants = createAllVariants(tile);
      let correctTile = [];
      let bottomright = [];
      let cond = false;

      for (let i=0; i<variants.length; i++) {
        let currTile = variants[i];
        let [top, left, bottom, right] = getSides(currTile);

        // console.log(left);
        // console.log(orient);
        if (orient === 'first') {
          // console.log("first", sidesMapClean[top.join()], sidesMap[left.join()]);
          cond = sidesMapClean[top.join()].length === 1 && sidesMap[left.join()].length === 1;
        } else if (orient === 'right') { // only for top row
          // console.log("left", sidesMapClean[left.join()]);
          // cond = sidesMapClean[left.join()].filter(i => i === prevTile).length === 1;
          let pright = getSides(prevLeftTile)[3];
          cond = left.join() === pright.join();
        } else if (orient === 'bottom') { // only for new rows
          let pbottom = getSides(prevTopTile)[2];
          cond = top.join() === pbottom.join();
        } else if (orient === 'middle') {
          let pright = getSides(prevLeftTile)[3];
          let pbottom = getSides(prevTopTile)[2];
          cond = left.join() === pright.join() && top.join() === pbottom.join();
        }
        // console.log(cond);
        if (cond) {
          // console.log("variant", i, currTile, sidesMap[top.join()],left.join(), sidesMap[left.join()] );
          // for (let i=0; i<4; i++) {
          // tile = rotateClockwise(tile);
          // console.log(tile);
          // [top, left, bottom, right] = getSides(tile);
          // console.log("side mapping", sidesMap[top], sidesMap[left]);
          correctTile = currTile;
          bottomright = [bottom, right];
          break;
        }
      }
      // reworked to use modified flat sidesMapClean without -r
      // let bottom = sidesMap[bottomright[0]].filter(p => p[0] !== currentPiece)[0][0];
      // let right = sidesMap[bottomright[1]].filter(p => p[0] !== currentPiece)[0][0];
      // console.log(bottomright, correctTile);
      let bottom = sidesMapClean[bottomright[0]].filter(p => p !== currentPiece)[0];
      let right = sidesMapClean[bottomright[1]].filter(p => p !== currentPiece)[0];
      return [correctTile, bottom, right];
    }
    // console.log("firsttile", nextTile(currentPiece, "first", null));

    const formGrid = (currentPiece) => {
      let [tile, bottom, right] = nextTile(currentPiece, "first", null);
      gridNum[0][0] = currentPiece;

      for (let r = 0; r < dim; r++) {
        for (let c = 0; c < dim; c++) {
          // console.log(nextPieces[currentPiece]);
          // let tile = tilesMap[currentPiece];
          // let [top, left, bottom, right] = getSides(tile);
          // console.log(sidesMap[top]);

          // let sideMatches = nextPieces[currentPiece];
          // console.log(rotateData(sideMatches));
          // console.log(rotateData2(sideMatches));
          currentPiece = gridNum[r][c];
          // console.log(currentPiece);
          if (r === 0 && c === 0) {
            // continue;
            grid[0][0] = tile;
            gridNum[0][1] = right;
            gridNum[1][0] = bottom;
            // console.log(gridNum, bottom, right, "next pieces", nextPieces[currentPiece]);
          } else if (r === 0) {
            [tile, bottom, right] = nextTile(currentPiece, 'right', null, tile);
          } else if (c === 0) {
            // bottom piece
            [tile, bottom, right] = nextTile(currentPiece, 'bottom', grid[r-1][c], null);
          } else {
            // right piece
            // console.log(r, c-1, grid, grid[r][c-1]);
            [tile, bottom, right] = nextTile(currentPiece, 'middle', grid[r-1][c], tile);
          }
          // if ([bottom, right].includes(undefined)) {console.error("help", currentPiece, bottom, right)} // debugging
          grid[r][c] = tile;
          if (r+1 < dim) {gridNum[r+1][c] = bottom}
          if (c+1 < dim) {gridNum[r][c+1] = right}
          // console.log(gridNum);
        }
        // console.log(grid[r]);
      }
      console.log(gridNum);
      return grid;
    }
    grid = formGrid(currentPiece);

    const removeBorders = (tile) => {
      // let tile = tilesMap[tileNum];
      tile.shift(); // remove side 1: first row
      tile.pop(); // remove side 2: bottom row
      tile.forEach(r => {
        r.shift();
        r.pop();
      })
      return tile;
    }

    let cleanGrid = [];
    for (let r = 0; r < dim; r++) {
      let row = [];
      for (let c = 0; c < dim; c++) {
        row.push(removeBorders(grid[r][c]));
      }
      cleanGrid.push(row);
    }
    // combined.push(cleanGrid[r].concat());

    console.log(cleanGrid);
    // # of rows = grid.length (3) * square.length (grid[r][c].length = 8)
    const joinRow = (row) => {
      let flat = [];
      // console.log(row);
      const sq = row[0];
      for (let sr = 0; sr < sq.length; sr ++) {
        let rowchar = [];
        for (let i = 0; i < row.length; i ++) {
          // console.log(row[i][sr])
          rowchar.push(...row[i][sr]);
          // console.log(rowchar);
        }
        flat.push([...rowchar]);
        // flat.push(rowchar.join(''));
      }
      return flat;
    }
    // console.log(joinRow(cleanGrid[0]));
    const totalRows = cleanGrid.length * cleanGrid[0][0].length;

    const flattenPieces = (grid) => {
      let flattened = [];
      let hashCount = 0;
      for (let r = 0; r < grid.length; r++) {
        const row = joinRow(grid[r]);
        // console.log(row);
        flattened.push(...row);
        row.forEach( f => {
          let count = [...f].reduce((count, v) => (v === '#' ? count + 1 : count), 0);
          // console.log(count);
          hashCount += count;
        })
      }
      return [flattened, hashCount];
    }
    const [flattened, hashCount] = flattenPieces(cleanGrid);
    console.log(hashCount);
    console.log(flattened, flattened.length, totalRows);

    const allVariants = createAllVariants(flattened);
    // console.log(allVariants, allVariants.length);

    // .............#.##.O
    // O.##.OO#.#.OO.##.OOO
    // #O.#O#.O##O..O.#O
    const monsterCoords = [
      [-1,18],
      [0,0],
      [0,5],
      [0,6],
      [0,11],
      [0,12],
      [0,17],
      [0,18],
      [0,19],
      [1,1],
      [1,4],
      [1,7],
      [1,10],
      [1,13],
      [1,16]
    ];

    const findMonsters = (flattened) => {
      let count = 0;
      for (let r = 1; r < flattened.length-1; r++) {
        const row = flattened[r];
        for (let c = 0; c < row.length; c++) {
          if (row[c] === '#') {
            let stopCheck = false;
            for (let p = 0; p < monsterCoords.length; p++) {
              const [mr, mc] = monsterCoords[p];
              const checkR = r+mr;
              const checkC = c+mc;
              if (checkR >= row.length || checkC >= flattened.length || flattened[checkR][checkC] !== '#') {
                stopCheck = true;
                // console.log("none found at", r, c);
                break;
              }
            }
            if (stopCheck === false) {
              count += 1;
              // console.log("found at", r, c);
            }
          }
        }
      }
      // console.log(count);
      return count;
    }

    let counts = [];
    allVariants.forEach(v => {
      counts.push(findMonsters(v));
    })
    console.log(counts, Math.max(...counts));
    return hashCount - (monsterCoords.length * Math.max(...counts));
  }
  console.log(part2());
})

// I created a "Node" class that had an integer ID, string for the tile data, and it pointed to its related tiles. Once I found the completed grid, I created a function that would go through the grid and find the output. Then it was just a bunch of "if" statements to find the pattern and replace those with "O" values. Then I counted the "#" values