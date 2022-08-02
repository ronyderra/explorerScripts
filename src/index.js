import { MongoClient } from "mongodb";
import { tezosData } from "./Tezos/tezos.js";
import { createDoc } from "./Tezos/createDoc.js";
import { lookForDups } from "./helpers/lookForDups.js";
import { getClientTrxs } from "./Polygon/clientTrxs_fromPolygon.js";
import { trxStatus  , getDestinationTrx} from "./Elrond/elrond.js";
import { getAccountErc721Hashes} from "./Ethereum/ethereum.js"
import "dotenv/config";

(async () => {
  const DB_URL = process.env.DB_URL;
  const client = new MongoClient(DB_URL);
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db("myFirstDatabase");
  const collection = db.collection("bridge-event");

  // const POLYGON = await collection.find({ chainName: "POLYGON" }).toArray();
  // console.log(POLYGON.length);

  // const TEZOS = await collection.find({ chainName: "TEZOS" }).toArray();
  // console.log(TEZOS.length);
  // await tezosData("op3wjEtxDGDvMmvjdv2S4YUfrgJZMzrndwqqH2sSHFh5DPRqemA")

  // await getClientTrxs("0xa6FA4bDD6B96A7b45Bad16c3049a0ADA6c0d0607", collection);

  // const ELROND = await collection.find({ toChainName: "ELROND" , senderAddress : `0xa6FA4bDD6B96A7b45Bad16c3049a0ADA6c0d0607`}).toArray();
  // console.log(ELROND.length);
  // // await trxStatus(ELROND)
  // await getDestinationTrx(7 , 1103)

  await getAccountErc721Hashes("0xB8bC9550aBfd7A21DC1cfa2655f4d9c5454750aa")

})();
