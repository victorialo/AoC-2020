const fs = require("fs");
fs.readFile('day11data.txt', (err, data) => {
  const board = data.toString().split("\r\n").map(r => r.split(''));
  // console.log(board);

  const fillBoard = (board) => {
    // let newBoard = board;
    let occupiedCount = 0;
    return [board.map((r, i) => {
      return r.map((c, j) => {
        if (c === '.') {return c}
        let adj = [];
        if (j-1 >= 0) {adj.push(r[j-1])}
        if (j+1 < r.length) {adj.push(r[j+1])}
        if (i-1 >= 0) {
          adj.push(board[i-1][j]);
          if (j-1 >= 0) {adj.push(board[i-1][j-1])}
          if (j+1 < r.length) {adj.push(board[i-1][j+1])}
        }
        if (i+1 < board.length) {
          adj.push(board[i+1][j]);
          if (j-1 >= 0) {adj.push(board[i+1][j-1])}
          if (j+1 < r.length) {adj.push(board[i+1][j+1])}
        }
        // console.log("adj", adj, "for", i, j);
        // const adj = [
        //   // r[j-1],
        //   // r[j+1],
        //   // board[i-1][j-1],
        //   // board[i-1][j],
        //   // board[i-1][j+1],
        //   // board[i+1][j-1],
        //   board[i+1][j],
        //   board[i+1][j+1]
        // ];
        const adjCount = adj.reduce((count, curr) => {
          if (curr === '#') {count += 1}
          return count;
        }, 0);
        // console.log("count", adjCount);
        if (adjCount === 0) {
          // newBoard[i][j] = '#';
          occupiedCount += 1;
          return '#';
        } else if (adjCount >= 4) {
          // newBoard[i][j] = 'L';
          // occupiedCount -= 1;
          return 'L';
        } else {
          if (c === '#') {occupiedCount += 1}
          return c;
        }

      })
    }), occupiedCount];
  }

  let [newBoard, occupiedCount] = fillBoard(board);
  let oldCount = 0;
  // console.log("first iter newboard", newBoard, occupiedCount, "\n\n\n\n", );
  while (oldCount !== occupiedCount) {
    oldCount = occupiedCount;
    [newBoard, occupiedCount] = fillBoard(newBoard);
    // console.log("newboard", newBoard, occupiedCount);
    console.log(occupiedCount);
  }



  // oldBoard = newBoard;
  // [newBoard, occupiedCount] = fillBoard(oldBoard);
  // console.log("newboard 2", newBoard, occupiedCount);
  //
  //
  // oldBoard = newBoard;
  // [newBoard, occupiedCount] = fillBoard(oldBoard);
  // console.log("newboard 3", newBoard, occupiedCount);
  //
  //
  // oldBoard = newBoard;
  // [newBoard, occupiedCount] = fillBoard(oldBoard);
  // console.log("newboard 4", newBoard, occupiedCount);
  //
  // oldBoard = newBoard;
  // [newBoard, occupiedCount] = fillBoard(oldBoard);
  // console.log("newboard 5", newBoard, occupiedCount);
  //
  // oldBoard = newBoard;
  // [newBoard, occupiedCount] = fillBoard(oldBoard);
  // console.log("newboard 6", newBoard, occupiedCount, oldBoard === newBoard);


})


console.log("\n\n\n\n\n\n\n part 2")





fs.readFile('day11data.txt', (err, data) => {
  const board = data.toString().split("\r\n").map(r => r.split(''));
  // console.log(board);
  // let occupiedCount = 0;

  const checkSeats = (board, seatR, seatC, rDir, cDir) => {
    let curR = seatR+rDir;
    let curC = seatC+cDir;
    if (curR < 0 || curR > board.length-1 || curC < 0 || curC > board[curR].length-1) {
      return '';
    }
    let checkingSeat = board[curR][curC];
    while (checkingSeat === '.') {
      checkingSeat = board[curR][curC];
      // console.log("checking", checkingSeat, curR, curC, "for", rDir, cDir);
      if (['#', 'L'].includes(checkingSeat) ) {
        return checkingSeat;
      } else {
        curR += rDir;
        curC += cDir;
        if (curR < 0 || curR > board.length-1 || curC < 0 || curC > board[curR].length-1) {
          return checkingSeat;
        }
      }
    }
    return checkingSeat;
  }

  const fillBoard = (board) => {
    // let newBoard = board;
    let occupiedCount = 0;
    return [board.map((r, i) => {
      return r.map((c, j) => {
        if (c === '.') {return c}
        let adj = [];
        // console.log("position", i, j);
        adj.push(checkSeats(board, i, j, -1, -1));
        adj.push(checkSeats(board, i, j, -1, 0));
        adj.push(checkSeats(board, i, j, -1, 1));
        adj.push(checkSeats(board, i, j, 0, -1));
        adj.push(checkSeats(board, i, j, 0, 1));
        adj.push(checkSeats(board, i, j, 1, -1));
        adj.push(checkSeats(board, i, j, 1, 0));
        adj.push(checkSeats(board, i, j, 1, 1));



        // console.log(adj);
        // console.log("adj", adj, "for", i, j);
        // const adj = [
        //   // r[j-1],
        //   // r[j+1],
        //   // board[i-1][j-1],
        //   // board[i-1][j],
        //   // board[i-1][j+1],
        //   // board[i+1][j-1],
        //   board[i+1][j],
        //   board[i+1][j+1]
        // ];
        const adjCount = adj.reduce((count, curr) => {
          if (curr === '#') {count += 1}
          return count;
        }, 0);
        // console.log("count", adjCount);
        if (adjCount === 0) {
          // newBoard[i][j] = '#';
          occupiedCount += 1;
          return '#';
        } else if (adjCount >= 5) {
          // newBoard[i][j] = 'L';
          // occupiedCount -= 1;
          return 'L';
        } else {
          if (c === '#') {occupiedCount += 1}
          return c;
        }

      })
    }), occupiedCount];
  }

  let [newBoard, occupiedCount] = fillBoard(board);
  let oldCount = 0;
  // console.log("first iter newboard", newBoard, occupiedCount, "\n\n\n\n", );
  while (oldCount !== occupiedCount) {
    oldCount = occupiedCount;
    [newBoard, occupiedCount] = fillBoard(newBoard);
    console.log("newboard", newBoard, occupiedCount);
  }
  

})



