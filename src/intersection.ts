function intersection(arr1?: number[], arr2?: number[]): number[] {
  if (arguments.length !== 2) {
    throw new Error('INVALID_ARGUMENTS_COUNT');
  }

  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error('INVALID_ARGUMENT');
  }

  const validateArray = (arr: number[], argName: string) => {
    for (const el of arr) {
      if (typeof el !== 'number') {
        throw new Error('INVALID_ELEMENT_IN_ARRAY');
      }
    }
  };

  validateArray(arr1, 'arr1');
  validateArray(arr2, 'arr2');

  const set1 = new Set<number>(arr1);
  const result: number[] = [];

  set1.forEach((num) => {
    if (arr2.includes(num)) {
      result.push(num);
    }
  });

  return result;
}

export default intersection;
