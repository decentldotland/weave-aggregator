import { querySchema, gqlTemplate } from "../utils/arweave/gql.js";
import { arweave } from "../utils/arweave/arweave.js";

export async function getPublicDrives() {
  const feed = [];

  const drives = await gqlTemplate(querySchema.ardrive.drives);

  for (let drive of drives) {
    const driveData = JSON.parse(
      await arweave.transactions.getData(drive.id, {
        decode: true,
        string: true,
      })
    );

    feed.push({
      metadata: drive.id,
      poster: drive.owner,
      name: driveData.name,
      url: `https://app.ardrive.io/#/drives/${drive.tags[6]["value"]}`,
      timestamp: drive.timestamp,
    });
  }

  return feed;
}
