import { MongoClient } from "mongodb";
import { tezosData } from "./Tezos/tezos.js";
import { createDoc } from "./Tezos/createDoc.js";
import { lookForDups } from "./Helpers/lookForDups.js";
import { getClientTrxs } from "./Polygon/clientTrxs_fromPolygon.js";
import { updateDestinationHash } from "./Polygon/get_dest_hash.js";
import { trxStatus, getDestinationTrx } from "./Elrond/elrond.js";
import { getAccountErc721Hashes } from "./Ethereum/ethereum.js";
import { get_Wallet_nfts_list } from "./Elrond/walletNfts.js";
import { updateUnfreezTrxs } from "./Helpers/getUnfreezUriData.js";
// import {getVechainData} from "./Vechain/getVechainData.js"
import { updateCollectionName } from "./Evm/updateContractAddress.js"
import { secret } from "../src/Secret/secret.js"
import "dotenv/config";

(async () => {
  await secret()

  const DB_URL = process.env.DB_URL;
  const client = new MongoClient(DB_URL);
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db("myFirstDatabase");
  const collection = db.collection("bridge-event");

  // await get_Wallet_nfts_list(
  //   "erd1fu99vy55z9x0e66sdrusvepq63zhf9720f0sc9vdtvscdjdshrcs2y5m39",
  //   "HOKI-518891"
  // );
  // await get_Wallet_nfts_list("erd1fu99vy55z9x0e66sdrusvepq63zhf9720f0sc9vdtvscdjdshrcs2y5m39" ,"HOKIZUKI-2fe117" )
  // await get_Wallet_nfts_list("erd1cffq40t0dfpmd7q4azsmvvepyuenk8pthudvrmsyk6rgk95rqvgs3larpt" ,"HOKIZUKI-2fe117" )

  // const POLYGON = await collection.find({toChainName:"POLYGON" , toHash:null} ).toArray();
  // console.log(POLYGON.length);
  // await updateDestinationHash(collection)

  // const TEZOS = await collection.find({ chainName: "TEZOS" }).toArray();
  // console.log(TEZOS.length);
  // await tezosData("op3wjEtxDGDvMmvjdv2S4YUfrgJZMzrndwqqH2sSHFh5DPRqemA")

  // await getClientTrxs("0xa6FA4bDD6B96A7b45Bad16c3049a0ADA6c0d0607", collection);

  // const ELROND = await collection.find({ toChainName: "ELROND" , senderAddress : `0xa6FA4bDD6B96A7b45Bad16c3049a0ADA6c0d0607`}).toArray();
  // console.log(ELROND.length);
  // // await trxStatus(ELROND)
  // await getDestinationTrx(7 , 1103)

  // await getAccountErc721Hashes("0xB8bC9550aBfd7A21DC1cfa2655f4d9c5454750aa")

  //   const UNFREEZTRXS = await collection.find({ type: "Unfreeze" }).sort( { createdAt: -1 } ).toArray();
  //   console.log(UNFREEZTRXS.length);
  //   // await lookForDups(UNFREEZTRXS ,collection)
  //   await updateUnfreezTrxs(collection, UNFREEZTRXS);
  //  await getVechainData()


  // const UNFREEZTRXS = await collection.find({ type: "Unfreeze" }).sort( { createdAt: -1 } ).toArray();
  // console.log(UNFREEZTRXS.length);
  // // await lookForDups(UNFREEZTRXS ,collection)
  // await updateUnfreezTrxs(collection, UNFREEZTRXS);
  //  await getVechainData()


  // const vechainTrxs = await collection.find({ chainName: "VECHAIN" }).sort({ createdAt: -1 }).toArray();
  // // await lookForDups(UNFREEZTRXS, collection)
  // for (let element of vechainTrxs) {
  //   await updateCollectionName(element.fromHash, "VECHAIN", collection)
  // }

})();
