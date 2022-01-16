import { gqlTemplate } from "../utils/arweave/gql.js";
import { isParsable, arweave } from "../utils/arweave/arweave.js";
import { permacastDeepGraphs, factoryMetadataGraph } from "./gqlUtils.js";
import axios from "axios";

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
    if (isParsable(inputTag.value)) {
      metadata.push(JSON.parse(inputTag.value));
    }
  }

  return metadata;
}

export async function getTotalPermacastSize() {
  const response = await axios.get(
    "https://permacast-cache.herokuapp.com/feeds/podcasts"
  );
  const podcasts = response.data.res;
  let totalSize = 0;

  for (let podcast of podcasts) {
    const episodes = podcast["episodes"];

    if (episodes.length === 0) {
      continue;
    }
    const sizeArray = episodes.map((ep) => ep.audioTxByteSize);
    const podcastSize = sizeArray.reduce((a, b) => a + b, 0);
    totalSize += podcastSize;
  }

  return totalSize;
}

export async function getEpisodesOf(podcast_id) {
  try {
    const metadata = await getFactoryMetadata(podcast_id);
    const episodesObjects = metadata.filter(
      (action) => action.function === "addEpisode"
    );
    const episodes = [];

    for (let episode of episodesObjects) {
      delete episode["function"];
      delete episode["index"];
      delete episode["type"];
      episodes.push(episode);
    }

    return episodes;
  } catch (error) {
    console.log(`${error.name} : ${error.description}`);
  }
}

export async function getPermacast() {
  const factories = await getPermacastFactories();
  const podcasts = [];

  for (let factory of factories) {
    const metadata = await getFactoryMetadata(factory.factory);
    // pas on empty factories
    if (metadata.length < 1) {continue};

    const podcastsObjects = metadata.filter(
      (action) => action.function === "createPodcast"
    );
    const episodesObjects = metadata.filter(
      (action) => action.function === "addEpisode"
    );

    if (podcastsObjects.length > 1) {
      // transactions are sorted descending by timestamp
      // which is proportionally reversible with the podcast.index
      let index = podcastsObjects.length - 1;
      for (let pod of podcastsObjects) {
        delete pod["function"];
        pod["pid"] = factory.factory;
        pod["episodesCount"] = episodesObjects.filter(
          (action) => action["index"] == index
        ).length;
        podcasts.push(pod);
        index -= 1;
      }
    } else {
      delete podcastsObjects[0]["function"];
      podcastsObjects[0]["pid"] = factory.factory;
      podcastsObjects[0]["episodesCount"] = episodesObjects.length;
      podcasts.push(podcastsObjects[0]);
    }
  }

  return podcasts;
}
