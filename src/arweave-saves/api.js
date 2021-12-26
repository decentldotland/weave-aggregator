import { querySchema, gqlTemplate } from "../utils/arweave/gql.js";
import { arweave } from "../utils/arweave/arweave.js";

export async function getArweaveSaves() {
  try {
    const savesArray = [];
    const saves = await gqlTemplate(querySchema.saves.blogs);

    for (let tx of saves) {
      const tags = tx["tags"]
      savesArray.push({
        sid: tx.id,
        poster: tx.owner,
        url: tags.find(tag => tag.name === "page:url")?.value,
        title: tags.find(tag => tag.name === "page:title")?.value,
        timestamp: tx.timestamp
      });
    }
    
    return savesArray;
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    process.exit(1);
  }
}
