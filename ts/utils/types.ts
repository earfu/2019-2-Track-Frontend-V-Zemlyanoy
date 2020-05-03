// why does the API response use an array for text?
// is it multi-line? Multi-text?
// note that detected is requested in the options
export interface APIJson {
  code: number;
  detected: { lang: string };
  lang: string;
  text: Array<string>;
}

// [lang query parameter, API response]
export type cacheEntry = [string, APIJson];

// because cache will use strings for indexing
export interface Dictionary<Tp> {
  [key: string]: Tp;
}
