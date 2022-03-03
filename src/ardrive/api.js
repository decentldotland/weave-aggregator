import { querySchema, gqlTemplate } from "../utils/arweave/gql.js";
import { ardriveDrivesPer } from "../address/gql.js";
import { arweave } from "../utils/arweave/arweave.js";

export async function getPublicDrives(address) {
  try {
    const feed = [];

    let drives;

    if (address) {
      const query = ardriveDrivesPer(address);
      drives = await gqlTemplate(query);
    } else {
      drives = await gqlTemplate(querySchema.ardrive.drives);
    }

    for (let drive of drives) {
      const driveId = drive["tags"].find(
        (tag) => tag.name === "Drive-Id"
      )?.value;

      feed.push({
        metadata: drive.id,
        poster: drive.owner,
        url: `https://app.ardrive.io/#/drives/${driveId}`,
        timestamp: drive.timestamp,
      });
    }

    return feed;
  } catch (error) {
    console.log(error);
  }
}

