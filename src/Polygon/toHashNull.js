import axios from "axios";


export const polygonToHashNull =async () =>{

const resp = axios.get(`https://api.polygonscan.com/api
?module=account
&action=tokennfttx
&contractaddress=0x7E8493F59274651Cc0919feCf12E6A77153cdA72
&address=0x14CAB7829B03D075c4ae1aCF4f9156235ce99405
&startblock=0
&endblock=99999999
&page=1
&offset=100
&sort=asc
&apikey=NRQCCTFCFTZBW89SKKBVPN7RR8Z75VH8XC`)


}


function elegantUnpair(z) {
    var sqrtz = Math.floor(Math.sqrt(z)),
      sqz = sqrtz * sqrtz;
    return z - sqz >= sqrtz ? [sqrtz, z - sqz - sqrtz] : [z - sqz, sqrtz];
  }
  
  function elegantPair(x, y) {
    return x >= y ? x * x + x + y : y * y + x;
  }