import { querySchema, gqlTemplate } from "../utils/arweave/gql.js";
import { arweave } from "../utils/arweave/arweave.js";

async function getArtTxs() {
  try {
    const txs = await gqlTemplate(querySchema.artbycity.art);

    return txs;
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    process.exit(1);
  }
}

async function getArtWorkMetadata(artTxs) {
  try {
    const feed = [];

    for (let tx of artTxs) {
      const metadata = await arweave.transactions.getData(tx.id, {
        decode: true,
        string: true,
      });
      const artObj = JSON.parse(metadata);

      const art = {
        aid: tx.id,
        title: artObj?.title,
        desc: artObj?.description,
        slug: artObj?.slug,
        creator: artObj?.creator,
        creationDate: artObj?.published,
        image: `https://arweave.net/${artObj?.images?.[0]?.["preview"]}`,
      };

      feed.push(art);
    }

    return feed;
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    process.exit(1);
  }
}

export async function getArtByCity() {
  try {
    const artsTxs = await getArtTxs();
    const feed = await getArtWorkMetadata(artsTxs);

    return feed;
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    process.exit(1);
  }
}
