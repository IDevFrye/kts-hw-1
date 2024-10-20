const dfs = (graph: object): string[] => {
  if (typeof graph !== 'object') {
    throw new Error('INVALID_ARGUMENT');
  }

  const result: string[] = [];

  const visitNodes = (node: string) => {
    result.push(node);
    const children = graph[node] || [];
    for (const child of children) {
      visitNodes(child);
    }
  };

  const nodes = Object.keys(graph);
  if (nodes.length > 0) {
    visitNodes(nodes[0]);
  }

  return result;
};

export default dfs;
