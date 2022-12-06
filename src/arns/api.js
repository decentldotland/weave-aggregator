import { arnsSourceCode } from "../address/gql.js";
import { gqlTemplate } from "../utils/arweave/gql.js";
import axios from "axios";

export async function arnsRecordOf(address) {
  try {
    const query = arnsSourceCode(address);
    const recordsContract = await gqlTemplate(query);
    const txid = recordsContract?.[0]?.id;
    if (txid) {
      const record = (await axios.get(`https://arweave.net/${txid}`))?.data
        ?.name;
      return record;
    }
    return null;
  } catch (error) {
    return null;
  }
}
