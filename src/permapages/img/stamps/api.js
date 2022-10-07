import { makeQueries } from "./gql.js";
//import uniqBy from 'lodash.uniqby'

export async function getStamps(address) {
  try {
    const feed = [];
    const stamps = await makeQueries();

    for (let stamp of stamps) {
      const inputTag = JSON.parse(
        stamp["tags"].find((tag) => tag.name === "Input")?.value
      );

      if (inputTag.function === 'stamp') {
        feed.push({
          stampedAsset: inputTag?.transactionId,
          stamper: stamp["tags"].find((tag) => tag.name === "Sequencer-Owner")
            ?.value,
          timestamp: inputTag?.timestamp,
        });
      }
    }

    if (address) {
      return feed.filter((stamp) => stamp.stamper === address);
    }


    return uniqBy(feed, n => n.stampedAsset);
  } catch (error) {
    console.log(`${error.name} : ${error.message}`);
  }
}
