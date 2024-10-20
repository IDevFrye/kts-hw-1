const getNumberProps = (obj: object): string[] => {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    throw new Error('INVALID_ARGUMENT');
  }

  const result: string[] = [];

  const findNumberProps = (curObj: object) => {
    for (const key in curObj) {
      if (Object.prototype.hasOwnProperty.call(curObj, key)) {
        const value = curObj[key];
        if (typeof value === 'number') {
          result.push(key);
        } else if (typeof value === 'object' && value !== null) {
          findNumberProps(value);
        }
      }
    }
  };

  findNumberProps(obj);

  return result.sort();
};

export default getNumberProps;
