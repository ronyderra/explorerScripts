import axios from "axios";
import { ethers } from "ethers";
import minterAbi from "../abi//Minter.json" assert { type: "json" };
import {elegantUnpair} from "../helpers/actionId.js"

export const getAccountErc721Hashes = async (address) => {
  try {
    const res = await axios.get(
      "https://api.etherscan.io/api?module=account&action=tokennfttx&address=0xB8bC9550aBfd7A21DC1cfa2655f4d9c5454750aa&startblock=0&endblock=999999999&sort=asc&apikey=EKPJSTE16QR2E9XCUC991T67S1K3WF4U6G"
    );
    const mints = res.data.result.filter(
      (e) => e.from === "0x0000000000000000000000000000000000000000"
    );

    for(let item of mints ){
       const actionId =  await DestinationActionId(item.hash)
       if(actionId === 874){
           console.log(item)
       }
    }
  } catch (err) {
    console.log(err.message);
  }
};

const DestinationActionId = async (hash) => {
    console.log(hash)
    const provider = await new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
    const getTransaction = await provider.getTransaction(hash);
    const value = ethers.utils.parseEther("1.0");
    const transactionData = getTransaction.data;
    const iface = new ethers.utils.Interface(minterAbi.abi);
    const FormatTypes = ethers.utils.FormatTypes;
    iface.format(FormatTypes.json);
    const res3 = iface.parseTransaction({ data: transactionData, value });
    // console.log(res3.args);
    const actionId = res3.args["actionId"]?.toString();
  
    // console.log("action Id:", actionId);
    // console.log("action id after elegant UNpair:", elegantUnpair(actionId));

    const originalActionId = elegantUnpair(actionId)
    console.log(  "originalActionId: ",  originalActionId[0])
    return(originalActionId[0])
   

  };
