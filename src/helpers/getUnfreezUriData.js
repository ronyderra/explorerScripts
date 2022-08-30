import axios from "axios";

const call_uri = async (nftUri) => {
  try {
    const res = await axios.get(nftUri);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

const parse_Data = async (uridata) => {
  let originalTokenId = "";
  const originalChainNonce = uridata?.wrapped?.origin;

  if (originalChainNonce === "2") {
    let nonce = Number(uridata?.wrapped?.nonce);
    nonce = nonce.toString(16);
    originalTokenId = uridata?.wrapped?.tokenId + `-0${nonce}`;
  } else {
    originalTokenId = uridata?.wrapped?.tokenId;
  }

  const originalContract = uridata?.wrapped?.contract;
  const originalUri = uridata?.wrapped?.original_uri
  // console.log({
  //   originalContract,
  //   originalTokenId: originalTokenId?.toString(),
  //   originalChainNonce,
  //   originalUri
  // });
  return { originalContract, originalTokenId, originalChainNonce ,originalUri };
};

const update_db = async (parsedData, db, fromHash) => {
  await db.updateOne({ fromHash }, { $set: parsedData });
};

export const updateUnfreezTrxs = async (db, unfreezTrxs) => {
  // console.log(unfreezTrxs.length);
  let i = 0;
  for (const item of unfreezTrxs) {
    i++;
    // console.log(i);
    // console.log(item.fromHash);
    if (item.nftUri === "") continue;
    const uriResp = await call_uri(item.nftUri);
    if (!uriResp) continue;
    const parsedData = await parse_Data(uriResp);
    if (!parsedData.originalTokenId) continue;
    return(parsedData)
    await update_db(parsedData, db, item.fromHash);
  }
};
