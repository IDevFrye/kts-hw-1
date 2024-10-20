const multiply = (multiplier: number) => {
  if (typeof multiplier !== 'number') {
    throw new Error('INVALID_ARGUMENT');
  }

  return (value: number) => {
    if (typeof value !== 'number') {
      throw new Error('INVALID_ARGUMENT');
    }
    return multiplier * value;
  };
};

export default multiply;
