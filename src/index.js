import { MongoClient } from "mongodb";
import { updateCollName } from "./Tron/getCollectionData.js"
import { updateTokenId } from "./Elrond/elrondTokenId.js"
import { updateCollectionName } from "./Evm/updateContractAddress.js"


import "dotenv/config";

(async () => {
  const DB_URL = process.env.DB_URL;
  const client = new MongoClient(DB_URL);
  console.log("got here");

  await client.connect();

  console.log("Connected successfully to server");

  const db = client.db("myFirstDatabase");
  const collection = db.collection("bridge-event");

  // const res = await collection.find({ status: "Pending" }).toArray()
  // console.log(res.length)

  // await elrondTrx("293ae607551c8b4352b8474c4d0b44663df6ab6c273b7c2ed5e3b0affebecba0")



  const godwoken = await collection.find({ chainName: "GODWOKEN" }).sort({ createdAt: -1 }).toArray();
  console.log(godwoken.length)
  for (let item of godwoken) {
    await updateCollectionName(item.fromHash, item.fromChainName, collection)
  }



  // const tron = await collection.find({ chainName: "TRON" }).sort({ createdAt: -1 }).toArray();
  // console.log(tron.length)
  // await updateCollName(tron, collection)

  // const tezos = await collection.find({chainName:"TEZOS" ,  collectionName:null}).sort({ createdAt: -1 }).toArray();
  // // await lookForDups(tezos, collection)
  // console.log(tezos.length)
  // UpdateTrx(tezos, collection)

})();
