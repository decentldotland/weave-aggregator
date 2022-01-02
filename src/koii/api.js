import { querySchema, gqlTemplate } from "../utils/arweave/gql.js";

export async function getKoii() {
  try {
    const feed = [];
    const nfts = await gqlTemplate(querySchema.koii.anft);

    for (let nft of nfts) {
      const initState = JSON.parse( nft["tags"].find((tag) => tag.name === "Init-State")?.value );

      feed.push({
        id: nft.id,
        poster: nft.owner,
        timestamp: nft.timestamp,
        title: initState.title,
        description: initState.description,
      });
    }
    
    return feed;
  } catch (error) {
    console.log(`${error.name} : ${error.message}`);
  }
}
