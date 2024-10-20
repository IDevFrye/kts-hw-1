const sort = (input: string): string => {
  if (typeof input !== 'string') {
    throw new Error('INVALID_ARGUMENT');
  }

  const words = input.split(' ');

  const sortedWords = words.map((word) => {
    return word
      .toLowerCase()
      .split('')
      .sort((a, b) => a.localeCompare(b))
      .join('');
  });

  sortedWords.sort((a, b) => a.length - b.length);

  return sortedWords.join(' ');
};

export default sort;
