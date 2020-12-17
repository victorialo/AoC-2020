const fs = require('fs');
fs.readFile('day16data.txt', 'utf8', (err, data) => {
  const d = data.split('\r\n\r\n');
  // console.log(d);
  let [fields, my, nearby] = d.map(i => i.split('\r\n'));
  // console.log(fields, my, nearby);
  // let possibleNums = new Set();
  let possibleNums = [];
  fields.forEach((f) => {
    let ranges = f.split(':')[1].split(' or ');
    // console.log(ranges);
    ranges.forEach((r) => {
      const [start, end] = r.trim().split('-').map(n => parseInt(n));
      // console.log(start, end);
      // possibleNums.add([...])
      // possibleNums.push([...Array.new(end-start)]);
      for (let i = start; i < end+1; i++) {
        possibleNums.push(i);
      }
    })
  })
  // possibleNums.sort((a,b) => a-b);
  // console.log(possibleNums);

  nearby.shift();
  // console.log(nearby);
  let badNums = [];
  nearby.forEach((t) => {
    let currPossibleNums = [...possibleNums];
    let ticket = t.split(',');
    ticket.forEach((n) => {
      n = parseInt(n);
      if (currPossibleNums.includes(n)) {
        currPossibleNums.splice(currPossibleNums.indexOf(n), 1);
      } else {
        badNums.push(n);
      }
      // console.log(badNums, currPossibleNums);
    })
  })
  console.log(badNums.reduce((sum, n) => sum+n));
})

fs.readFile('day16data.txt', 'utf8', (err, data) => {
  const d = data.split('\r\n\r\n');
  let [fields, my, nearby] = d.map(i => i.split('\r\n'));
  let possibleNums = [];
  let numToField = {};
  fields.forEach((f) => {
    let field = f.split(':')[0];
    let ranges = f.split(':')[1].split(' or ');
    ranges.forEach((r) => {
      const [start, end] = r.trim().split('-').map(n => parseInt(n));
      for (let i = start; i < end+1; i++) {
        possibleNums.push(i);
        numToField[i] = numToField[i] || [];
        numToField[i].push(field);
      }
    })
  })

  nearby.shift();
  let validTickets = [];
  for (let i in nearby) {
    let t = nearby[i];
    let currPossibleNums = [...possibleNums];
    let ticket = t.split(',');
    let ticketFields = [];
    let badTicket = false;
    for (let n in ticket) {
      const f = parseInt(ticket[n]);
      if (currPossibleNums.includes(f)) {
        ticketFields.push(numToField[f]);
      } else {
        badTicket = true;
        break;
      }
    }
    if (!badTicket) {validTickets.push(ticketFields)}
  }
  // console.log("valid tickets", validTickets);
  let finalFields = [];
  validTickets.forEach((t, i) => {
    if (i === 0) {
      finalFields = t;
    } else {
      finalFields.forEach((f,i) => {
        finalFields[i] = f.filter(d => t[i].includes(d));
      })
    }
  })

  let finalFieldsIndices = {};
  for (let i = 0; i < finalFields.length; i++ ) {
    finalFieldsIndices[finalFields[i]] = i;
  }

  let sorted = finalFields.sort((a,b) => a.length-b.length);
  let finalFields2 = {};
  let used = [];
  sorted.forEach((f) => {
    const ind = finalFieldsIndices[f];
    const field = f.filter((u) => !used.includes(u))[0];
    finalFields2[field] = ind;
    used.push(field);
  })
  let myNums = my[1].split(',').map(n => parseInt(n));
  console.log(finalFields2, myNums);

  const dep = Object.keys(finalFields2).filter(k => k.includes('departure')).map(f => finalFields2[f]);
  let product = 1;
  dep.forEach(f => {
    product *= myNums[f];
  })

  console.log(product);
})


  // [
  // [
  //   'departure location', 'departure station',
  //   'departure platform', 'departure track',
  //   'departure date',     'departure time',
  //   'arrival station',    'arrival platform',
  //   'arrival track',      'class',
  //   'duration',           'price',
  //   'route',              'row',
  //   'seat',               'train',
  //   'type',               'wagon',
  //   'zone'
  // ],
  //   [ 'arrival track', 'duration', 'price', 'row' ],
  //   [
  //     'departure location',
  //     'departure station',
  //     'departure platform',
  //     'departure track',
  //     'departure date',
  //     'departure time',
  //     'arrival track',
  //     'duration',
  //     'price',
  //     'row'
  //   ],
  //   [
  //     'departure location', 'departure station',
  //     'departure platform', 'departure track',
  //     'departure date',     'departure time',
  //     'arrival station',    'arrival platform',
  //     'arrival track',      'duration',
  //     'price',              'route',
  //     'row',                'seat',
  //     'type',               'zone'
  //   ],
  //   [ 'price' ],
  //   [
  //     'departure platform',
  //     'departure track',
  //     'arrival track',
  //     'duration',
  //     'price',
  //     'row'
  //   ],
  //   [
  //     'departure location',
  //     'departure station',
  //     'departure platform',
  //     'departure track',
  //     'departure date',
  //     'departure time',
  //     'arrival platform',
  //     'arrival track',
  //     'duration',
  //     'price',
  //     'route',
  //     'row',
  //     'zone'
  //   ],
  //   [
  //     'departure location', 'departure station',
  //     'departure platform', 'departure track',
  //     'departure date',     'departure time',
  //     'arrival station',    'arrival platform',
  //     'arrival track',      'duration',
  //     'price',              'route',
  //     'row',                'seat',
  //     'type',               'wagon',
  //     'zone'
  //   ],
  //   [
  //     'departure station',
  //     'departure platform',
  //     'departure track',
  //     'departure date',
  //     'arrival track',
  //     'duration',
  //     'price',
  //     'row'
  //   ],
  //   [
  //     'departure location', 'departure station',
  //     'departure platform', 'departure track',
  //     'departure date',     'departure time',
  //     'arrival location',   'arrival station',
  //     'arrival platform',   'arrival track',
  //     'class',              'duration',
  //     'price',              'route',
  //     'row',                'seat',
  //     'train',              'type',
  //     'wagon',              'zone'
  //   ],
  //   [
  //     'departure location',
  //     'departure station',
  //     'departure platform',
  //     'departure track',
  //     'departure date',
  //     'arrival track',
  //     'duration',
  //     'price',
  //     'row'
  //   ],
  //   [
  //     'departure location',
  //     'departure station',
  //     'departure platform',
  //     'departure track',
  //     'departure date',
  //     'departure time',
  //     'arrival station',
  //     'arrival platform',
  //     'arrival track',
  //     'duration',
  //     'price',
  //     'route',
  //     'row',
  //     'zone'
  //   ],
  //   [
  //     'departure location',
  //     'departure station',
  //     'departure platform',
  //     'departure track',
  //     'departure date',
  //     'departure time',
  //     'arrival platform',
  //     'arrival track',
  //     'duration',
  //     'price',
  //     'route',
  //     'row'
  //   ],
  //   [ 'arrival track', 'duration', 'price' ],
  //   [
  //     'departure platform',
  //     'departure track',
  //     'departure date',
  //     'arrival track',
  //     'duration',
  //     'price',
  //     'row'
  //   ],
  //   [ 'duration', 'price' ],
  //   [
  //     'departure location', 'departure station',
  //     'departure platform', 'departure track',
  //     'departure date',     'departure time',
  //     'arrival station',    'arrival platform',
  //     'arrival track',      'duration',
  //     'price',              'route',
  //     'row',                'seat',
  //     'train',              'type',
  //     'wagon',              'zone'
  //   ],
  //   [
  //     'departure location',
  //     'departure station',
  //     'departure platform',
  //     'departure track',
  //     'departure date',
  //     'departure time',
  //     'arrival platform',
  //     'arrival track',
  //     'duration',
  //     'price',
  //     'row'
  //   ],
  //   [ 'departure platform', 'arrival track', 'duration', 'price', 'row' ],
  //   [
  //     'departure location', 'departure station',
  //     'departure platform', 'departure track',
  //     'departure date',     'departure time',
  //     'arrival station',    'arrival platform',
  //     'arrival track',      'duration',
  //     'price',              'route',
  //     'row',                'seat',
  //     'zone'
  //   ]
  // ]
