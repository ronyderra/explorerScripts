import { SecretNetworkClient, grpc } from "secretjs";
import { updateUnfreezTrxs } from "../Helpers/getUnfreezUriData.js"

export const secret = async () => {
    const grpcWebUrl = "https://pulsar-2.api.trivium.network:9091/";

    const secretjs = await SecretNetworkClient.create({
        grpcWebUrl,
        chainId: "pulsar-2",
    });

    // TransferHash -  3476773BC9F325E2251476A1C2CB12C0158778129DCF0BACADEEE29FAF72D715
    //UnfreezeHash - F71488BBD0A9AEC71B64D60FA51870F6B8798106530677D2CC2986FAC6903259

    const hash = 'F71488BBD0A9AEC71B64D60FA51870F6B8798106530677D2CC2986FAC6903259'
    const res = await secretjs.query.getTx(hash);
    console.log(res.arrayLog)

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
        originalUri:null,
        createdAt: new Date(),
    };
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
}

