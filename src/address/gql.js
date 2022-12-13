export function koiiCollectiblePer(address) {
  return {
    query: `query {
  transactions(
  owners: ["${address}"]
    tags: [
        { name: "Network", values: ["Koi", "Koii"]},
        { name: "Content-Type", values: ["image/png", "image/jpeg"]},
        { name: "Contract-Src", values: ["I8xgq3361qpR8_DvqcGpkCYAUTMktyAgvkm6kGhJzEQ", "r_ibeOTHJW8McJvivPJjHxjMwkYfAKRjs-LjAeaBcLc", "14l2t0DtenMRKPasR6Xi3pmQm3rqopD4cUr6Q5oD8lc"]}
        ]
    first: 30
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
}`,
  };
}

export function arweaveSavePer(address) {
  return {
    query: `query {
  transactions(
  owners: ["${address}"]
    tags: [
        { name: "User-Agent", values: "ArweaveChrome/2.3.1"},
        ]
    first: 30
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
}`,
  };
}

export function ardriveDrivesPer(address) {
  return {
    query: `query {
  transactions(
  owners: ["${address}"]
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
        tags { name value }
        block { timestamp }

      }
    }
  }
}`,
  };
}

export function permaPagesImg(address) {
  return {
    query: `query {
  transactions(
  owners: ["${address}"]
    tags: [
        { name: "App-Name", values: "SmartWeaveContract"},
        { name: "Contract-Src", values: ["BzNLxND_nJEMfcLWShyhU4i9BnzEWaATo6FYFsfsO0Q", "x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs"]},
        { name: "Type", values: "image"}
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
}`,
  };
}

export function arnsSourceCode(address) {
  return {
    query: `query {
  transactions(
  owners: ["${address}"]
    tags: [
        { name: "App-Name", values: "SmartWeaveContract"},
        { name: "Contract-Src", values: ["PEI1efYrsX08HUwvc6y-h6TSpsNlo2r6_fWL2_GdwhY", "7hL0La2KMapdJI6yIGnb4f4IjvhlGQyXnqpWc0i0d_w", "cNr6JPVu3rEOwIbdnu3lVipz9pwY5Pps9mxHSW7Jdtk", "JIIB01pRbNK2-UyNxwQK-6eknrjENMTpTvQmB8ZDzQg"]},
        { name: "SDK", values: "RedStone"},
        { name: "Content-Type", values: "application/json"}
        ]
    first: 1
  ) {
    edges {
      node {
        id

      }
    }
  }
}`,
  };
}

