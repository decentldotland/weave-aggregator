import { querySchema, gqlTemplate } from "../utils/arweave/gql.js";
import { arweave } from "../utils/arweave/arweave.js";

export async function getArweaveSaves() {
  try {
    const savesArray = [];
    const saves = await gqlTemplate(querySchema.saves.blogs);

    for (let tx of saves) {

      savesArray.push({
        sid: tx.id,
        poster: tx.owner,
        url: tx["tags"][2]["value"],
        title:tx["tags"][3] ? tx["tags"][3]["value"] : "saved without title",
        timestamp: tx.timestamp
      });
    }
    
    return savesArray;
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    process.exit(1);
  }
}