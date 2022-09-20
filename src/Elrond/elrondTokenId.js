import axios from "axios";
import { getOriginalHash } from "./elrondTrx.js"

export const getElrondTokenId = async (hash) => {
    try {
        const res = await axios.get(`https://api.elrond.com/transactions/${hash}`)
        const tokenId = res.data.action.arguments.transfers[0].identifier
        // console.log(res.data.action.arguments.transfers[0].identifier);
        // console.log(res.data.operations[0].identifier);
        // console.log("----------------");
        return (tokenId)
    } catch (err) {
        console.log(hash);
        console.log(err.message);
        console.log("----------------");
        const newHash = await getOriginalHash(hash)
        const res = await axios.get(`https://api.elrond.com/transactions/${newHash}`)
        const tokenId = res.data.action.arguments.transfers[0].identifier
        console.log("worked", tokenId)
        return (tokenId)
    }
}

export const updateTokenId = async (array, collection) => {
    for (let item of array) {
        const res = await getElrondTokenId(item.fromHash)
        console.log(res);
        if (res) {
            await collection.updateOne({ fromHash: item.fromHash }, { $set: { tokenId: res } });
        }
    }
}