import axios from "axios";

export const getClientTrxs = async (address, collection) => {
  try {
    const allTrxs = await axios.get(
      `https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=0xdA410D6CfEfceb5619224fe06f7018cc3E3498EA&address=${address}&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=NRQCCTFCFTZBW89SKKBVPN7RR8Z75VH8XC`
    );
    console.log(allTrxs.data.result.length);
    const filterTo = allTrxs.data.result.filter(
      e => e.to === "0x14cab7829b03d075c4ae1acf4f9156235ce99405"
    );
    const filterFrom = allTrxs.data.result.filter(
      e => e.from === "0x14cab7829b03d075c4ae1acf4f9156235ce99405"
    );

    let nonFound = [];

    for (const item of filterTo) {
      const res = await collection.find({ chainName: "POLYGON", fromHash: item.hash }).toArray();
      if (res.length === 0) {
        console.log("got here");
        nonFound.push(item);
      } else {
        console.log(res[0].senderAddress);
        await collection.updateOne(
          { chainName: "POLYGON", fromHash: item.hash },
          { $set: { senderAddress: "0xa6FA4bDD6B96A7b45Bad16c3049a0ADA6c0d0607" } }
        );
      }
    }




  } catch (err) {
    console.log(err.message);
  }
};
// https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=0xdA410D6CfEfceb5619224fe06f7018cc3E3498EA&address=0xa6FA4bDD6B96A7b45Bad16c3049a0ADA6c0d0607&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=NRQCCTFCFTZBW89SKKBVPN7RR8Z75VH8XC
