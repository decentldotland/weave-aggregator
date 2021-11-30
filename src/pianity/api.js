import { gqlTemplate, querySchema } from "../utils/arweave/gql.js";

export async function getPianitySongs() {
  try {
    const songsArray = [];
    const songs = await gqlTemplate(querySchema.pianity.songs);

    for (let tx of songs) {
      songsArray.push({
        sid: tx.id,
        poster: tx.owner,
        url: tx.id,
        title: tx["tags"].find((tag) => tag.name === "Title").value,
        author: tx["tags"].find((tag) => tag.name === "Author").value,
        thumnail: tx["tags"].find((tag) => tag.name === "Thumbnail").value,
        timestamp: tx.timestamp,
      });
    }

    return songsArray;
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    process.exit(1);
  }
}
