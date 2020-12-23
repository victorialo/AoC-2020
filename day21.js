const fs = require('fs');
fs.readFile('day21data.txt', 'utf8', (err, data) => {
  const lists = data.split("\r\n");
  let allergenMap = new Map();
  let allIng = new Set;
  let allLists = [];
  lists.forEach(l => {
    let [ing, aller] = l.split(" (contains");
    // console.log(ingred, aller);
    ing = ing.trim().split(' ');
    [...ing].forEach(i => {
      allIng.add(i);
      allLists.push(i);
    })
    // console.log(allIng);
    aller = aller.trim().slice(0, -1).split(', ');
    // console.log(aller, ingred);
    aller.forEach(a => {
      if (allergenMap.has(a)) {
      //  compare
        let prevIng = allergenMap.get(a);
        // console.log(a, prevIng);
        const ingCommon = ing.filter(i => prevIng.includes(i));
        // console.log(ingCommon);
        allergenMap.set(a, ingCommon);
      } else {
        allergenMap.set(a, ing);
      }
    })
  })
  // console.log(allergenMap);
  let hypoallergenic = [...allIng];
  for (let a of allergenMap.values()) {
    // console.log(a, hypoallergenic);
    hypoallergenic = hypoallergenic.filter(i => !a.includes(i));
  }
  // console.log(hypoallergenic);
  // console.log(allLists);
  console.log(allLists.filter(i => hypoallergenic.includes(i)).length);

  // part 2
  let seen = [...hypoallergenic];
  let allergenMap2 = {};

  while (seen.length < [...allIng].length) {
    allergenMap.forEach((i,a) => {
      const removed = i.filter(ing => !seen.includes(ing));
      // console.log(removed);
      allergenMap.set(a, removed);
      if (removed.length === 1) {
        seen.push(removed[0]);
        allergenMap2[a] = removed[0];
      }
    })
    console.log(allergenMap, allergenMap2);
    console.log(Object.keys(allergenMap2).sort().map(a => allergenMap2[a]).join(','));
  }
})
