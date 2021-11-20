import { querySchema, gqlTemplate } from "../utils/arweave/gql.js";
import { arweave } from "../utils/arweave/arweave.js";

async function getPostsTxs() {
  try {
    const txs = await gqlTemplate(querySchema.argora.world);

    return txs;
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    process.exit(1);
  }
}

async function getArgoraPostsMetadata(postsTxs) {
  try {
    const feed = [];

    for (let tx of postsTxs) {
      const metadata = await arweave.transactions.getData(tx.id, {
        decode: true,
        string: true,
      });
      const postObj = JSON.parse(metadata);

      const post = {
      	pid: tx.id,
        poster: tx.owner,
        timestamp: tx.timestamp,
        data: {
        	text: postObj.text,
        	media: postObj.pictures ? postObj.pictures : []
        }
      };

      feed.push(post);
    }

    return feed;
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    process.exit(1);
  }
}

export async function getArgora() {
  try {
    const postsTxs = await getPostsTxs();
    const feed = await getArgoraPostsMetadata(postsTxs);
    
    return feed;
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    process.exit(1);
  }
}
