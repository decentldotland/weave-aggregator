import { gqlTemplate } from "../utils/arweave/gql.js";
import { permacastDeepGraphs, factoryMetadataGraph } from "./gqlUtils.js";

async function getPermacastFactories() {
  const res = [];
  const factories = await gqlTemplate(permacastDeepGraphs.factories);

  for (let factory of factories) {
    res.push({
      factory: factory.id,
      owner: factory.owner,
      timestamp: factory.timestamp,
    });
  }

  return res;
}

async function getFactoryMetadata(factory_id) {
  const metadata = [];
  const query = factoryMetadataGraph(factory_id);
  const metadataObjects = await gqlTemplate(query);

  for (let data of metadataObjects) {
    const inputTag = data.tags.find((tag) => tag.name === "Input");
    metadata.push(JSON.parse(inputTag.value));
  }

  return metadata;
}

export async function getPermacast() {
  const factories = await getPermacastFactories();
  const podcasts = [];

  for (let factory of factories) {
    const metadata = await getFactoryMetadata(factory.factory);
    const podcastsObjects = await metadata.filter(
      (action) => action.function === "createPodcast"
    );

    for (let podcast of podcastsObjects) {
      if (podcast.length > 1) {
        for (pod of podcast) {
          delete pod["function"];
          pod["pid"] = factory.factory;
          podcasts.push(pod);
        }
      }

      delete podcast["function"];
      podcast["pid"] = factory.factory;
      podcasts.push(podcast);
    }
  }

  return podcasts;
}
