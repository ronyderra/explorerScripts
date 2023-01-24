import axios from "axios";
import { evmDestinationActionId } from "../Helpers/evmDestinationActionId.js";
import { elegantUnpair } from "../Helpers/actionId.js";

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
"https://api.bscscan.com/api?module=account&action=txlist&address=0xbC9091bE033b276b7c2244495699491167C20037&startblock=0&endblock=25042540&page=1&offset=10000&sort=desc&apikey=7GD7VH73QXDCP89CXN2J1J821IHARAVI27"

export const updateDestinationHash = async (collection) => {
  const allTrxs = await get_all_trxs_from_contract();
  let updatedOnes = [];

  for (let item of allTrxs) {
    try {
      const originalActionId = await evmDestinationActionId(item.hash, "https://polygon-rpc.com");

      console.log({ hash: item.hash, originalActionId });

      const trxsWithoutToHash = await collection
        .find({
          toChain: "7",
          actionId: originalActionId.toString(),
          toHash: null,
          status: "Failed",
        })
        .toArray();

      if (trxsWithoutToHash.length === 1) {
        await collection.updateOne(
          { toChain: "7", actionId: originalActionId.toString(), toHash: null },
          { $set: { toHash: item.hash.toString(), status: "Completed" } }
        );

        updatedOnes.push({ toHash: item.hash.toString() });

        console.log("updated!!!!!!!: ", {
          toHash: item.hash.toString(),
          originalActionId: originalActionId,
        });
      }
      if (trxsWithoutToHash.length === 0) {
        console.log("all good: ", {
          toHash: item.hash.toString(),
          originalActionId: originalActionId,
        });
      }
    } catch (error) {
      console.log(error.message);
      continue;
    }
  }
  console.log(updatedOnes);
};
