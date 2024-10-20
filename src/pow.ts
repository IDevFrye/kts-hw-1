const pow = (base: number, exponent?: number): any => {
  if (exponent !== undefined) {
    if (typeof base !== 'number' || typeof exponent !== 'number') {
      throw new Error('INVALID_ARGUMENT');
    }
    return Math.pow(base, exponent);
  }

  return (exponent: number) => {
    if (typeof base !== 'number' || typeof exponent !== 'number') {
      throw new Error('INVALID_ARGUMENT');
    }
    return Math.pow(base, exponent);
  };
};

export default pow;
