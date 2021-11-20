<p align="center">
  <a href="https://decent.land">
    <img src="./src/utils/img/logo25.png" height="124">
  </a>
  <h3 align="center"><code>@decentdotland/weave-aggregator</code></h3>
  <p align="center">🐊 the allegator of the permaweb 🐊</p>
</p>

# Synopsis
The weave-allegator library aggregates data and feeds from the Permaweb, and make the access for it easier. The `weave-aggregator` aggregates especially social feeds from protocols that use Arweave as a storage solution.

The library will be under continious development mode to keep on track with the new & currently unsupported protocols that use Arweave. By aggregating data from different protocols, the `weave-aggregator` allows developers to create a frontend for the "timeline of the Permaweb".

# Install

`npm install weave-aggregator `

# Current Supported Protocols

| protocol name |   directory   |
| :-----------: |:-------------:| 
| [ArweaveSaves](https://github.com/xylophonez/arweave-saves)  | [arweave-saves](./src/arweave-saves)| 
| [Koii Network](https://koi.rocks)             | [koii](./src/koii)        | 
| [ardrive.io](https://ardrive.io)             |[ardrive](./src/ardrive)     |
| [permacast.net](https://permacast.net)             | [permacast](./src/permacast)    | 
| [argora.xyz](https://argora.xyz)             | [argora-xyz](./src/argora-xyz) | 
| [mirror.xyz](https://mirror.xyz)             | [mirror-xyz](./src/mirror-xyz)|


# Usage Example

## get permacast podcasts

```js
import { getPermacast } from "weave-aggregator"

export async function podcasts() {
  const podcastsMetadata = await getPermacast();

  return podcastsMetadata
}

```

# License
This projects is licensed under the MIT license



