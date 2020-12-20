// day 19, part 2 is buggy and incomplete
const fs = require('fs');
fs.readFile('day19data.txt', 'utf8', (err, data) => {
  const parse = data => {
    let [rules, inputs] = data.split("\r\n\r\n");
    // console.log(rules, "inputs", inputs);
    let rulesMap = {};
    rules = rules.split("\r\n");
    // console.log(rules);
    rules.forEach(r => {
      let [num, ru] = r.split(': ');
      ru = ru.split('|').map(r => r.trim().split(' '));
      let rules = [];
      ru.forEach(r => {
        // console.log(r);
        let subRule = [];
        r.forEach(r2 => {
          // console.log(r2, typeof r2);
          // parseInt(r2)
          if (r2.includes('\"')) {
            // console.log("hello", r2);
            subRule.push(r2.replace(/['"]+/g, ''));
          } else if (typeof parseInt(r2) === 'number') {
            subRule.push(parseInt(r2));
            // console.log(rule);
          } else {
            console.log("shouldn't get here", r2);
          }
        })
          rules.push(subRule);

      });
      // console.log(num, rules);
      // if (num === 8) {do something}
      rulesMap[num] = rules;
    })
    return [rulesMap, inputs];
  }

  const [rulesMap, inputs] = parse(data);
  console.log(rulesMap);

  let rule0 = rulesMap[0];
  // console.log(rule0);

  const r42 = "(((b)((a)((b)(b)|(a)(b))|(b)(((a)|(b))((a)|(b))))|(a)((b)((b)(b))|(a)((b)(b)|(a)((a)|(b)))))(b)|((((a)(a)|(a)(b))(a)|((b)(b))(b))(b)|((((a)|(b))(a)|(b)(b))(a))(a))(a))"; //buildSubrules(rulesMap[42]);
  const r31 = "((b)((b)((a)((b)(a))|(b)((a)(a)))|(a)((b)((a)(b)|((a)|(b))(a))|(a)((b)(a)|(a)(b))))|(a)((b)(((a)(b)|((a)|(b))(a))(b)|(((a)|(b))(a)|(b)(b))(a))|(a)(((b)(a))(b)|((b)(a)|(b)(b))(a))))";//buildSubrules(rulesMap[31]);
  const r8 = `${r42}+`
  const r11 = `(${r42}${r31}) | (${r42}${r42}${r31}${r31}) | (${r42}${r42}${r42}${r31}${r31}${r31}) | (${r42}${r42}${r42}${r42}${r31}${r31}${r31}${r31}) | (${r42}${r42}${r42}${r42}${r42}${r31}${r31}${r31}${r31}${r31}) | (${r42}${r42}${r42}${r42}${r42}${r42}${r31}${r31}${r31}${r31}${r31}${r31})`;

  // const buildSubrules-dead = rule => {
  //   let decomposed = [];
  //   for (let i = 0; i < rule.length; i++) {
  //     const r = rule[i];
  //     let decomSubrule = [];
  //     // console.log(r);
  //     for (let ri = 0; ri < r.length; ri++) {
  //       // console.log(r[ri]);
  //       const subRule = r[ri];
  //       if (typeof subRule === 'string') {
  //         // console.log(subRule);
  //         // decomSubrule.push(...subRule);
  //         decomSubrule += subRule;
  //         // console.log(decomSubrule);
  //       } else {
  //         // console.log(buildSubrules(rulesMap[subRule]).flat(1));
  //         // decomSubrule.push(buildSubrules(rulesMap[subRule]));
  //         decomSubrule.push(buildSubrules(rulesMap[subRule]));
  //       }
  //       // console.log(decomSubrule);
  //     }
  //     // console.log([...decomSubrule].flat(1));
  //     // decomposed.push([...decomSubrule].flat(1));
  //     decomposed.push(decomSubrule);
  //     // decomposed = decomSubrule.flat(1);
  //     // [['a', 'b'], ['b', 'a']]
  //   }
  //   return decomposed;
  // }

  const buildSubrules = rule => {
    // console.log(rule);

    let decomposed = "";
    for (let i = 0; i < rule.length; i++) {
      const r = rule[i];
      let decomSubrule = "";
      // console.log(r);
      // decomSubrule += '(';

      if (i !== 0) {decomSubrule += "|"}
      for (let ri = 0; ri < r.length; ri++) {
        // if (ri !== 0) { decomSubrule += "|"}
        // console.log(r[ri]);
        const subRule = r[ri];

        // part 2 begin
        //continue this tomorrow
        if (subRule === 8) {
          //  add some +
          decomSubrule += r8;
          continue;
        } else if (subRule === 11) {
          //  add some other +
          decomSubrule += r11;
          continue;
        }
        // part 2 end

        if (typeof subRule === 'string') {
          // console.log(subRule);
          decomSubrule += subRule;
          // console.log(decomSubrule);
        } else {
          // console.log(buildSubrules(rulesMap[subRule]).flat(1));
          decomSubrule += buildSubrules(rulesMap[subRule]);
        }
      }
      // console.log(decomSubrule);
      // decomSubrule += ')';
      decomposed += decomSubrule;
    }
    return `(${decomposed})`;
  }

  // console.log("rule4", buildSubrules(rulesMap[4]));
  // console.log("rule3", buildSubrules(rulesMap[3]));
  // // (ab|ba)
  // console.log("rule1", buildSubrules(rulesMap[1]));
  // [ [['aa','bb'],['ab','ba']], 'ab,baaa,bb' ]
  // console.log("rule0", ...buildSubrules(rule0));
//  a((aa|bb)(ab|ba)|(ab|ba)(aa|bb))b



  const regex = new RegExp("^" + buildSubrules(rulesMap[0]) + "$")
  // console.log(buildSubrules(rulesMap[0]));
  console.log("42", buildSubrules(rulesMap[42]));
  console.log("31", buildSubrules(rulesMap[31]));


  const checkString = str => {
    return regex.test(str);
  }

  // console.log(inputs);
  let count = 0;
  inputs.split("\r\n").forEach(i => {
    // console.log(i, checkString(i));
    if (checkString(i)) {count += 1}
  })
  console.log(count);

})

// let regex = "/a(ab|ba)/g"
//c = '(' + d+e+'|' + e+ d + ')'
// const regex = new RegExp(a);

//A loop would probably just be putting a + sign at the end of the parentheses
// 8: 42 | 42 8
// 42 42 42 42 42
//   (42)+

// 11: 42 31 | 42 11 31
// 42 31
// 42 42 31 31
// 42 42 42 31 31 31
//   (42)+ (31)+
// # of + must be equiv.