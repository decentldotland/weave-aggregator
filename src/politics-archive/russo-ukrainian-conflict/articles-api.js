import { querySchema, gqlTemplate } from "../../utils/arweave/gql.js";
import { arweave } from "../../utils/arweave/arweave.js";

export const gqlQuery = {
  articles: {
    query: `query {
  transactions(
    tags: [
        { name: "Application", values: "ARticle"},
        { name: "Content-Type", values: "text/html"},
        { name: "Query-ID", values: "ukraine1"}
      
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

export async function getUaRuArticles() {
  try {
    const feed = [];

    const articles = await gqlTemplate(gqlQuery.articles);

    for (let article of articles) {
      const url = article["tags"].find((tag) => tag.name === "URL")?.value;

      feed.push({
        aid: article.id,
        url: url,
        timestamp: article.timestamp,
      });
    }

    return feed;
  } catch (error) {
    console.log(`${error.name} : ${error.description}`);
  }
}
