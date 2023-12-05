import { useState } from "preact/hooks";
import { CacheHook, FactoryFunction } from "../interfaces";


const useCache = <T>(key: string, factoryFunction: FactoryFunction<T>): CacheHook<T> => {
  const storedValue = localStorage.getItem(key);
  const initialCacheValue = storedValue
    ? JSON.parse(storedValue)
    : { value: factoryFunction() };

  const [cacheValue, setCacheValue] = useState<T>(initialCacheValue.value);

  const updateCache = (value: T) => {
    const newCacheValue = { value };
    setCacheValue(newCacheValue.value);
    localStorage.setItem(key, JSON.stringify(newCacheValue));
  };

  const invalidateCache = () => {
    localStorage.removeItem(key);
  };

  return { cacheValue, updateCache, invalidateCache };
};

export default useCache;
