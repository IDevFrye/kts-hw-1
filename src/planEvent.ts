const planEvent = (cb: any, timeout: number): Promise<any> => {
  if (typeof cb !== 'function') {
    throw new Error('INVALID_ARGUMENT');
  }

  if (typeof timeout !== 'number') {
    throw new Error('INVALID_ARGUMENT');
  }

  return new Promise((resolve) => {
    if (timeout <= 0) {
      resolve(cb());
    } else {
      setTimeout(() => {
        resolve(cb());
      }, timeout);
    }
  });
};

export default planEvent;
