const fs = require("fs");
fs.readFile('day22data.txt', 'utf8', (err, data) => {

  const parse = data => {
    let [p1, p2] = data.trim().split("\r\n\r\n").map(p => p.split("\r\n").map(n => parseInt(n.trim())));
    p1.shift();
    p2.shift();
    return [p1, p2];
  }

  const shuffle = (p1, p2) => {
    while (p1.length > 0 && p2.length > 0) {
      const p1top = p1.shift();
      const p2top = p2.shift();
      // console.log(p1top, p2top);
      if (p1top > p2top) {
        p1.push(p1top);
        p1.push(p2top);
      } else {
        p2.push(p2top);
        p2.push(p1top);
      }
    }
    return [p1, p2];
  }

  const calcScore = (p1, p2) => {
    if (p1.length > p2.length) {
      return [...p1].reverse().reduce((score, num, i) => score + (num * (i+1)) )
    } else {
      return [...p2].reverse().reduce((score, num, i) => score + (num * (i+1)) )
    }
  }

  const part1 = (data) => {
    let [p1, p2] = parse(data);
    // console.log(p1, p2);

    [p1, p2] = shuffle(p1, p2);
    // console.log(p1, p2);

    return calcScore(p1, p2);

  }
  console.log(part1(data));

  const part2 = (data) => {
    let depth = 1;
    let [p1, p2] = parse(data);
    // console.log(p1, p2);

    const winner = (p1, p2) => {
      return p1.length > p2.length ? 'p1' : 'p2';
    }

    const shuffle2 = (p1, p2) => {
      let prevDecks = {};
      let seen = false;
      prevDecks[p1[0]] = prevDecks[p1[0]] || [];
      const p1hash = p1.length > 0 ? calcScore(p1, []) : 0;
      const p2hash = p2.length > 0 ? calcScore([], p2) : 0;
      const hash = p1hash * 100000000 + p2hash;
      prevDecks[p1[0]].push(hash);

      while (p1.length > 0 && p2.length > 0) {

        if (!seen) {
          // console.log("check subgame", p1, p2, p1[0] < p1.length && p2[0] < p2.length);
          if (p1[0] < p1.length && p2[0] < p2.length) {
            const p1top = p1.shift();
            const p2top = p2.shift();
            const newP1 = [...p1].slice(0,p1top);
            const newP2 = [...p2].slice(0,p2top);
            depth += 1;
            // console.log("new subgame", p1top, newP1, p2top, newP2, "depth", depth);
            const [p12, p22] = shuffle2(newP1, newP2);
            const winnerRound = winner(p12, p22);
            console.log("new subgame", p1top, newP1, p2top, newP2, "depth", depth, "winner", winnerRound
            );
            // console.log(p12, p22, winnerRound);
            if (winnerRound === 'p1') {
              p1.push(p1top);
              p1.push(p2top);
            } else {
              p2.push(p2top);
              p2.push(p1top);
            }
            // console.log("new p1", p1, p2);
            depth -= 1;
          } else {
            const p1top = p1.shift();
            const p2top = p2.shift();
            // console.log(p1top, p2top);
            if (p1top > p2top) {
              p1.push(p1top);
              p1.push(p2top);
            } else {
              p2.push(p2top);
              p2.push(p1top);
            }
          }


        // console.log("checking prev decks", prevDecks[p1[0]], prevDecks.hasOwnProperty(p1[0]), p1[0], p1, p2);
        // console.log("p1p2", p1, p2);

        // if (p1.length === 0 || p2.length === 0) {
        //   return [p1, p2];
        //   break;
        // }
        const p1hash = p1.length > 0 ? calcScore(p1, []) : 0;
        const p2hash = p2.length > 0 ? calcScore([], p2) : 0;
        const hash = p1hash * 100000000 + p2hash;
        if (prevDecks.hasOwnProperty(p1[0])) {
          //  check for repeats
          const prevDeck = prevDecks[p1[0]];
          // console.log(prevDeck);
          // prevDecks = {0: [[[0, 1, 2, 3], [4, 5, 6]], [[0, 1], [2, 3]]], 1: [[[1, 2], [3,4]]]}
          //prevDeck[0] = [[[0, 1, 2, 3], [4, 5, 6]], [[0, 1], [2, 3]]]
          // prevDeck[0][1] (via loop) = [[0, 1], [2, 3]];
          //prevDeck p1 = [0,1], p2 =  [2, 3]
          if (prevDeck.includes(hash)) {
            seen = true;
            // console.log(p1, p2);
            p2 = [];
            return [p1, p2];
          }
          // for (let i = 0; i<prevDeck.length; i++) {
          //   // console.log("does prev exist?", prevDeck, p1, p2);
          //   // if (prevDeck[i][0] === p1 && prevDeck[i][1] === p2) {
          //   if (prevDeck[i] === hash) {
          //     seen = true;
          //     p2 = [];
          //   }
          //   // if (!seen) {
          //   //   prevDecks[p1[0]] = prevDecks[p1[0]] || [];
          //   //   prevDecks[p1[0]].push([p1, p2]);
          //   //   console.log(prevDecks[p1[0]]);
          //   // }
          // }
        }


          prevDecks[p1[0]] = prevDecks[p1[0]] || [];
          // prevDecks[p1[0]].push([[...p1], [...p2]]);
          prevDecks[p1[0]].push(hash);
          // console.log("adding", prevDecks[p1[0]]);
        }
        // }
      }
      // console.log(prevDecks);
      return [p1, p2];
    }

    [p1, p2] = shuffle2(p1, p2);
    // console.log(p1, p2);

    return calcScore(p1, p2);

  }
  console.log(part2(data));
})

//31632
// > your hash check inside the loop happens after you dequeue; that is wrong, and the current deck is added before and then checked after popping, so that's wrong