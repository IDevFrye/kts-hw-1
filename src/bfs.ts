const bfs = (graph: object): string[] => {
  if (typeof graph !== 'object') {
    throw new Error('INVALID_ARGUMENT');
  }

  const result: string[] = [];
  const queue: string[] = [];

  const nodes = Object.keys(graph);
  if (nodes.length === 0) {
    return result;
  }
  queue.push(nodes[0]);

  while (queue.length > 0) {
    const current = queue.shift() as string;
    result.push(current);

    const children = graph[current];
    queue.push(...children);
  }

  return result;
};

export default bfs;
