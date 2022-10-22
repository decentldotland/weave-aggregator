import axios from "axios";

const STAMPS_CONTRACT_OLD = `aSMILD7cEJr93i7TAVzzMjtci_sGkXcWnqpDkG6UGcA`;
const STAMPS_CONTRACT_NEW = `jAE_V6oXkb0dohIOjReMhrTlgLW0X2j3rxIZ5zgbjXw`;

const stampsGraph = async (after, STAMPS_CONTRACT) => {
  let query = "";
  if (after) {
    query = `query {
            transactions(
                tags: [
                      { name: "App-Name", values: "SmartWeaveAction"},
                      { name: "Contract", values: "${STAMPS_CONTRACT}"}
                      ],
                first: 100,
                after: "${after}"
            ) {
                edges {
                    node {
                        id
                        owner { address }
                        tags { name value }
                        block { timestamp height }
                    },
                cursor
                }
            }
        }`;
  } else {
    query = `query {
            transactions(
                tags: [
                      { name: "App-Name", values: "SmartWeaveAction"},
                      { name: "Contract", values: "${STAMPS_CONTRACT}"}
                      ],
                first: 100
            ) {
                edges {
                    node {
                        id
                        owner { address }
                        tags { name value }
                        block { timestamp height }
                    },
                cursor
                }
            }
        }`;
  }

  const url = "https://arweave.net/graphql";
  const response = await axios.post(
    url,
    { query },
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return await response.data;
};

export async function makeQuery(stamps_contract) {
  try {
    const firstFetch = await stampsGraph(null, stamps_contract);
    const firstEdges = firstFetch?.data?.transactions?.edges || [];
    const results = [...firstEdges];
    const finalRes = [];

    if (results.length === 100) {
      const getEdgesLength = () => results.length;

      while (true) {
        const lastCursor = results[getEdgesLength() - 1]?.cursor;

        if (lastCursor) {
          const nextFetch = await stampsGraph(lastCursor, stamps_contract);
          const currentEdges = nextFetch?.data?.transactions?.edges || [];
          const currentEdgeLength = currentEdges.length || 0;

          if (currentEdgeLength === 0) {
            break;
          }

          results.push(...currentEdges);
        }
      }
    }

    const res = results.map((node) => node.node);
    const filteredRes = res

    for (const element of filteredRes) {
      finalRes.push({
        id: element.id,
        owner: element.owner.address,
        // pending transactions do not have block value
        timestamp: element.block ? element.block.timestamp : Date.now(),
        blockheight: element.block ? element.block.height : Date.now(),
        tags: element.tags ? element.tags : [],
      });
    }
    return finalRes;
  } catch (error) {
    console.log(error);
  }
}

export async function makeQueries() {
  try {
    const oldFeed = await makeQuery(STAMPS_CONTRACT_OLD);
    const newFeed = await makeQuery(STAMPS_CONTRACT_NEW);

    return oldFeed.concat(newFeed);
  } catch(error) {
    console.log(error);
  }
}
