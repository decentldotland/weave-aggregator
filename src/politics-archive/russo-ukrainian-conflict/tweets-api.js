import { querySchema, gqlTemplate } from "../../utils/arweave/gql.js";
import { arweave } from "../../utils/arweave/arweave.js";

export const gqlQuery = {
  tweets: {
    query: `query {
  transactions(
    tags: [
        { name: "Application", values: "TwittAR"},
      
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

export async function getUkRuTweets() {
  try {
    const feed = [];

    const tweets = await gqlTemplate(gqlQuery.tweets);

    for (let tweet of tweets) {
      const tweetId = tweet["tags"].find(
        (tag) => tag.name === "Tweet-ID"
      )?.value;
      const authorId = tweet["tags"].find(
        (tag) => tag.name === "Author-ID"
      )?.value;

      feed.push({
        pid: tweet.id,
        poster: tweet.owner,
        tweet_id: tweetId, // original article url
        author_id: authorId,
        timestamp: tweet.timestamp,
      });
    }
    
    return feed;
  } catch (error) {
    console.log(`${error.name} : ${error.description}`);
  }
}
