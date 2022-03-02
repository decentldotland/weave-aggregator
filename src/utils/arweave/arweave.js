import { InvalidArweaveAddress } from "../errors/invalidAddress.js";
import Arweave from "arweave";

const arweaveConfigs = {
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 20000,
  logging: false,
}

export const arweave = (typeof window !== 'undefined') ? 
  Arweave.default.init(arweaveConfigs) : Arweave.init(arweaveConfigs);


export function _validateAddress(address) {
	const validity = /[a-z0-9_-]{43}/i.test(address)

	if (! validity) {
		throw new InvalidArweaveAddress(`address: ${address} is not valid`)
	}
}

export function isParsable(string) {
  try {
    JSON.parse(string);
  } catch (error) {
    return false;
  }
  return true;
}
