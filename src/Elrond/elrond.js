import axios from "axios";
import { elegantPair } from "../Helpers/actionId.js";

export const trxStatus = async (hashes) => {
  let goodOnes = 0;
  let badOnes = [];

  for (let item of hashes) {
    const res = await axios.get(`https://api.elrond.com/transactions/${item.toHash}`);
    if (res.data.status === "success") {
      console.log(item.toHash);
      goodOnes++;
    } else {
      badOnes.push(item);
    }
  }

  console.log("goodOnes", goodOnes);
  console.log(badOnes);

  return badOnes;
};

export const getDestinationTrx = async (actionId, fromNonce) => {
  const destActionId = elegantPair(fromNonce, actionId);
 



};
