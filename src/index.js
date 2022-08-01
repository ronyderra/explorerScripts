import { MongoClient } from "mongodb";
import { tezosData } from "./Tezos/tezos.js";
import { createDoc } from "./Tezos/createDoc.js";
import { lookForDups } from "./helpers/lookForDups.js";

import "dotenv/config";

(async () => {
  const DB_URL = process.env.DB_URL;
  const client = new MongoClient(DB_URL);
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db("myFirstDatabase");
  const collection = db.collection("bridge-event");

  const polygon = await collection.find({ chainName: "POLYGON" }).toArray();
  console.log(polygon.length);

  const tezos = await collection.find({ chainName: "TEZOS" }).toArray();
  console.log(tezos.length);
  await tezosData("op3wjEtxDGDvMmvjdv2S4YUfrgJZMzrndwqqH2sSHFh5DPRqemA")
})();
