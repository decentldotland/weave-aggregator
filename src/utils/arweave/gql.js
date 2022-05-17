import axios from "axios";

export const querySchema = {
  mirror: {
    blogs: {
      query: `query {
  transactions(
    tags: [
        { name: "App-Name", values: "MirrorXYZ"},
        { name: "Content-Type", values: "application/json"}
        ]
    first: 30
  ) {
    edges {
      node {
        id
        owner { address }
        block { timestamp }
      }
    }
  }
}
`,
    },
  },

  argora: {
    world: {
      query: `query {
  transactions(
    tags: [
        { name: "App-Name", values: "argora"},
        { name: "App-Version", values: ["1", "1.1"]},
        { name: "reply-to", values: "world"}
        ]
    first: 30
  ) {
    edges {
      node {
        id
        owner { address }
        tags  { name value }
        block { timestamp }
      }
    }
  }
}
`,
    },
  },

  saves: {
    blogs: {
      query: `query {
  transactions(
    tags: [
        { name: "User-Agent", values: "ArweaveChrome/2.3.1"},
        ]
    first: 100
  ) {
    edges {
      node {
        id
        owner { address }
        tags  { name value }
        block { timestamp }

      }
    }
  }
}
`,
    },
  },

  ardrive: {
    drives: {
      query: `query {
  transactions(
    tags: [
        { name: "App-Name", values: "ArDrive-Web"},
        { name: "Entity-Type", values: "drive"},
        { name: "Drive-Privacy", values: "public"}
        ]
    first: 30
  ) {
    edges {
      node {
        id
        owner { address }
        tags  { name value }
        block { timestamp }

      }
    }
  }
}`,
    },
  },
  koii: {
    anft: {
      query: `query {
  transactions(
    tags: [
        { name: "Network", values: ["Koi", "Koii"]},
        { name: "Content-Type", values: ["image/png", "image/jpeg"]},
        { name: "Contract-Src", values: ["I8xgq3361qpR8_DvqcGpkCYAUTMktyAgvkm6kGhJzEQ", "r_ibeOTHJW8McJvivPJjHxjMwkYfAKRjs-LjAeaBcLc"]}
        ]
    first: 100
  ) {
    edges {
      node {
        id
        owner { address }
        tags  { name value }
        block { timestamp }

      }
    }
  }
}`,
    },
  },
  pianity: {
    songs: {
      query: `query {
  transactions(
    tags: [
        { name: "Exchange", values: "Pianity"},
        { name: "Content-Type", values: "audio/x-flac"},
        { name: "Type", values: "Mint"}
        ]
    first: 100
  ) {
    edges {
      node {
        id
        owner { address }
        tags  { name value }
        block { timestamp }

      }
    }
  }
}`,
    },
  },
  artbycity: {
    art: {
      query: `query {
  transactions(
    tags: [
        { name: "App-Name", values: "ArtByCity"},
        { name: "Content-Type", values: "application/json"},
        { name: "App-Version", values: "0.0.1-alpha"}
        ]
    first: 10
  ) {
    edges {
      node {
        id
        owner { address }
        tags  { name value }
        block { timestamp }

      }
    }
  }
}`,
    },
  },
};

export async function gqlTemplate(query) {
  const response = await axios.post("https://arweave.net/graphql", query, {
    headers: { "Content-Type": "application/json" },
  });

  const transactionIds = [];

  const res_arr = response.data.data.transactions.edges;

  for (let element of res_arr) {
    const tx = element["node"];
    const txExistence = transactionIds.find((txObj) => txObj.id === tx.id);

    if (!txExistence) {
      transactionIds.push({
        id: tx.id,
        owner: tx.owner.address,
        timestamp: tx.block ? tx.block.timestamp : Date.now(),
        tags: tx.tags ? tx.tags : [],
      });
    }
  }

  return transactionIds;
}
