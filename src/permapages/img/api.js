import { gqlTemplate, querySchema } from "../../utils/arweave/gql.js";
import { permaPagesImg } from "../../address/gql.js";

export async function getPermaPagesImg(address) {
  try {
    let nfts;
    const feed = [];
    if (address) {
      const query = permaPagesImg(address);
      nfts = await gqlTemplate(query);
    } else {
      nfts = await gqlTemplate(querySchema.permapages.img);
    }

    for (let nft of nfts) {
      const initState = JSON.parse(
        nft["tags"].find((tag) => tag.name === "Init-State")?.value
      );

      feed.push({
        id: nft.id,
        poster: nft.owner,
        timestamp: nft.timestamp,
        title: nft.tags.find((tag) => tag.name === "Title")?.value,
        description: nft.tags.find((tag) => tag.name === "Description")?.value,
        ticker: initState?.ticker,
        content_type: initState?.contentType,
      });
    }
    
    return feed;
  } catch (error) {
    console.log(`${error.name} : ${error.message}`);
  }
}
