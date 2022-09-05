import axios from "axios";
import { ethers } from "ethers";
import { Minter__factory } from "xpnet-web3-contracts";
import { config, MainNetRpcUri } from "../../config.js";
import { Framework } from '@vechain/connex-framework'
import { Driver, SimpleNet } from '@vechain/connex-driver'
import { VechainAbi } from "../abi/VechainAbi.js";
import { abi } from "../abi/abi.js";
import dotenv from "dotenv";
dotenv.config();

export const decode_Trx = async (chainName, hash) => {
  try {
    switch (chainName) {
      case "VECHAIN":
        const vechainContractAddr = config.web3.find((c) => c.name === chainName)?.contract;
        const trx = await axios.get(`https://region3.xp.network/vechain/transactions/${hash}`);
        const vechainProvider = await new ethers.providers.JsonRpcProvider(
          MainNetRpcUri[chainName]
        );
        const contract = Minter__factory.connect(vechainContractAddr, vechainProvider);
        const decoded = contract.interface.parseTransaction(trx.data.clauses[0]);
        return decoded;

      default:
        const contractAddr = config.web3.find((c) => c.name === chainName.toUpperCase())?.contract;
        const evmProvider = await new ethers.providers.JsonRpcProvider(MainNetRpcUri[chainName]);
        const res = await evmProvider.getTransaction(hash);
        const evmContract = Minter__factory.connect(contractAddr, evmProvider);
        const evmDecoded = evmContract.interface.parseTransaction(res);
        console.log(evmDecoded.functionFragment.inputs)
        console.log(evmDecoded)

        // return evmDecoded;
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateContractAddress = async (trxsWithoutContractAddress, collection) => {
  for (let element of trxsWithoutContractAddress) {
    try {
      const decoded = await decode_Trx(element.chainName, element.fromHash);
      const args = decoded.args;
      const address = args["erc721Contract"] || args["burner"] || args["erc1155Contract"];
      console.log({ hash: element.fromHash, address });
      await collection.updateOne({ fromHash: element.fromHash }, { $set: { contract: address } });
    } catch (err) {
      console.log(err);
    }
  }
};

export const updateCollectionName = async (fromHash, fromChainName, collection) => {
  try {
    const decoded = await decode_Trx(fromChainName, fromHash);
    const args = decoded?.args
    if (!args) return undefined;
    const address = args["erc721Contract"] || args["burner"] || args["erc1155Contract"]


    if (address) {
      switch (fromChainName) {
        case "VECHAIN":
          const net = new SimpleNet('https://sync-mainnet.veblocks.net')
          const driver = await Driver.connect(net)
          const connex = new Framework(driver)
          const nameObj = VechainAbi.find(({ name }) => name === "name");
          const res = await connex.thor.account(address).method(nameObj).call();
          const collectionName = res.decoded['0'].toUpperCase()
          console.log({ collectionName })
          await collection.updateOne({ fromHash }, { $set: { collectionName } });
          return;
        default:
          const evmRpc = config.web3.find((c) => c.name === fromChainName.toUpperCase())?.node;
          const provider = await new ethers.providers.JsonRpcProvider(evmRpc);
          const contractInstance = await new ethers.Contract(address, abi, provider);
          const name = await contractInstance.functions.name();
          await collection.updateOne({ fromHash }, { $set: { collectionName: name[0]?.toUpperCase() } });
          console.log({ fromHash, name })
        // return name[0]?.toUpperCase()
      }
    } else {
      return undefined
    }
  } catch (err) {
    console.log(err.message)
  }
}
