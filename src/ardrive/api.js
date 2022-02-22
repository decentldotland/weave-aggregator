import { querySchema, gqlTemplate } from "../utils/arweave/gql.js";
import { ardriveDrivesPer } from "../address/gql.js";
import { arweave } from "../utils/arweave/arweave.js";

export async function getPublicDrives(address) {
  const feed = [];

  let drives;

  if (address) {
    const query = ardriveDrivesPer(address);
    drives = await gqlTemplate(query);
  } else {
    drives = await gqlTemplate(querySchema.ardrive.drives);
  }

  for (let drive of drives) {
    const driveData = JSON.parse(
      await arweave.transactions.getData(drive.id, {
        decode: true,
        string: true,
      })
    );

    const driveId = drive["tags"].find((tag) => tag.name === "Drive-Id")?.value;

    feed.push({
      metadata: drive.id,
      poster: drive.owner,
      name: driveData.name,
      url: `https://app.ardrive.io/#/drives/${driveId}`,
      timestamp: drive.timestamp,
    });
  }

  return feed;
}
