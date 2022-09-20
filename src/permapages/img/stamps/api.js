import { makeQueries } from "./gql.js";

export async function getStamps(address) {
  try {
    const feed = [];
    const stamps = await makeQueries();

    for (let stamp of stamps) {
      const inputTag = JSON.parse(
        stamp["tags"].find((tag) => tag.name === "Input")?.value
      );
      feed.push({
        stampedAsset: inputTag?.transactionId,
        stamper: stamp["tags"].find((tag) => tag.name === "Sequencer-Owner")
          ?.value,
        timestamp: inputTag?.timestamp,
      });
    }

    if (address) {
      return feed.filter((stamp) => stamp.stamper === address);
    }

    return feed;
  } catch (error) {
    console.log(`${error.name} : ${error.message}`);
  }
}
