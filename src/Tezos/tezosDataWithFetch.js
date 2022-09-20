import fetch from "node-fetch";
import { BigMapAbstraction, MichelsonMap, TezosToolkit } from "@taquito/taquito";

import { bytes2Char } from "@taquito/utils";

export const getTezosCollectionData = async (hash, collection) => {
    try {
        const tezos = new TezosToolkit("https://mainnet.smartpy.io/");

        let contractAdd;
        let collectionName;
        let contractData;
        let data;
        let uri;

        for (let i = 0; i < 20; i++) {
            try {
                const res = await fetch(`https://api.tzkt.io/v1/operations/${hash}`)
                data = await res.json()
                if (data) {
                    break;
                }
            } catch (err) {
                continue;
            }
        }

        if (!data) return;

        const entrypoint = data[0]?.parameter?.entrypoint;
        const tokenId = data[0]?.parameter?.value?.token_id

        if (entrypoint === "withdraw_nft") {
            contractAdd = data[0]?.parameter?.value?.burner;
            collectionName = "WNFT";
        } else {
            console.log(data[1])
            contractAdd = data[1]?.target?.address;
            collectionName = data[1]?.target?.alias?.toUpperCase();
        }

        if (!collectionName && contractAdd) {
            for (let i = 0; i < 20; i++) {
                try {
                    const contractDataRes = await fetch(`https://api.better-call.dev/v1/contract/mainnet/${contractAdd}`)
                    contractData = await contractDataRes?.json()
                    if (contractData) {
                        collectionName = contractData?.alias?.toUpperCase();
                        break;
                    }
                } catch (err) {
                    continue;
                }
            }
        }

        if (tokenId && contractAdd) {
            const contract = await tezos.contract.at(contractAdd);
            const storage = await contract.storage()
            const tokenStorage = await storage.token_metadata.get(tokenId);

            uri = bytes2Char(tokenStorage.token_info.get(""));
        }

        console.log({ uri, collectionName, contractAdd, tokenId, hash });

        await collection.updateOne({ fromHash: hash }, { $set: { collectionName, contract: contractAdd, nftUri: uri, tokenId } });
    } catch (err) {
        console.log(err.message)
    }
}
