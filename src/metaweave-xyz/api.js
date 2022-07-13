import { querySchema, gqlTemplate } from "../utils/arweave/gql.js";
import { arweave } from "../utils/arweave/arweave.js";

export async function getPermaTweets() {
  try {
    const txs = await gqlTemplate(querySchema.metaweave.permatweets);

    return txs;
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    process.exit(1);
  }
}
