import { MongoClient } from "mongodb";
import { updateCollName } from "./Tron/getCollectionData.js";
import { updateTokenId } from "./Elrond/elrondTokenId.js";
import { updateCollectionName } from "./Evm/updateContractAddress.js";
import { getName } from "./array.js";
import "dotenv/config";
import axios from "axios";
import { config } from "../config.js";
import { SecretNetworkClient, grpc } from "secretjs";
import moment from "moment";
import fetch from "node-fetch";
import { updateDestinationHash } from "./Polygon/get_dest_hash.js";
import { ethers } from "ethers";
import { scrapeit } from "./Binance/binance.js";

(async () => {
  // const DB_URL = process.env.DB_URL;
  // const client = new MongoClient(DB_URL);
  // console.log("got here");
  scrapeit();
  // await client.connect();

  // console.log("Connected successfully to server");

  // const db = client.db("myFirstDatabase");
  // const collection = db.collection("bridge-event");

  // const dos = async (collection) => {
  //   const data = await collection
  //     .find({
  //       $or: [{ sftAmount: null }, { sftAmount: { $exists: false } }],
  //     })
  //     .toArray();
  //   console.log(data.length);
  //   data.forEach((item) => {
  //     collection.update(
  //       {
  //         chainName: item.chainName,
  //         fromHash: item.fromHash,
  //         fromChain: item.fromChain,
  //         actionId: item.actionId,
  //       },
  //       { $set: { sftAmount: 1 } }
  //     );
  //   });
  // };
  // await dos(collection);
  // console.log("finnished");

  // const res = await dailyData.aggregate([{
  //   $project: {
  //     date: { $dateFromString: { dateString: '$date' } }
  //   }
  // }, {
  //   $sort: { date: -1 }
  // }]).toArray()

  // console.log(moment("2022/3/11", "year/month/day"));
  // console.log(moment(new Date()).subtract(90, "days"));
  // let data;
  // let uri;

  // for (let i = 0; i < 20; i++) {
  //   console.log("in");
  //   try {
  //     const res = await fetch(
  //       `https://api.tzkt.io/v1/operations/onsa4x7qbonhdixwRBWNt59ZLGhD8HxP2BwDx4KALMfYBdFm4wf`
  //     );
  //     data = await res.json();
  //     if (data) {
  //       break;
  //     }
  //   } catch (err) {
  //     continue;
  //   }
  // }
  // console.log(data[0].status);
  // try {
  //   const grpcWebUrl = "https://secret-4.api.trivium.network:9091";
  //   const secretjs = await SecretNetworkClient.create({
  //     grpcWebUrl,
  //     chainId: "secret-4",
  //   });

  //   const trx = await secretjs.query.getTx("E9C304605AEDD6BD9CF311990FE9E1B28AE1B97D9AFD55451395F30A17BF2406").catch(e => { code: 3 })
  //   console.log(trx?.code);
  // } catch (error) {
  //   console.log(error.message);
  // }

  // const res = await collection.find({ status: "Pending" }).toArray()
  // console.log(res.length)

  // await elrondTrx("293ae607551c8b4352b8474c4d0b44663df6ab6c273b7c2ed5e3b0affebecba0")

  // await getName()

  // const godwoken = await collection.find({ chainName: "GODWOKEN" }).sort({ createdAt: -1 }).toArray();
  // console.log(godwoken.length)
  // for (let item of godwoken) {
  //   await updateCollectionName(item.fromHash, item.fromChainName, collection)
  // }

  // const tron = await collection.find({ chainName: "TRON" }).sort({ createdAt: -1 }).toArray();
  // console.log(tron.length)
  // await updateCollName(tron, collection)

  // const tezos = await collection.find({chainName:"TEZOS" ,  collectionName:null}).sort({ createdAt: -1 }).toArray();
  // // await lookForDups(tezos, collection)
  // console.log(tezos.length)
  // UpdateTrx(tezos, collection)

  // const ALGORAND = await collection.find({ chainName: "TEZOS", toChain: "" }).sort({ createdAt: -1 }).toArray();
  // console.log("this", ALGORAND.length);
  // for (let item of ALGORAND) {
  //   // const resp = await axios.get(item.nftUri)
  //   // const contract = resp.data.name
  //   // const collectionName = resp.data.name
  //   console.log(item.toChainName);
  //   console.log(config.web3.find(i => i.name === item.toChainName).nonce);

  //   await collection.updateOne({ fromHash: item.fromHash, chainName: "TEZOS" }, { $set: { toChain: config.web3.find(i => i.name === item.toChainName).nonce } });
  // }

  // try {
  //   const res = await axios.post("https://bridge-discount-server.herokuapp.com/api/relization?address=0xf4D88DA352D702d8578af1f36D44b2381941f4aF&realizedUsd=0.1")
  //   console.log(res);
  // } catch (error) {
  //   console.log(error);

  // }

  // var config = {
  //   method: 'patch',
  //   url: `https://bridge-discount-server.herokuapp.com/api/relization?address=0xf4D88DA352D702d8578af1f36D44b2381941f4aF&realizedUsd=${35}`,

  // };

  // axios(config)
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
})();
