import axios from "axios";

export const updateCollName = async (array, collection) => {
    for (let item of array) {
        console.log(item.fromHash)
        const res = await axios.get(`https://apilist.tronscan.org/api/transaction-info?hash=${item.fromHash}`)
        const collectionName = res.data.trc721TransferInfo[0].name
        console.log({ collectionName });
        await collection.updateOne({ fromHash: item.fromHash }, { $set: { collectionName } });
    }
}