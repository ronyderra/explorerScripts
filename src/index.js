import { MongoClient } from "mongodb";
import "dotenv/config";

(async () => {
  const DB_URL = process.env.DB_URL;
  const client = new MongoClient(DB_URL);
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db("myFirstDatabase");
  const collection = db.collection("bridge-event");

  const res =await collection.find({ status: "Pending" }).toArray()
  console.log(res.length)
      
  // const tezos = await collection.find({chainName:"TEZOS" ,  collectionName:null}).sort({ createdAt: -1 }).toArray();
  // // await lookForDups(tezos, collection)
  // console.log(tezos.length)
  // UpdateTrx(tezos, collection)

})();
