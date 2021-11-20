import { InvalidArweaveAddress } from "../errors/invalidAddress.js";
import Arweave from "arweave";

export const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 20000,
  logging: false,
});


export function _validateAddress(address) {
	const validity = /[a-z0-9_-]{43}/i.test(address)

	if (! validity) {
		throw new InvalidArweaveAddress(`address: ${address} is not valid`)
	}
}