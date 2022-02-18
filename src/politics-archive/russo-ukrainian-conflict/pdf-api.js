import { gqlTemplate } from "../../utils/arweave/gql.js";
import { arweave } from "../../utils/arweave/arweave.js";

const gqlQuery = {
  pdf: {
    query: `query {
  transactions(
    tags: [
        { name: "Initiative", values: "AndresPirelaUkraineRussia"}
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

export async function getUkRuPdf() {
  try {
    const feed = [];

    const pdfs = await gqlTemplate(gqlQuery.pdf);

    for (let pdf of pdfs) {
      const originalUrl = pdf["tags"].find(
        (tag) => tag.name === "Original-Url"
      )?.value;
      const articlePublishingDate = pdf["tags"].find(
        (tag) => tag.name === "publishedAt"
      )?.value;

      feed.push({
        pid: pdf.id,
        poster: pdf.owner,
        article_url: originalUrl, // original article url
        article_date: articlePublishingDate,
        timestamp: pdf.timestamp,
      });
    }

    return feed;
  } catch (error) {
    console.log(`${error.name} : ${error.description}`);
  }
}
