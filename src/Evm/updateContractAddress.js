import axios from "axios";
import { ethers } from "ethers";
import { Minter__factory } from "xpnet-web3-contracts";
import { config, MainNetRpcUri } from "../../config.js";
import dotenv from "dotenv";
dotenv.config();

const decode_Trx = async (chainName, hash) => {
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
        return evmDecoded;
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
