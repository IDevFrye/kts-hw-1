type FunctionType<T> = () => Promise<T> | T;

// Получить из массива функций перечисление результатов их вызовов
// (в случае возврата промиса учитывается именно результат промиса)
type FunctionResultsUnion<
  T extends FunctionType<any>[] | Readonly<FunctionType<any>[]>
> = {
  [K in keyof T]: Awaited<ReturnType<T[K]>>;
}[number];

const promiseFrame = async <
  T extends FunctionType<any>[] | Readonly<FunctionType<any>[]>,
  ResultsT = FunctionResultsUnion<T>
>(
  functions: T,
  limit?: number
): Promise<ResultsT[]> => {
  if (!Array.isArray(functions)) {
    throw new Error('INVALID_ARGUMENT');
  }

  if (limit !== undefined && (typeof limit !== 'number' || limit <= 0)) {
    throw new Error('INVALID_ARGUMENT');
  }

  const results: ResultsT[] = [];
  let runningCount = 0;
  let index = 0;
  let hasErrorOccurred = false;

  const runNext = async (
    resolve: (value: ResultsT[]) => void,
    reject: (reason?: any) => void
  ) => {
    if (index >= functions.length) {
      if (runningCount === 0) {
        resolve(results);
      }
      return;
    }

    const currentIndex = index++;
    const fn = functions[currentIndex];

    runningCount++;

    try {
      const result = await Promise.resolve(fn());
      results[currentIndex] = result;
    } catch (error) {
      if (!hasErrorOccurred) {
        hasErrorOccurred = true;
        reject(error);
      }
      return;
    }

    runningCount--;

    if (!hasErrorOccurred) {
      runNext(resolve, reject);
    }
  };

  return new Promise<ResultsT[]>((resolve, reject) => {
    const concurrentLimit = limit ?? functions.length;

    for (let i = 0; i < concurrentLimit; i++) {
      runNext(resolve, reject);
    }
  });
};

export default promiseFrame;
