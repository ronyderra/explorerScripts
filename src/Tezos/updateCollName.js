import axios from "axios";
import fetch from 'node-fetch';

const getCollName = async (hash) => {
    try {
        let contractAdd;
        let collectionName;
        let contractData;
        let data;
        let uri;

        // for (let i = 0; i < 20; i++) {

        data = await fetch(`https://api.tzkt.io/v1/operations/${hash}`)

        const d = await data.json()
        console.log(d)
        // if (await data.json()) {
        //     console.log(await data.json())
        //     break;
        // }
        // }
        if (!data) return;

        // console.log(data.data)

        const entrypoint = data.data[0]?.parameter?.entrypoint;
        const tokenId = data.data[0]?.parameter?.value?.token_id

        if (entrypoint === "withdraw_nft") {
            contractAdd = data.data[0]?.parameter?.value?.burner;
            collectionName = "WNFT";
        } else {
            contractAdd = data.data[1]?.target?.address;
            collectionName = data.data[1]?.target?.alias?.toUpperCase();
        }

        if (!collectionName && contractAdd) {
            for (let i = 0; i < 20; i++) {
                contractData = await axios.get(`https://api.better-call.dev/v1/contract/mainnet/${contractAdd}`)
                if (contractData?.data) {
                    collectionName = contractData?.data?.alias?.toUpperCase();
                    break;
                }
            }
        }

        if (tokenId && contractAdd) {
            for (let i = 0; i < 20; i++) {
                let uriData = await axios.get(`https://api.better-call.dev/v1/tokens/mainnet/metadata?token_id=${tokenId}&contract=${contractAdd}`)
                if (uriData?.data) {
                    uri = uriData?.data[0]?.display_uri || uriData?.data[0]?.artifact_uri || uriData?.data[0]?.thumbnail_uri
                    break;
                }
            }
        }

        console.log({ tokenId, contractAdd, collectionName, uri });
        console.log("")

        return { tokenId, contractAdd, collectionName, uri }
    } catch (err) {
        console.log(err.message)
    }
}


export const UpdateTrx = async (tezosArray) => {
    for (let element of tezosArray) {

        const collName = await getCollName(element.fromHash)

        if (collName?.collectionName) {
            console.log({ collName })
            // await collection.updateOne({ fromHash: element.fromHash }, { $set: { collectionName: collName.collectionName, contract: collName.contractAdd } });
        }
    }
}