const memo = <T extends (...args: any[]) => any>(
  func: T,
  time?: number
): ((...arg: Parameters<T>) => ReturnType<T>) => {
  // Проверка первого аргумента - должна быть функция
  if (typeof func !== 'function') {
    throw new Error('INVALID_ARGUMENT');
  }

  // Проверка второго аргумента - должен быть числом >= 0
  if (time !== undefined && (typeof time !== 'number' || time < 0)) {
    throw new Error('INVALID_ARGUMENT');
  }

  const cache = new Map<
    string,
    { result: ReturnType<T>; timeoutId: NodeJS.Timeout | null }
  >();

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);

    // Если есть кэшированный результат, обновляем таймер
    if (cache.has(key)) {
      const cached = cache.get(key)!;
      if (time !== undefined && time !== null) {
        if (cached.timeoutId) {
          clearTimeout(cached.timeoutId);
        }
        cached.timeoutId = setTimeout(() => cache.delete(key), time);
      }
      return cached.result;
    }

    // Если нет кэшированного результата, вызываем оригинальную функцию
    const result = func(...args);

    // Кэшируем результат
    let timeoutId: NodeJS.Timeout | null = null;
    if (time !== undefined && time !== null) {
      timeoutId = setTimeout(() => cache.delete(key), time);
    }

    cache.set(key, { result, timeoutId });
    return result;
  };
};

export default memo;
