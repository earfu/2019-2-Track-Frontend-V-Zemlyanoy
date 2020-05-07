import * as T from './types';
import escapeText from './escapeText';
import { checkCache, setCache } from './translationCache';

const APIKEY =
  'trnsl.1.1.20200503T044336Z.0e5c077f9924453a.30e692f12ef30f7f54078843a78340b592f7e104';
const APIURL = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

// no default here, as would result in [top].default.default if the top is required instead of import
export function translate(
  text: string,
  lang: string,
  setResult?: (data: T.APIJson) => void,
): Promise<T.APIJson | void> | T.APIJson | undefined {
  // on wrong lang input: will be reflected in the response status code
  // me too lazy to build the entire available language list,
  // or even to check using the API list of supported languages

  // escape special characters
  const clearText: string = escapeText(text);
  // because language might be input by a user too
  const clearLang: string = escapeText(lang);

  // use result caching
  const cached: T.cacheEntry | undefined = checkCache(clearText);
  if (cached) {
    // in particular: if the (cleared) text matches, but lang does not,
    // the call will be made, and the cache entry will be rewritten
    if (cached[0] === clearLang) {
      // exact matching not really the best, as, e.g., 'en' and 'ru-en' should usually give the same result;
      console.log('Cached result:');
      console.log(cached[1]);
      // if logging was the only thing to do, might be better to do it right in the checkCache()
      // but it is not, as it is assumed translate function will have more use for the result
      return cached[1];
    }
  }

  // options=1 asks to include detected language in the API response
  const requestString = `${APIURL}?key=${APIKEY}&text=${clearText}&lang=${clearLang}&options=1`;

  return fetch(requestString)
    .then((res) => {
      if (!res.ok) {
        // res type is not specified here;
        // is there point in constructing Response just for that?
        // don't think so

        // On wrong network response
        throw new Error('Error: Network response not ok');
      }
      if (res.status === 200) {
        // the API states that 200 is the code for all successful operations
        return res.json();
      } else {
        // On working response with a wrong status code
        throw new Error(`Wrong status code of API response: ${res.status}`);
      }
    })
    .then((data: T.APIJson) => {
      // what shall we do with corect data?
      setCache(clearText, clearLang, data);
      console.log(data);
      if (setResult) {
        setResult(data);
      }
      return data;
    })
    .catch((error) => console.log(`Error on fetching translation: ${error}`));

  // return;
}
