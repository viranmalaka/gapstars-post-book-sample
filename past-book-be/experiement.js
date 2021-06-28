const len = 10000;
const arr = Array(len)
  .fill({})
  .map((x) => ({ id: x }));

const fn1 = () => {
  for (let i = 0; i < len; i++) {
    const idx = arr.indexOf(i);
    const isAv = idx > 0;
  }
};

const fn2 = () => {
  for (let i = 0; i < len; i++) {
    const isAv = arr.some((x) => (x.id = i));
  }
};

console.time('f1');
fn1();
console.timeEnd('f1');

console.time('f2');
fn2();
console.timeEnd('f2');
