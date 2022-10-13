import { makeQueries } from "./gql.js";
import uniqBy from "lodash.uniqby";
import axios from "axios";

export async function getStamps(address) {
  try {
    const feed = [];
    const stamps = await makeQueries();

    for (let stamp of stamps) {
      const inputTag = JSON.parse(
        stamp["tags"].find((tag) => tag.name === "Input")?.value
      );

      if (inputTag.function === "stamp") {
        feed.push({
          stampedAsset: inputTag?.transactionId,
          stamper: stamp["tags"].find((tag) => tag.name === "Sequencer-Owner")
            ?.value,
          timestamp: inputTag?.timestamp,
        });
      }
    }

    if (address) {
      const res = uniqBy(
        feed.filter((stamp) => stamp.stamper === address),
        (n) => n.stampedAsset
      );

      for (const tx of res) {
        const tags = await getStampedAssetTags(tx.stampedAsset);
        tx.stampedAssetType = tags.find((key) => key.name === "Type")?.value;
        tx.title = tags.find((key) => key.name === "Title")?.value;
        tx.description = tags.find((key) => key.name === "Description")?.value;
      }

      return res;
    }

    return uniqBy(feed, (n) => n.stampedAsset);
  } catch (error) {
    console.log(`${error.name} : ${error.message}`);
  }
}

async function getStampedAssetTags(asset_id) {
  try {
    const query = `query {
    transactions(ids: ["${asset_id}"]) {
        edges {
            node {
                id
                tags { name value }
            }
        }
    }
}`;

    const res = await axios.post("https://arweave.net/graphql", { query });
    const tags = res?.data?.data?.transactions?.edges?.[0]?.node?.tags;

    return tags;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
