import { SecretNetworkClient, grpc } from "secretjs";
import { updateUnfreezTrxs } from "../Helpers/getUnfreezUriData.js"

export const secret = async (collection) => {
    try {
        const grpcWebUrl = "https://secret-4.api.trivium.network:9091";

        const secretjs = await SecretNetworkClient.create({
            grpcWebUrl,
            chainId: "secret-4",
        });

        const hash = 'DD030B6CBC852413CDF4A8C2755438B5D74EE4537A018D6E7CB5B86A38C6AFF9'
        let res
        await secretjs.query.getTx(hash).then(r => res = r).catch(e => { console.log(e.message); res = undefined })

        console.log("-----------------------------")

        const eventObj = {
            actionId: "",
            chainName: "SECRET",
            tokenId: "",
            fromChain: "24",
            toChain: "",
            fromChainName: "SECRET",
            toChainName: "",
            fromHash: hash,
            txFees: "",
            type: "",
            status: "Pending",
            toHash: "",
            senderAddress: "",
            targetAddress: "",
            nftUri: "",
            collectionName: "SECRET",
            contract: "SECRET",
            originalChainNonce: null,
            originalContract: null,
            originalTokenId: null,
            originalUri: null,
            createdAt: new Date(),
        };

        if (!res) {
            console.log("nodata")
            return undefined
        }
        res.arrayLog.forEach(async (i) => {
            let parsed;
            switch (i.key) {
                case "BridgeEventInfo":
                    parsed = JSON.parse(i.value)
                    eventObj.actionId = parsed.action_id;
                    eventObj.toChain = parsed.chain_nonce.toString()
                    eventObj.txFees = parsed.tx_fees
                    eventObj.targetAddress = parsed.to
                    break;
                case "TransferSnip721":
                    parsed = JSON.parse(i.value)
                    // console.log(i)
                    // console.log(parsed)

                    eventObj.nftUri = parsed.info.public_metadata.token_uri
                    eventObj.tokenId = parsed.info.token_id
                    eventObj.contract = parsed.contract_addr
                    eventObj.type = "Transfer"
                    break;
                case "sender":
                    eventObj.senderAddress = i.value
                    break;
                case "UnfreezeSnip721":
                    parsed = JSON.parse(i.value)
                    eventObj.nftUri = parsed.token_uri
                    eventObj.contract = parsed.burner
                    eventObj.type = "Unfreeze";
                    break;
            }
        })
        if (eventObj.type === "Unfreeze") {
            const res = await updateUnfreezTrxs(undefined, [{ nftUri: eventObj.nftUri, fromHash: hash }])
            eventObj.originalChainNonce = res.originalChainNonce
            eventObj.originalContract = res.originalContract
            eventObj.originalTokenId = res.originalTokenId
            eventObj.originalUri = res.originalUri
            eventObj.tokenId = res.originalTokenId
        }
        console.log(eventObj)
        await collection.insertOne(eventObj)
    } catch (err) {
        console.log(err)
    }
}

