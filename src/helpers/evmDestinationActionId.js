import { ethers } from "ethers";
import minterAbi from "../abi//Minter.json" assert { type: "json" };
import {elegantUnpair} from "./helpers/actionId.js"

export const DestinationActionId = async (hash , rpc) => {
    console.log(hash)
    const provider = await new ethers.providers.JsonRpcProvider(rpc);
    const getTransaction = await provider.getTransaction(hash);
    const value = ethers.utils.parseEther("1.0");
    const transactionData = getTransaction.data;
    const iface = new ethers.utils.Interface(minterAbi.abi);
    const FormatTypes = ethers.utils.FormatTypes;
    iface.format(FormatTypes.json);
    const res3 = iface.parseTransaction({ data: transactionData, value });
    const actionId = res3.args["actionId"]?.toString();
  
    // console.log("action Id:", actionId);
    // console.log("action id after elegant UNpair:", elegantUnpair(actionId));

    const originalActionId = elegantUnpair(actionId)
    console.log(  "originalActionId: ",  originalActionId[0])
    return(originalActionId[0])
  };