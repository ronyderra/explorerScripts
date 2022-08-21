import BigNumber from "bignumber.js";
import axios from "axios";
import { TransactionHash } from "@elrondnetwork/erdjs";
import { Base64 } from "js-base64";
import { config, chainNonceToName } from "../../config.js";
// import {  ProxyProvider } from "@elrondnetwork/erdjs";

// const provider = new ProxyProvider(config.elrond.node);

const providerRest = axios.create({ baseURL: config.elrond.api });

export const elrondTrx = async (fromHash) => {
  try {
    const event = await eventFromTxn(fromHash, providerRest);
    if (!event) return;
    const collectionName = Base64.decode(event.evs[0].topics[0]).toUpperCase();

    event.evs.forEach(async (e) => {
      if (e.topics.length < 5) {
        return undefined;
      }
      if (e.address != config.elrond.contract) {
        return undefined;
      }

      const action_id = bigIntFromBeElrd(Base64.toUint8Array(e.topics[1])).toString();
      const tx_fees = bigIntFromBeElrd(Base64.toUint8Array(e.topics[e.topics.length - 1]));
      const to = Base64.atob(e.topics[3]); //
      const nftMinterContact = Base64.decode(e.topics[4]); //
      let uri = "";
      let tokenId = "";
      let chain_nonce = new Uint32Array(Base64.toUint8Array(e.topics[2]))[0]; //
      const nonce = bigIntFromBeElrd(Base64.toUint8Array(e.topics[6]));

      let type = "Unfreeze";

      switch (e.identifier) {
        case "withdrawNft": {
          type = "Unfreeze";
          uri = Base64.decode(e.topics[5]); //
          const wrappedData = await axios.get(uri);
          tokenId = wrappedData?.data?.wrapped?.tokenId;
          break;
        }
        case "freezeSendNft": {
          type = "Transfer";
          tokenId = Base64.decode(e.topics[5]) + "-" + nonce.toString(16);
          console.log({ tokenId });
          const nftName = Base64.decode(e.topics[7]);
          uri = Base64.decode(e.topics[8]);
          break;
        }
      }

      const orghash = await getOriginalHash(fromHash);

      const eventObj = {
        actionId: (parseFloat(action_id) + 512).toString(),
        chainName: "ELROND",
        tokenId,
        fromChain: "2",
        toChain: chain_nonce?.toString(),
        fromChainName: chainNonceToName("2"),
        toChainName: chainNonceToName(chain_nonce?.toString()) || "",
        fromHash: orghash || fromHash,
        txFees: tx_fees?.toString(),
        type,
        status: "Pending",
        toHash: "",
        senderAddress: event.sender,
        targetAddress: to,
        nftUri: uri || "",
        collectionName,
        createdAt: new Date(),
      };
      // console.log("transfer event: ", eventObj);
    });
  } catch (e) {
    console.log(e, "elrond Error");
  }
};

export async function getFrozenTokenAttrs(token, nonce) {
  try {
    const tokenInfo = await provider.getAddressNft(minterAddr, token, nonce);
    let metadataUrl = tokenInfo.uris[1];
    if (!tokenInfo.attributes?.length) {
      return [undefined, metadataUrl];
    }
    const attrs = Buffer.from(tokenInfo.attributes, "base64").toString("utf-8");
    if (attrs.includes("\ufffd")) {
      return [
        [
          {
            trait_type: "Base64 Attributes",
            value: tokenInfo.attributes,
          },
        ],
        metadataUrl,
      ];
    }
    const splitAttrs = attrs.split(";").map((v, i) => {
      const res = v.split(":");
      if (res.length == 2) {
        if (res[0] == "metadata") {
          if (res[1].startsWith("http") || res[1].startsWith("ipfs")) {
            metadataUrl = res[1];
          } else {
            metadataUrl = `ipfs://${res[1]}`;
          }
        }
        return {
          trait_type: res[0],
          value: res[1],
        };
      } else if (res.length == 1) {
        return {
          trait_type: `Attr #${i}`,
          value: res[0],
        };
      } else {
        return {
          trait_type: res[0],
          value: res.slice(1).join(":"),
        };
      }
    });

    return [splitAttrs, metadataUrl];
  } catch (err) {
    console.log(err);
  }
}

export async function eventFromTxn(txHash, providerRest) {
  const apiResp = await providerRest.get(
    `https://api.elrond.com/transaction/${txHash}?withResults=true`
  );
  const sender = apiResp.data.data?.transaction?.sender || "";
  const evs = apiResp.data.data?.transaction?.logs?.events || [];
  return { evs, sender };
}

export function bigIntFromBeElrd(buf) {
  // TODO: something better than this hack
  return new BigNumber(`0x${Buffer.from(buf).toString("hex")}`, 16);
}

export async function getOriginalHash(hash) {
  try {
    const res = await axios.get(`https://gateway.elrond.com/transaction/${hash}?withResults=true`);
    const orgHash = res.data?.data?.transaction?.originalTransactionHash
      ? res.data?.data?.transaction?.originalTransactionHash
      : hash;
    return orgHash;
  } catch (err) {
    console.log("error from getOriginalHash", err.message);
  }
}
