const fs = require('fs');
const ATTRIBUTES = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
fs.readFile('day4data.txt', (err, data) => {
  let passports = data.toString().split("\r\n\r\n"); // /[\r\n]{2}\
  // console.log("d1", d);

  passports = passports.map((da) => {
    // console.log("passport", da, "trimmed", da.trim());
    // return da.trim();
    return da.split(/[ \n]+/);
  });
  let valid = 0;
  passports.forEach((p) => {
    // let checkAttr = ATTRIBUTES;
    let count = 0;
    p.forEach((e) => {
      const attr = e.split(':')[0];
      // console.log("attr", attr);
      if (ATTRIBUTES.includes(attr)) { count += 1;}
    })
    // console.log("count", count);
    if (count === ATTRIBUTES.length) { valid += 1;}
  })
  // console.log(passports);
  console.log(valid);
});

const byr = (d) => {
  const y = parseInt(d);
  return (y >= 1920 && y <= 2002);
}
const iyr = (d) => {
  const y = parseInt(d);
  return (y >= 2010 && y <= 2020);
}
const eyr = (d) => {
  const y = parseInt(d);
  return (y>= 2020 && y <= 2030);
}
const hgt = (d) => {
  // let [num, unit] = d.matchAll(/([\d]+)(cm|in)/);
  let [num, unit] = d.split(/(cm|in)/);
  // console.log(a);
  num = parseInt(num);
  // console.log(unit, num);
  if (unit === 'cm') {
    // console.log(num);
    return (num >= 150 && num <= 193);
  } else if (unit === 'in') {
    return (num >= 59 && num <= 76);
  } else {
    return false;
  }
}
const hcl = (d) => {
  return d.trim().match(/^#[0-9a-f]{6}$/) !== null;
}
const ecl = (d) => {
  // console.log(d);
  return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(d.trim());
}
const pid = (d) => {
  return d.trim().match(/^[0-9]{9}$/) !== null;
}

fs.readFile('day4data.txt', (err, data) => {
  let passports = data.toString().split("\r\n\r\n"); // /[\r\n]{2}\
  // console.log("d1", d);

  passports = passports.map((da) => {
    return da.split(/[ \n]+/);
  });
  let valid = 0;
  passports.forEach((p) => {
    // let checkAttr = ATTRIBUTES;
    let count = 0;
    p.forEach((e) => {
      const [attr, d] = e.split(':');
      // console.log("attr", attr, d);
      if (ATTRIBUTES.includes(attr)) {
        // attr(d)
        // console.log(eval(attr)(d.trim()));
        if (eval(attr)(d)) {
          count += 1
        } else {
          console.log("failed on", attr, d);
        };
      }
    })
    console.log("count", count);
    // console.log("byr", byr(d), "iyr", iyr(d), "eyr", eyr(d), "hgt" hgt(d) && hcl(d) && ecl(d) && pid(d))
    if (count === ATTRIBUTES.length) {
      valid += 1;
    }
  })
  // console.log(passports);
  console.log(valid);
});

// e='#2e5235235'
// e.match(/#[0-9a-f]{6}/)
//   ["#2e5235", index: 0, input: "#2e5235235", groups: undefined]