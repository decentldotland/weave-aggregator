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

export async function getTotalPermacastSize() {
  let totalSize = 0;
  const factories = await getPermacastFactories();
  const podcasts = [];

  for (let factory of factories) {
    const metadata = await getFactoryMetadata(factory.factory);

    const episodes = metadata.filter(
      (action) => action.function === "addEpisode"
    );

    for (let episode of episodes) {
      const txid = episode.audio;
      const txObject = await arweave.transactions.get(txid);
      const bytesTotalSize = txObject.data_size;
      
      totalSize += Number(bytesTotalSize);
    }
  }

  return totalSize;
}

export async function getPermacast() {
  const factories = await getPermacastFactories();
  const podcasts = [];

  for (let factory of factories) {
    const metadata = await getFactoryMetadata(factory.factory);
    const podcastsObjects = metadata.filter(
      (action) => action.function === "createPodcast"
    );
    const episodes = metadata.filter(
      (action) => action.function === "addEpisode"
    );

    if (podcastsObjects.length > 1) {
      // transactions are sorted descending by timestamp
      // which is proportionally reversible with the podcast.index
      let index = podcastsObjects.length - 1; 
      for (let pod of podcastsObjects) {
        delete pod["function"];
        pod["pid"] = factory.factory;
        pod["episodesCount"] = episodes.filter(
          (action) => action["index"] == index
        ).length;
        podcasts.push(pod);
        index -= 1;
      }
    } else {
      delete podcastsObjects[0]["function"];
      podcastsObjects[0]["pid"] = factory.factory;
      podcastsObjects[0]["episodesCount"] = episodes.length;
      podcasts.push(podcastsObjects[0]);
    }
  }

  return podcasts;
}
