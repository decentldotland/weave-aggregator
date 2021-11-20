import { BaseError } from "./baseError.js";
import { httpStatusCodes } from "../constants/statusCodes.js";

export class InvalidArweaveAddress extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = "Invalid Arweave Address Or TXID",
    isOperational = false
  ) {
    super(name, statusCode, isOperational, description);
  }
}
