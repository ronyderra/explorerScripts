import { ethers } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";

export const getTrx = async () => {
  const provider = new JsonRpcProvider(
    "https://bsc-dataseed.binance.org/"
  );

  const resp = await provider?.getTransaction(
    "0x4ba5fef4b4df770da5c1b32ddd8f7f4d03b5d47c3d4b18419627525d9e8d91a7"
  );
  resp.wait();
};
