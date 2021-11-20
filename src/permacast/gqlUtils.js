export const permacastDeepGraphs = {
  factories: {
    query: `query {
  transactions(
    tags: [
        { name: "Protocol", values: "permacast-testnet-v3"},
        { name: "Action", values: "launchCreator"},
        { name: "Contract-Src", values: "KrMNSCljeT0sox8bengHf0Z8dxyE0vCTLEAOtkdrfjM"}
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
  },
};

export function factoryMetadataGraph(factory_id) {
  return {
    query: `query {
  transactions(
    tags: [
        { name: "App-Name", values: "SmartWeaveAction"},
        { name: "App-Version", values: "0.3.0"},
        { name: "Contract", values: "${factory_id}"}
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
