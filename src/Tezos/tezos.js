import axios from "axios";

const getCollectionName = async (contractAdd, hash) => {
  let collectionName;
  for (let i = 0; i < 20; i++) {
    const contractData = await axios.get(
      `https://api.better-call.dev/v1/contract/mainnet/${contractAdd}`
    );
    if (contractData?.data) {
      collectionName = contractData?.data?.alias?.toUpperCase();
      if (!collectionName) {
        const data = await axios.get(`https://api.tzkt.io/v1/operations/${hash}`);
        collectionName = data.data[1]?.target?.alias?.toUpperCase();
      }
      // console.log(i, "times to get tezos contractData data");
      break;
    }
  }

  return collectionName;
};

const getNftUri = async (tokenId, contractAdd) => {
  let uri
  for (let i = 0; i < 20; i++) {
    let uriData = await axios.get(
      `https://api.better-call.dev/v1/tokens/mainnet/metadata?token_id=${tokenId}&contract=${contractAdd}`
    );
    if (uriData?.data) {
      uri =
        uriData?.data[0]?.display_uri ||
        uriData?.data[0]?.artifact_uri ||
        uriData?.data[0]?.thumbnail_uri;
      // console.log(i, "times to get tezos uri data");
      break;
    }
  }
  return uri;
};

const get_EntryPoint_TokenId_ContractAddr = async (hash) => {
  let data;
  let contractAdd;
  for (let i = 0; i < 20; i++) {
    data = await axios.get(`https://api.tzkt.io/v1/operations/${hash}`);
    if (data?.data) {
      // console.log(i, "times to get tezos collection data");
      break;
    }
  }
  const entrypoint = data.data[0]?.parameter?.entrypoint;
  const tokenId = data.data[0]?.parameter?.value?.token_id;

  if (entrypoint === "withdraw_nft") {
    contractAdd = data.data[0]?.parameter?.value?.burner;
  } else {
    contractAdd = data.data[1]?.target?.address;
  }
  return { entrypoint, tokenId, contractAdd };
};

export const tezosData = async (hash, collection = undefined) => {
  try {
    const res = await get_EntryPoint_TokenId_ContractAddr(hash);
    const collectionName = await getCollectionName(res?.contractAdd, hash);
    const uri = await getNftUri(res?.tokenId , res?.contractAdd);

    console.log("tokenId:", res?.tokenId );
    console.log("contractAdd:", res?.contractAdd);
    console.log("collectionName:", collectionName);
    console.log("uri", uri);
    console.log(" ");

    if (collection) {
      await collection.updateOne({ fromHash: hash },{ $set: { collectionName, nftUri: uri, tokenId, contract: contractAdd } });
      console.log("updated");
    }

    // return { collectionName, nftUri: uri, tokenId, contract: contractAdd };
  } catch (err) {
    console.log(err.message);
    console.log(hash);
    console.log(" ");
  }
};
