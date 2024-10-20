const removeAnagrams = (arr: string[]): string[] => {
  if (!Array.isArray(arr)) {
    throw new Error('INVALID_ARGUMENT');
  }

  for (const el of arr) {
    if (typeof el !== 'string') {
      throw new Error('INVALID_ELEMENT_IN_ARRAY');
    }
  }

  const wordCount: Record<string, number> = {};

  for (const word of arr) {
    const sortedWord = word.toLowerCase().split('').sort().join('');
    if (!wordCount[sortedWord]) {
      wordCount[sortedWord] = 0;
    }
    wordCount[sortedWord]++;
  }

  const result: string[] = [];
  for (const word of arr) {
    const sortedWord = word.toLowerCase().split('').sort().join('');
    if (wordCount[sortedWord] === 1) {
      result.push(word);
    }
  }

  return result;
};

export default removeAnagrams;
