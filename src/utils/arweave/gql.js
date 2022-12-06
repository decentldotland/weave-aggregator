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
    first: 100
  ) {
    edges {
      node {
        id
        owner { address }
        tags { name value }
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
        { name: "User-Agent", values: "ArConnect/0.4.2"},
        { name: "App-Name", values: "ArDrive-Web"},
        { name: "App-Version", values: "0.1.0"}
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
        { name: "Network", values: "Koii"},
        { name: "Content-Type", values: ["image/png", "image/jpeg"]},
        { name: "Contract-Src", values: ["I8xgq3361qpR8_DvqcGpkCYAUTMktyAgvkm6kGhJzEQ", "r_ibeOTHJW8McJvivPJjHxjMwkYfAKRjs-LjAeaBcLc", "14l2t0DtenMRKPasR6Xi3pmQm3rqopD4cUr6Q5oD8lc"]}
        ]
    first: 25
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
        { name: "Type", values: "Mint"},
        { name: "Contract", values: "XIutiOKujGI21_ywULlBeyy-L9d8goHxt0ZyUayGaDg"}
        ]
    first: 25
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
        { name: "App-Version", values: "0.0.1-alpha"},
        { name: "Category", values: "artwork"}
        ]
    first: 50
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
  metaweave: {
    permatweets: {
      query: `query {
  transactions(
    tags: [
        { name: "Protocol-Name", values: "argora"},
        { name: "Content-Type", values: "application/json"},
        { name: "Protocol-Version", values: "1.2-beta"},
        { name: "reply-to", values: "permatweet"}
        ]
    first: 50
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
  permapages: {
    img: {
      query: `query {
  transactions(
    tags: [
        { name: "App-Name", values: "SmartWeaveContract"},
        { name: "Contract-Src", values: "BzNLxND_nJEMfcLWShyhU4i9BnzEWaATo6FYFsfsO0Q"},
        { name: "Type", values: "image"}
        ]
    first: 50
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

  const response = await axios.post(`https://arweave-search.goldsky.com/graphql`, query, {
    headers: { "Content-Type": "application/json" },
  });

  const transactionIds = [];

  const res_arr = response.data.data.transactions.edges;

  for (let element of res_arr) {
    const tx = element["node"];
    const txExistence = transactionIds.find((txObj) => txObj.id === tx.id);

    if (!txExistence) {
      transactionIds.push({
        id: tx?.id,
        owner: tx?.owner?.address,
        timestamp: tx.block ? tx.block.timestamp : Date.now(),
        tags: tx.tags ? tx.tags : [],
      });
    }
  }

  return transactionIds;
}
