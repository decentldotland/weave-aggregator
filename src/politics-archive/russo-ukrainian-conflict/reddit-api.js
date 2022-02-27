import { querySchema, gqlTemplate } from "../../utils/arweave/gql.js";
import { arweave } from "../../utils/arweave/arweave.js";

export const gqlQuery = {
  posts: {
    query: `query {
  transactions(
    tags: [
        { name: "App-Name", values: "reddit-archiver"},
      
        ]
    first: 100
  ) {
    edges {
      node {
        id
        owner { address }
        tags { name value }
        block { timestamp }

      }
    }
  }
}`,
  },
};

export async function getUaRuReddit() {
  try {
    const feed = [];

    const posts = await gqlTemplate(gqlQuery.posts);

    for (let post of posts) {
      const topic = post["tags"].find(
        (tag) => tag.name === "archiver-topic"
      )?.value;
      const subreddit = post["tags"].find(
        (tag) => tag.name === "subreddit"
      )?.value;
      const subreddit_id = post["tags"].find(
        (tag) => tag.name === "subreddit_id"
      )?.value;
      const permalink = post["tags"].find(
        (tag) => tag.name === "permalink"
      )?.value;
      const title = post["tags"].find(
        (tag) => tag.name === "title"
      )?.value;

      const pid = post.id

      feed.push({
        pid,
        title,
        subreddit,
        subreddit_id,
        permalink,
        topic
      });
    }

    return feed;
  } catch (error) {
    console.log(`${error.name} : ${error.description}`);
  }
}
