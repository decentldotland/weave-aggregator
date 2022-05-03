import { lensFeed } from "./gql.js";

export async function getLensFeed() {
  try {
    const feed = await lensFeed();
    // filter content broadcasted via lenster.xyz of type 'Post' only
    const filteredFeed = feed.filter(
      (post) => post["__typename"] === "Post" && post.appId === "Lenster"
    );

    for (const post of filteredFeed) {
      // remove unnecessary properties
      for (let key in post) {
        if (!["id", "profile", "metadata", "createdAt"].includes(key)) {
          delete post[key];
        }
        // add direct access for profile's page & pfp on lenster.xyz
        post.profile.url = `https://lenster.xyz/u/${post.profile?.handle}`
        post.profile.pfp = post.profile.picture?.original?.url;
      }
    }

    return filteredFeed;
  } catch (error) {
    console.log(error);
  }
}
