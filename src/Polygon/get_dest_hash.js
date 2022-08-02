import axios from "axios";
import { evmDestinationActionId } from "../helpers/evmDestinationActionId.js";
import { elegantUnpair } from "../helpers/actionId.js";

export const get_all_trxs_from_contract = async () => {
  try {
    const res = await axios.get(
      "https://api.polygonscan.com/api?module=account&action=txlist&address=0x14CAB7829B03D075c4ae1aCF4f9156235ce99405&startblock=0&endblock=99999999&page=1&offset=10000&sort=desc&apikey=NRQCCTFCFTZBW89SKKBVPN7RR8Z75VH8XC"
    );
    console.log(res.data.result.length);
    return res.data.result;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateDestinationHash = async (collection) => {
  const allTrxs = await get_all_trxs_from_contract();
  const updatedOnes = [];

  for (let item of allTrxs) {
    const originalActionId = await evmDestinationActionId(item.hash, "https://polygon-rpc.com");

    // console.log(item.hash);
    // console.log(originalActionId);

    const trxWithoutToHash = await collection
      .find({
        toChainName: "POLYGON",
        actionId: originalActionId.toString(),
        toHash: null,
      })
      .toArray();

    if (trxWithoutToHash.length === 1) {
      await collection.updateOne(
        { toChainName: "POLYGON", actionId: originalActionId.toString(), toHash: null },
        { $set: { toHash: item.hash.toString() } }
      );

      updatedOnes.push({ toHash: item.hash.toString() });

      console.log("updated!!!!!!!: ", {
        toHash: item.hash.toString(),
        originalActionId: originalActionId,
      });
    }
    if (trxWithoutToHash.length === 0) {
      console.log("all good: ", {
        toHash: item.hash.toString(),
        originalActionId: originalActionId,
      });
    }
  }
  console.log(updatedOnes)
};
