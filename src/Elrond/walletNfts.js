import axios from "axios";

export const get_Wallet_nfts_list = async (address, nft) => {
//   const res = await axios.get(
//     `https://api.elrond.com/accounts/${address}/nfts?size=10000&collection=${nft}`
//   );
//   console.log("addres:", address);
//   console.log(nft, ":", res.data.length);
  

//   const res1 = await axios.get(`https://api.elrond.com/transactions?size=1000&receiver=${address}&token=${nft}`);
//   console.log(res1.data.length)
//   console.log(res1.data[2])
//   console.log(" ")

const res2 = await axios.get("https://api.elrond.com/accounts/erd1qqqqqqqqqqqqqpgq3y98dyjdp72lwzvd35yt4f9ua2a3n70v0drsfycvu8/transfers?from=0&size=9999")



};

export const contract_trxs = async () => {};
