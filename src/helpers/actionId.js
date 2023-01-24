export function elegantUnpair(z) {
    var sqrtz = Math.floor(Math.sqrt(z)),
      sqz = sqrtz * sqrtz;
    return z - sqz >= sqrtz ? [sqrtz, z - sqz - sqrtz] : [z - sqz, sqrtz];
  }
  
  export function elegantPair(x, y) {
    return x >= y ? x * x + x + y : y * y + x;
  }
  
  console.log( elegantUnpair(1197));