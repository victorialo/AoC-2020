const fs = require("fs");
fs.readFile('day6data.txt', (err, data) => {
  let groups = data.toString().split("\r\n\r\n");
  let sum = 0;
  // console.log(groups);
  groups.forEach((g) => {
    // console.log(g, "combined", g.split('\r\n').join());
    const p = g.split('\r\n').join('').split('');
    // const p = g.replace(/\r/, "");
    // console.log(p);
    let questions = new Set();
    p.forEach((q) => {
      // console.log(q);
      if (!questions.has(q)) {
        questions.add(q);
      }
    })
    // console.log(questions);
    sum += questions.size;
    console.log(sum);
  })
});


fs.readFile('day6data.txt', (err, data) => {
  let groups = data.toString().split("\r\n\r\n");
  let sum = 0;
  // console.log(groups);
  groups.forEach((g) => {
    // console.log(g, "combined", g.split('\r\n').join());
    let questions = [];
    let sharedQ = [];
    g.split("\r\n").forEach((p, index) => {
      // console.log("p", p);
      if (index === 0) {
        sharedQ = p.split('');
        debugger;
      } else {
        p.split('').forEach((q) => {
          // console.log("checking", q, "against", questions);
          if (questions.includes(q)) {
            sharedQ.push(q);
          }
        });
        // console.log(sharedQ);
      }
      questions = sharedQ;
      sharedQ = [];
    });
    console.log(questions);
    sum += questions.length;
    console.log(sum);
  })
});
