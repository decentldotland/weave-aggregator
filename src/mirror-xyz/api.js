import { querySchema, gqlTemplate } from "../utils/arweave/gql.js";
import { arweave } from "../utils/arweave/arweave.js";

async function getBlogsTxs() {
  try {
    const txs = await gqlTemplate(querySchema.mirror.blogs);

    return txs;
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    process.exit(1);
  }
}

async function getMirrorBlogMetadata(blogsTxs) {
  try {
    const feed = [];

    for (let tx of blogsTxs) {
      const metadata = await arweave.transactions.getData(tx.id, {
        decode: true,
        string: true,
      });
      const blogObj = JSON.parse(metadata);

      const blog = {
        bid: tx.id,
        title: blogObj.content.title,
        timestamp: blogObj.content.timestamp,
        poster: blogObj.authorship.contributor,
      };

      feed.push(blog);
    }

    return feed;
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    process.exit(1);
  }
}

export async function getMirror() {
  try {
    const blogsTxs = await getBlogsTxs();
    const feed = await getMirrorBlogMetadata(blogsTxs);
    
    return feed;
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    process.exit(1);
  }
}
