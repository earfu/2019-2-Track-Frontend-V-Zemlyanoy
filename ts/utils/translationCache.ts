import * as T from './types';

// cache holds only while the session lasts
let cache: T.Dictionary<T.cacheEntry> = {};

export function checkCache(text: string): T.cacheEntry | undefined {
  return cache[text];
}

export function setCache(
  text: string,
  lang: string,
  response: T.APIJson,
): void {
  const entry: T.cacheEntry = [lang, response];
  cache[text] = entry;
  console.log('Cached');
  return;
}
