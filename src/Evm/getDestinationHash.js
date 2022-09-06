import axios from "axios";
import { evmDestinationActionId } from "../Helpers/evmDestinationActionId.js";
import { elegantUnpair } from "../Helpers/actionId.js";

export const get_all_trxs_from_contract = async (url) => {
    try {
        const res = await axios.get(url);
        console.log(res.data.result.length);
        return res.data.result;
    } catch (error) {
        console.log(error.message);
    }
};

export const evmUpdateDestinationHash = async (collection, rpc, toChain, url) => {
    const allTrxs = await get_all_trxs_from_contract(url);
    const updatedOnes = [];

    for (let item of allTrxs) {
        const originalActionId = await evmDestinationActionId(item.hash, rpc);

        // console.log(item.hash);
        // console.log(originalActionId);

        const trxWithoutToHash = await collection
            .find({
                toChain,
                actionId: originalActionId.toString(),
                toHash: null,
            })
            .toArray();

        if (trxWithoutToHash.length === 1) {
            await collection.updateOne(
                { toChain, actionId: originalActionId.toString(), toHash: null },
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
