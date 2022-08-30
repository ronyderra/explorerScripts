import { SecretNetworkClient, grpc } from "secretjs";
import { updateUnfreezTrxs } from "../Helpers/getUnfreezUriData.js"

export const secret = async () => {
    try {
        const grpcWebUrl = "https://secret-4.api.trivium.network:9091";

        const secretjs = await SecretNetworkClient.create({
            grpcWebUrl,
            chainId: "secret-4",
        });

        // TransferHash -  CB12B41511F2CC5D8D03BEAFCC85AE9DB29CDBBEFAF9A73488CB7CD8CBD23904
        //UnfreezeHash - F71488BBD0A9AEC71B64D60FA51870F6B8798106530677D2CC2986FAC6903259

        const hash = 'CB12B41511F2CC5D8D03BEAFCC85AE9DB29CDBBEFAF9A73488CB7CD8CBD23904'
        let res
        await secretjs.query.getTx(hash).then(r => res = r).catch(e => { console.log(e.message); res = undefined })
        // console.log(res.arrayLog)

          
        //   const result = await secretjs.query.compute.queryContract({
        //     contractAddress: "secret18f66qjjuyudmh7q6s50hwpt9y679lanjs82jkg",
        //     codeHash: "", // optional but way faster
        //     query: { token_info: {} },
        //   }) 
        // console.log(result)

        console.log("-----------------------------")

        const eventObj = {
            actionId: "",
            chainName: "SECRET",
            tokenId: "",
            fromChain: "24",
            toChain: "",
            fromChainName: "SECRET",
            toChainName: "",
            fromHash: "",
            txFees: "",
            type: "",
            status: "",
            toHash: "",
            senderAddress: "",
            targetAddress: "",
            nftUri: "",
            collectionName: "",
            contract: "",
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
console.log(res.arrayLog)
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
        // console.log(eventObj)
    } catch (err) {
        console.log(err)
    }
}

