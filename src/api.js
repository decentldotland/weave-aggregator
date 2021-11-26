import { getMirror } from "./mirror-xyz/api.js";
import { getArgora } from "./argora-xyz/api.js";
import { getArweaveSaves } from "./arweave-saves/api.js";
import { getPublicDrives } from "./ardrive/api.js";
import { getKoii } from "./koii/api.js";
import { getPermacast, getTotalPermacastSize } from "./permacast/api.js";

export async function getWeaveAggregator(network) {
  switch (network) {
    case "mirror-xyz":
      return await getMirror();

    case "argora-xyz":
      return await getArgora();

    case "arweave-saves":
      return await getArweaveSaves();

    case "ardrive":
      await getPublicDrives();

    case "koii":
      return await getKoii();

    case "permacast":
      return await getPermacast();
      
    case "permacast-size":
      return await getTotalPermacastSize();
  }
}
