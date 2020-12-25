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
      rulesMap[num] = rules;
    })
    return [rulesMap, inputs];
  }

  const [rulesMap, inputs] = parse(data);
  console.log(rulesMap);

  // let rule0 = rulesMap[0];
  // console.log(rule0);

  //for example
  // const r42-e = "(((b)((a)((b)(b)|(a)(b))|(b)(((a)|(b))((a)|(b))))|(a)((b)((b)(b))|(a)((b)(b)|(a)((a)|(b)))))(b)|((((a)(a)|(a)(b))(a)|((b)(b))(b))(b)|((((a)|(b))(a)|(b)(b))(a))(a))(a))"; //buildSubrules(rulesMap[42]);
  // const r42-e2 = "((b(a(bb|ab)|b((a|b)(a|b)))|a(b(bb)|a(bb|a(a|b))))b|(((aa|ab)a|(bb)b)b|(((a|b)a|bb)a)a)a)"; //buildSubrules(rulesMap[42]);
  //for real
  const r42 = "((b((((b((b|a)(b|a))|a(ba|aa))b|(a((b|a)(b|a))|b(ba|ab))a)b|((b(ab|bb)|a(ba|ab))b|(a(ba|a(b|a))|b((b|a)(b|a)))a)a)a|(a(((ab|bb)b)a|((aa|bb)a)b)|b((b(ba|aa)|a(ba))a|((bb|ba)b|(ba|a(b|a))a)b))b)|a(b((b((bb|ba)b|(ba|aa)a)|a(a(aa|ab)))a|(b((bb|ba)b|(ba|ab)a)|a(b(bb|ba)|a(ba)))b)|a(a(a((ba|a(b|a))b|(b(b|a)|ab)a)|b(b(aa|ab)|a(aa|bb)))|b((a(b(b|a)|ab)|b(bb|ba))b|((aa|bb)b|(bb|ba)a)a))))a|((a(b(b(a((b|a)(b|a))|b(aa|bb))|a(b(bb|ba)|a(aa)))|a(a(((b|a)(b|a))b|(ba|ab)a)|b((aa|bb)a)))|b(b(a(a(ba))|b(b(b(b|a)|ab)|a(ba|a(b|a))))|a((b(aa)|a((b|a)(b|a)))b|((ba|aa)a|(b(b|a)|aa)b)a)))b|((b(a(a(aa)|b(ba|aa))|b(a(ab|bb)|b(ba)))|a(b((bb|ba)a)|a((bb|ba)b|(ba|aa)a)))b|(b((b(bb|ba))b|(a(bb|ba)|b(aa|bb))a)|a(((aa|bb)a|(aa|ab)b)a|((ab|bb)b|(ba|a(b|a))a)b))a)a)b)"; //buildSubrules(rulesMap[42]);
  //for example
  // const r31-e = "((b)((b)((a)((b)(a))|(b)((a)(a)))|(a)((b)((a)(b)|((a)|(b))(a))|(a)((b)(a)|(a)(b))))|(a)((b)(((a)(b)|((a)|(b))(a))(b)|(((a)|(b))(a)|(b)(b))(a))|(a)(((b)(a))(b)|((b)(a)|(b)(b))(a))))";//buildSubrules(rulesMap[31]);
  // const r31-e2 = "(b(b(a(ba)|b(aa))|a(b(ab|(a|b)a)|a(ba|ab)))|a(b((ab|(a|b)a)b|((a|b)a|bb)a)|a((ba)b|(ba|bb)a)))";//buildSubrules(rulesMap[31]);
  //for real
  const r31 = "(a(b(b(b(((ba)b|(ba)a)a|((ba|ab)b|(aa|bb)a)b)|a(((bb|ba)a)b|(b(b(b|a)|aa)|a(b(b|a)|ab))a))|a(((b((b|a)(b|a))|a(bb|ba))a|((ba|a(b|a))b|(ba|aa)a)b)a|((((b|a)(b|a))b|(b(b|a)|aa)a)a|((ba|ab)a|(ba|a(b|a))b)b)b))|a(a(a(a((aa)a|(ab)b)|b(b(ba|ab)))|b(b(a(ab|bb)|b(ba|a(b|a)))|a(b(aa|ab)|a(ba))))|b((b((ab)a|(aa|ab)b)|a(b(ba|aa)|a(aa|ab)))a|((((b|a)(b|a))b|(ba|ab)a)b|((aa)a|(ba)b)a)b)))|b((((b((bb|ba)b|(ba|a(b|a))a)|a(b(ab|bb)|a(b(b|a)|ab)))b|(a(((b|a)(b|a))b|(aa|ab)a)|b(b(aa)|a(b(b|a)|ab)))a)a|((((b(b|a)|ab)a|(ba|ab)b)b|((ba)a|(ba|ab)b)a)b|(((ba)a|((b|a)(b|a))b)a|(a(ab)|b(ab))b)a)b)b|((b(((aa|bb)a)b|(a(ab)|b(ab))a)|a((b(bb|ba)|a(ab))a|((ab|bb)b)b))a|(a((((b|a)(b|a))a|(ba|aa)b)a|(((b|a)(b|a))b|(ba|ab)a)b)|b((((b|a)(b|a))b|(aa)a)a|(a(ab|bb)|b(ba))b))b)a))";
  const r8 = `(${r42})+`;
  const r11 = `(${r42}${r31}|${r42}${r42}${r31}${r31}|${r42}${r42}${r42}${r31}${r31}${r31}|${r42}${r42}${r42}${r42}${r31}${r31}${r31}${r31}|${r42}${r42}${r42}${r42}${r42}${r31}${r31}${r31}${r31}${r31}|${r42}${r42}${r42}${r42}${r42}${r42}${r31}${r31}${r31}${r31}${r31}${r31})`;

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
        if (subRule === 8) {
          decomSubrule += r8;
          continue;
        } else if (subRule === 11) {
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
    // console.log(decomposed);
    if (['a', 'b'].includes(decomposed)) {
      return decomposed;
    } else {
      return `(${decomposed})`;
    }

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