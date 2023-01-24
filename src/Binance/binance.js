import Web3 from "web3";
import { abi } from "./contractabi.js";
import { ethers } from "ethers";

export const scrapeit = async () => {
  const Web3Provider = new Web3.providers.HttpProvider("https://bscrpc.com");
  const w3 = new Web3(Web3Provider);
  const provider = await new ethers.providers.JsonRpcProvider("https://bscrpc.com");
  const contractInstance = await new ethers.Contract(
    "0xbC9091bE033b276b7c2244495699491167C20037",
    abi,
    provider
  );
  let tokenId = 0,
    amount = 0,
    totalXP = 0;

  while (tokenId <= 3650) {
    try {
      try {
        console.log({ tokenId, totalXP });
        const AvailableRewards = await contractInstance.functions.showAvailableRewards(tokenId);
        amount = AvailableRewards.toString();
        totalXP = totalXP + Number(amount) / 1000000000000000000;
        tokenId++;
      } catch (error) {
        tokenId++;
        console.log(tokenId, error.message);
        continue;
      }
    } catch (error) {
      console.log(error);
    }
  }
};
