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
      const side1 = tile[0];
      const side2 = tile[0].map((s, i) => tile[i][0]);
      const side3 = tile[tile.length-1];
      const side4 = tile[0].map((s, i) => tile[i][tile.length-1]);
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
  // console.log(part1());
  const corners = [ 2551, 1697, 1129, 3313 ];
  // 2551: 1,2 - top right;
  // 1697: 0,3 - bottom left; - flipped for 2,3
  // 1129: 0,1 - bottom right;
  // 3313: 0,3 - top right, flipped for 2,3
  const sides = [1249, 1481, 3169, 1229, 1489, 2897, 1069, 2357, 2017, 3301, 2153, 3581, 2927, 2851, 3319, 2143, 1847, 2389, 3361, 1997, 1063, 3109, 2551, 2677, 2659, 1621, 3037, 1669, 1087, 1697, 3617, 1543, 3631, 2381, 2687, 3259, 2333, 2351, 1129, 1091, 2267, 2549, 2789, 3313, 1607, 2903];


  // part 2 is incomplete
  const part2 = () => {
    const tiles = data.split("\r\n\r\n").map(t => t.split(':'));
    let tilesMap = {};
    let sidesMap = {};
    let nextPieces = {};

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

      sides.forEach((s, i) => {
        sidesMap[s] = sidesMap[s] || [];
        sidesMap[s].push([tileNum, i]);

        //  mirrored
        const rev = s.reverse();
        sidesMap[rev] = sidesMap[rev] || [];
        sidesMap[rev].push([`${tileNum}-r`, i]);

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
    console.log(oddSides, Object.values(sidesMap));
    // let corners = [];
    let seen = [];
    oddSides.flat(1).forEach(s => {
      if (seen.includes(s)) {
        // corners.push(s);
      } else {
        seen.push(s);
      }
    })

    const sidesS = seen;
    // console.log("side pieces", sidesS);
    // const sidesPairs = Object.values(sidesMap).filter(p => p.length === 2);
    // console.log(sidesPairs);

    let pieces = Object.keys(tilesMap).map(n => parseInt(n));
    // let dim = tilesMap[corners[0]].length;
    const dim = Math.sqrt(pieces.length);
    // console.log(dim);
    let grid = [...Array(dim)].fill(Array(dim));
    console.log(grid);
    // console.log(pieces);
    let currentPiece = corners[0];
    grid[0][0] = currentPiece;
    console.log(grid);
    // console.log(grid.length)
    console.log(nextPieces[currentPiece]);
    const sideMappings = {0:2, 1:3, 3:1, 2:0};

    const rotateClockwise = (tileNum) => {
      const tile = tilesMap[tileNum];
      let newTile = [];
      for (let i=0; i<tile.length; i++) {
        newTile.push([...tile[0]].map((r,j) => tile[j][i]));
      }
      return newTile;
    }
    const flipX = (tileNum) => {
      return tilesMap[tileNum].reverse();
    }
    const flipY = (tileNum) => {
      let newTile = [];
      tilesMap[tileNum].forEach(r => {
        newTile.push(r.reverse());
      })
      return newTile;
    }
    const removeBorders = (tileNum) => {
      let tile = tilesMap[tileNum];
      tile.shift(); // remove side 1: first row
      tile.pop(); // remove side 2: bottom row
      tile.forEach(r => {
        r.shift();
        r.pop();
      })
      return tile;
    }
    console.log(tilesMap[2551]);
    // console.log(flipY(2551));
    // console.log(flipX(2551));
    // console.log(rotateClockwise(2551));
    // console.log(removeBorders(2551));

  }

  console.log(part2());

})

// I created a "Node" class that had an integer ID, string for the tile data, and it pointed to its related tiles. Once I found the completed grid, I created a function that would go through the grid and find the output. Then it was just a bunch of "if" statements to find the pattern and replace those with "O" values. Then I counted the "#" values