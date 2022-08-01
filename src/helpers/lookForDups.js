export const lookForDups = async (transactions, collection) => {
  const dups = [];
  for (let element of transactions) {
    let hash = element.fromHash;
    let from = element.chainName;
    const res = await collection.find({ fromHash: hash, chainName: from }).toArray();
    res.length > 1
      ? dups.push(res[0].fromHash) && console.log(res[0].fromHash)
      : console.log("all good");
  }
  console.log(dups.length);
};
