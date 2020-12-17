const fs = require("fs");
fs.readFile('day7data.txt', (err, data) => {
  const rules = data.toString().split("\r\n");
  // let bagTypes = [];
  let bagInners= {}; // bag inners
  let bagOuters = {}; // bag outers

  const parseString = (s) => {
    const [outer, inner] = s.split(' bags contain ');
    // console.log(outer, ":", inner);
    if (inner === 'no other bags.') {
      return [outer, []];
    }
    let contains = inner.split(', ');
    contains = contains.map((c) => {
      const [num, c1, c2, bag] = c.split(' ');
      return [c1, c2].join(' ');
    })
    return [outer, contains];
  }
  //first outermost layer
  rules.forEach((r) => {
    const [outer, inner] = parseString(r);
    // console.log(outer, inner);
    bagInners[outer] = inner;
    // inner.forEach((b) => {
    //   bagOuters[b] = bagOuters[b] || [];
    //   bagOuters[b].push(outer);
    // })
  });
  // go through and add all sublayers
  rules.forEach((r) => {
    const [outer, inner] = parseString(r);
    // console.log(outer, inner);

    let bagSuperInners = inner;
    // console.log("superinners1 for", outer, bagSuperInners);

    while (bagSuperInners.length > 0) {
      const b = bagSuperInners.shift();
      bagOuters[b] = bagOuters[b] || [];
      if (!bagOuters[b].includes(outer)) {bagOuters[b].push(outer)};
      bagSuperInners.push(...bagInners[b]);
      // console.log("superinners2 for", outer, bagSuperInners);
    }
    // console.log("bagOuters", bagOuters);
    if (bagOuters['shiny gold']) {console.log(bagOuters['shiny gold'],  bagOuters['shiny gold'].length)};
  });
});


fs.readFile('day7data.txt', (err, data) => {
  const rules = data.toString().split("\r\n");
  // let bagTypes = [];
  let bagInners= {}; // bag inners
  let bagOuters = {}; // bag outers

  const parseString = (s) => {
    const [outer, inner] = s.split(' bags contain ');
    // console.log(outer, ":", inner);
    if (inner === 'no other bags.') {
      return [outer, []];
    }
    let contains = inner.split(', ');
    contains = contains.map((c) => {
      const [num, c1, c2, bag] = c.split(' ');
      return [[c1, c2].join(' '), num];
    })
    return [outer, contains];
  }
  //first outermost layer
  rules.forEach((r) => {
    const [outer, inner] = parseString(r);
    // console.log(outer, inner);
    bagInners[outer] = inner;
    // inner.forEach((b) => {
    //   bagOuters[b] = bagOuters[b] || [];
    //   bagOuters[b].push(outer);
    // })
  });

  let counts = {};
  // go through and add all sublayers
  // rules.forEach((r) => {
  //   const [outer, inner] = parseString(r);
    // console.log(outer, inner);
    outer = 'shiny gold';
    inner = bagInners[outer];

    let bagSuperInners = inner;
    // console.log("superinners1 for", outer, bagSuperInners);

    while (bagSuperInners.length > 0) {
      const b = bagSuperInners.shift();
      // bagOuters[b] = bagOuters[b] || [];
      // if (!bagOuters[b].includes(outer)) {
      //   bagOuters[b].push(outer);
      //   counts[b] +=
      // };
      // console.log("b", b);
      counts[outer] = counts[outer] || 0;
      const iter = parseInt(b[1]);
      // console.log(iter);
      counts[outer] += iter;
      // console.log(Array(iter).fill(bagInners[b[0]]));
      bagSuperInners.push(...Array(iter).fill(bagInners[b[0]]).flat());
      console.log("superinners2 for", outer, bagSuperInners);
    }
    // console.log("bagOuters", bagOuters);
    // if (bagOuters['shiny gold']) {console.log(bagOuters['shiny gold'],  bagOuters['shiny gold'].length)};
    if (counts['shiny gold']) {console.log("counts", counts['shiny gold'])};
  // });
});