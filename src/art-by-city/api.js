import { querySchema, gqlTemplate } from "../utils/arweave/gql.js";
import { arweave } from "../utils/arweave/arweave.js";

export async function getArtByCity() {
  try {
    const txs = await gqlTemplate(querySchema.artbycity.art);
    return txs;
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    process.exit(1);
  }
}
