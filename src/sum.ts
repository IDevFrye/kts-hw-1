const sum = (...args: number[]): number => {
  if (args.length < 2) {
    throw new Error('INVALID_ARGUMENTS_COUNT');
  }

  for (const arg of args) {
    if (typeof arg !== 'number') {
      throw new Error('INVALID_ARGUMENT');
    }
  }

  return args.reduce((acc, curr) => acc + curr, 0);
};

export default sum;
