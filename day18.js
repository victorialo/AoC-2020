const fs = require('fs');
fs.readFile('day18data.txt', 'utf8', (err, data) => {
  const eqs = data.split("\r\n");
  // console.log(eqs);

  const handleParens = (eq) => {
    // const e = eq.match(/\((*)\))/)
    const e = eq.split('');
    // console.log("e", e);
    let allExp = [];
    let currExp = "";
    let layers = 0;
    for (let i = 0; i<e.length; i++) {
      const c = e[i];
      // console.log(c);
      if (c === " ") {
        continue;
      } else if (c === '(') {
        if (layers === 0) {
          if (currExp !== '') allExp.push(currExp);
          currExp = "";
        } else {
          currExp += c;
        }
        // console.log(allExp);
        layers += 1;
      } else if (c === ')') {
        layers -= 1;
        // currExp += c;
        if (layers === 0) {
          // console.log(currExp);
          allExp.push(handleParens(currExp));
          currExp = "";
        } else {
          currExp += c;
        }
      } else {
        currExp += c;
        // console.log(currExp);
      }
    }
    if (currExp !=='') allExp.push(currExp);
    // console.log(allExp);
    return flatOperations(allExp);
  }

  const flatOperations = (eq) => {
    // console.log("eq", eq);
    let currentExp = "";
    for (let i = 0; i < eq.length; i++) {
      const exp = eq[i].split('');
      // console.log("e", exp);
      // if (['+', '*'].includes(exp.slice(-1)[0])) {
      exp.forEach((c, i) => {
        if (['+', '*'].includes(c)) {
          currentExp = eval(currentExp).toString();
          // console.log(currentExp)

          currentExp += c;
          // console.log(currentExp);
        } else {
          // console.log(currentExp, "exp", c, "current+exp", currentExp+c, eval(currentExp+c));
          currentExp += c;
          if (i === exp.length-1) {currentExp = eval(currentExp).toString();}
        }
      })
    }
    // console.log(currentExp);
    return currentExp.toString();
  }

  let total = 0;
  eqs.forEach(eq => {
    // console.log(handleParens(eq));
    total += parseInt(handleParens(eq));
  })
  console.log(total);

})


fs.readFile('day18data.txt', 'utf8', (err, data) => {
  const eqs = data.split("\r\n");

  // originally my plan was to just add the parentheses to the equation and solve it like before but i ran into technical difficulties
  // const addParens = eq => {
  //   eq = eq.split(' ');
  //   for (let i=0; i < eq.length; i++) {
  //     let layer = 0;
  //     if (eq[i] === '+') {
  //       // let beginSet = false;
  //       // let endSet = false;
  //       // while (!beginSet) {
  //       for (let b = i-1; b >= 0; b--) {
  //         console.log(layer);
  //         // if (eq[b].includes(')')) {
  //         // let count = (eq[b].match(/\()/g) || []).length;
  //         layer += (eq[b].match(/\)/g) || []).length;
  //         // } else if (eq[b].includes('(')) {
  //         layer -= (eq[b].match(/\(/g) || []).length;
  //         // }
  //         console.log("layer", layer);
  //         if (layer === 0) {
  //           eq[b] = `(${eq[b]}`;
  //           // beginSet = true;
  //           break;
  //         }
  //       }
  //       // }
  //       console.log("set beginning", eq);
  //       // while (!endSet) {
  //       for (let e = i+1; e < eq.length; e++) {
  //         console.log(eq[e]);
  //         console.log(layer);
  //         // if (eq[e].includes('(')) {
  //         //   layer += 1;
  //         //   console.log(layer);
  //         // } else if (eq[e].includes(')')) {
  //         //   layer -= 1;
  //         // }
  //         layer += (eq[e].match(/\(/g) || []).length;
  //         layer -= (eq[e].match(/\)/g) || []).length;
  //         if (layer === 0) {
  //           eq[e] = `${eq[e]})`;
  //           // endSet = true;
  //           break;
  //         }
  //       }
  //       // }
  //       console.log("set end", eq);
  //     }
  //   }
  //   return eq.join(' ');
  // }



  const handleParens = (eq) => {
    // const e = eq.match(/\((*)\))/)
    const e = eq.split('');
    // console.log("e", e);
    let allExp = [];
    let currExp = "";
    // let insideParen = false;
    let layers = 0;
    for (let i = 0; i<e.length; i++) {
      const c = e[i];
      if (c === " ") {
        continue;
      } else if (c === '(') {
        if (layers === 0) {
          if (currExp !== '') allExp.push(currExp);
          currExp = "";
        } else {
          currExp += c;
        }
        layers += 1;
      } else if (c === ')') {
        layers -= 1;
        if (layers === 0) {
          allExp.push(handleParens(currExp));
          currExp = "";
        } else {
          currExp += c;
        }
      } else {
        currExp += c;
      }
    }
    if (currExp !=='') allExp.push(currExp);
    // console.log([allExp.join('')]);
    return flatOperations([allExp.join('')]);
  }

  const flatOperations = (eq) => {
    let currentExp = "";
    for (let i = 0; i < eq.length; i++) {
      let exp = eq[i];
      if (eq[i].includes('*')) {
        const mul = eq[i].split('*');
        const added = mul.map(m => {
          // console.log(m, flatOperations([m]));
          if (m.includes('+')) {
            // console.log(m, flatOperations([m]));
            return flatOperations([m]);
          } else {
            return m;
          }

        });
        // console.log(added);
        exp = added.join('*');
      }

      // console.log(exp);
      exp = exp.split('');
      // console.log("e", exp);
      exp.forEach((c, j) => {
        // console.log(currentExp);
        if (['+', '*'].includes(c)) {
          // console.log(currentExp)
          currentExp = eval(currentExp).toString();
          currentExp += c;
          // console.log(currentExp);
        } else {
          currentExp += c;
          // console.log(currentExp);
          if (j === exp.length-1) {currentExp = eval(currentExp).toString();}
        }
      })
    }
    // console.log(currentExp);
    return currentExp.toString();
  }

  let total = 0;
  eqs.forEach(eq => {
    // console.log(addParens(eq));
    // console.log(handleParens(eq));
    total += parseInt(handleParens(eq));
  })
  console.log(total);

})
