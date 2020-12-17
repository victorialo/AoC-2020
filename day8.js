const fs = require("fs");
fs.readFile('day8data.txt', (err, data) => {
  const inst = data.toString().split('\r\n');
  let total = 0;
  let visitedLines = new Set();
  // console.log(inst);
  let currentLine = 0;
  let stillRun = true;
  while (currentLine < inst.length && stillRun) {
    // console.log("running", currentLine);
    if (visitedLines.has(currentLine)) {
      console.log("found infinite loop on line", currentLine, total);
      stillRun = false;
      break;
    } else {
      visitedLines.add(currentLine);
      const [op, num] = inst[currentLine].split(' ');
      // console.log("op", op, num);
      switch (op) {
        case 'acc':
          // console.log(total, "adding", num, "on line", currentLine);
          total += parseInt(num);
          currentLine += 1;
          // console.log(total);
          break;
        case 'jmp':
          // console.log(currentLine, "going to", num)
          currentLine += parseInt(num);
          break;
        default:
          currentLine += 1;
          break;
      }
    }
  }
})


fs.readFile('day8data.txt', (err, data) => {
  const inst = data.toString().split('\r\n');
  let total = 0;
  let visitedLines = new Set();
  // console.log(inst);
  let currentLine = 0;
  // let stillRun = true;
  let changed = -1; //default
  let changedVisited = new Set();
  let oldTotal = -1;
  while (currentLine < inst.length) {
    // console.log("running", currentLine);
    if (visitedLines.has(currentLine) || changedVisited.has(currentLine)) {
      // console.log("found infinite loop on line", currentLine, total);
      // stillRun = false;
      // reset to main check
      currentLine = changed;
      // visitedLines.delete(currentLine);
      changed = -1;
      changedVisited = new Set();
      total = oldTotal;
      // console.log("updated", currentLine, changed, total);
      // now do the jump
      const [op, num] = inst[currentLine].split(' ');
      currentLine += parseInt(num);
      // fix total;
      // break;
    } else {
      if (changed === -1) {
        visitedLines.add(currentLine);
      } else {
        changedVisited.add(currentLine);
      }
      // console.log(currentLine);
      const [op, num] = inst[currentLine].split(' ');
      // console.log("op", op, num);
      switch (op) {
        case 'acc':
          // console.log(total, "adding", num, "on line", currentLine);
          total += parseInt(num);
          currentLine += 1;
          // console.log("total", total);
          break;
        case 'jmp':
          // console.log(currentLine, "going to", num)
          const goToLine = parseInt(num);
          if (changed === -1) { //&& goToLine < 0) {
            changed = currentLine;
            // console.log("changing line", currentLine);
            currentLine += 1;
            oldTotal = total;
          } else {
            currentLine += parseInt(num);
          }
          break;
        // case 'nop':
        //   const goToLine = parseInt(num);
        //   if (changed === -1 && goToLine)
        //   console.log("changing nop to jmp");
        default:
          currentLine += 1;
          break;
      }
    }
  }
  console.log("found total", total);
})
