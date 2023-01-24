import axios from "axios";
import BigNumber from "bignumber.js";
import { chainNonceToName } from "../../config.js";
import { tezosData } from "./tezos.js"





export const createDoc = async (txHash) => {
  try {
    const data = await axios.get(`https://api.tzkt.io/v1/operations/${txHash}`);
    const parameter = data.data[0]?.parameter;
    const storage = data.data[0]?.storage;
    const target = data.data[0]?.target;
    const entrypoint = parameter?.entrypoint;

    // const trxData = await tezosData(txHash)

    const eventObj = {
      actionId: "",
      chainName: "TEZOS",
      tokenId: "",
      fromChain: "18",
      toChain: "",
      fromChainName: "TEZOS",
      toChainName: "",
      fromHash: txHash,
      txFees: "",
      type: "",
      status: "Completed",
      toHash: undefined,
      senderAddress: "",
      targetAddress: "",
      nftUri: "",
      collectionName: "",
      contract: "",
      createdAt: new Date(),
    };

    switch (entrypoint) {
      case "freeze_fa2": {
        eventObj.actionId = storage.action_cnt;
        eventObj.tokenId = parameter.value.token_id || trxData.tokenId;
        eventObj.toChain = parameter.value.chain_nonce;
        eventObj.txFees = new BigNumber(data.data[0].amount).multipliedBy(1e12).toString();
        eventObj.type = "Transfer";
        eventObj.senderAddress = data.data[0].sender.address;
        eventObj.targetAddress = parameter.value?.to;
        eventObj.contract = parameter?.value.fa2_address || trxData.contractAdd;
        eventObj.collectionName = data.data[1]?.target?.alias?.toUpperCase() || trxData.collectionName;
        eventObj.toChainName = chainNonceToName(parameter.value.chain_nonce.toString());
        eventObj.nftUri = trxData.nftUri
        break;
      }
      case "withdraw_nft": {
        eventObj.actionId = storage.action_cnt;
        eventObj.tokenId = parameter.value.token_id || trxData.tokenId;
        eventObj.toChain = parameter.value.chain_nonce;
        eventObj.txFees = new BigNumber(data.data[0].amount).multipliedBy(1e12).toString();
        eventObj.type = "Unfreez";
        eventObj.senderAddress = data.data[0].sender?.address;
        eventObj.targetAddress = parameter.value.to;
        eventObj.contract = target.address || trxData.contractAdd;
        eventObj.collectionName = data.data[1]?.target?.alias?.toUpperCase() || trxData.collectionName;
        eventObj.toChainName = chainNonceToName(parameter.value.chain_nonce.toString());
        eventObj.nftUri = trxData.nftUri
        break;
      }
      case "validate_unfreeze_nft": {
        eventObj.actionId = parameter.value.action_id;
        const a = elegantUnpair(eventObj.actionId)

        if (Number(a[0]) === 3067) {
          console.log("Found!!", txHash, eventObj.actionId, a[0]);
        }
        console.log(a);
        break;
      }
      default:
        console.log("irrelevant enrty point", entrypoint);
        return;
    }
    // console.log("event", eventObj);
  } catch (err) {
    console.log(err);
  }
};

export function elegantUnpair(z) {
  var sqrtz = Math.floor(Math.sqrt(z)),
    sqz = sqrtz * sqrtz;
  return z - sqz >= sqrtz ? [sqrtz, z - sqz - sqrtz] : [z - sqz, sqrtz];
}

const dataBCD = await axios.get(`https://api.better-call.dev/v1/contract/mainnet/KT1WKtpe58XPCqNQmPmVUq6CZkPYRms5oLvu/operations?from=1666769425&entrypoints=validate_unfreeze_nft&size=100`)
console.log(dataBCD);
for (let item of dataBCD.data.operations) {
  await createDoc(item.hash)
}