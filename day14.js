const fs = require('fs');
fs.readFile('day14data.txt', (err, data) => {
  let d = data.toString().split("\r\n");

  let storage = new Map();
  let mask = new Map();
  let maskLength = 0;
  d.forEach((l) => {
    if (l.includes('mask')) {
      mask = new Map();
      mask.set('0', []); // should have just used two arrays for 0 and 1
      mask.set('1', []);

      let maskRead = l.split(' ').slice(-1)[0];
      maskLength = maskRead.length;
      for (let i = 0; i < maskRead.length; i++ ) {
        let c = maskRead[i];
        if (mask.has(c)) {
          mask.get(c).push(i);
        }
      }
      // console.log(mask);
    } else {
      let [mem, , num] = l.split(' ');
      num = parseInt(num);
      let [, pos, _e]  = mem.split(/(\d+)/);
      pos = parseInt(pos);
      // console.log(num, pos);
      const bin = (num >>> 0).toString(2).padStart(maskLength, '0');
      // console.log("bin", bin);
      let newNum = bin.split('');
      // console.log(newNum, mask);
      mask.get('0').forEach((i) => {
        // console.log(i);
        newNum[i] = '0';
      })
      mask.get('1').forEach((i) => {
        newNum[i] = '1';
      })
      // console.log("newnum", newNum.join(''));
      storage.set(pos, parseInt(newNum.join(''), 2));
      // console.log(storage);
    }
  })
  console.log(Array.from(storage.values()).reduce((sum, n) => sum + n))
})


fs.readFile('day14data.txt', (err, data) => {
  let d = data.toString().split("\r\n");

  let storage = new Map();
  let mask = new Map();
  let maskLength = 0;
  d.forEach((l) => {
    if (l.includes('mask')) {
      mask = new Map();
      mask.set('0', []); // should have just used two arrays for 0 and 1
      mask.set('1', []);
      mask.set('X', []);

      let maskRead = l.split(' ').slice(-1)[0];
      maskLength = maskRead.length;
      for (let i = 0; i < maskRead.length; i++ ) {
        let c = maskRead[i];
        mask.get(c).push(i);
      }
    } else {
      let [mem, , num] = l.split(' ');
      num = parseInt(num);
      let [, pos, _e]  = mem.split(/(\d+)/);
      pos = parseInt(pos);
      const bin = (pos >>> 0).toString(2).padStart(maskLength, '0');
      let newPos = bin.split('');
      mask.get('1').forEach((i) => {
        newPos[i] = '1';
      })
      mask.get('X').forEach((i) => {
        newPos[i] = 'X';
        // let mask = '0X010100X010X100X';
        // let bits = ['A', 'B', 'C', 'D'];
        //
        // let new_mask = mask.replace(/X/g, _ => bits.shift());
        // console.log(new_mask);
      })
      // console.log(newPos);

      let queue = [newPos];
      while (queue.length > 0) {
        const curr = queue.pop();
        const replace = curr.indexOf('X');
        let zero = [...curr];
        zero[replace] = '0';
        let one = [...curr];
        one[replace] = '1';
        // console.log("zero, one", zero, one);
        if (zero.indexOf('X') !== -1) {
          queue.push(zero);
          queue.push(one);
          // console.log('queue', queue);
        } else {
          zero = parseInt(zero.join(''), 2);
          one = parseInt(one.join(''), 2);
          storage.set(zero, num);
          storage.set(one, num);
        }
      }
      // console.log(storage);
    }
  })
  console.log(Array.from(storage.values()).reduce((sum, n) => sum + n))
})
