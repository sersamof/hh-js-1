function sum(a) {
   sum.partialSum || (sum.partialSum = 0);
   sum.partialSum += a;
   sum.toString = sum.valueOf = function() { 
      const curSum = sum.partialSum;
      sum.partialSum = 0;
      return curSum;
   };
   return sum; 
}
console.log(+sum(1)(2)(3)); // ок - 6
console.log(+sum(1)(2)(5)); // ок - 8

const s1 = sum(1)(2)(3);
const s2 = sum(1)(2)(5);

console.log(+s1); // упс - 14
console.log(+s2); // упс - 0

// не создавая новую функцию, не выходит изолировать состояние объекта :(
