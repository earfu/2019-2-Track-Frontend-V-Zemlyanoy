import TranslateUtil from './index';

// do at least some test
export function test(): void {
  // expected to detect source language
  TranslateUtil.translate('Das ist gut', 'en');
  // in future: do it twice to look at caching
  // directly calling translate twice will not work,
  // as calls are async
  // calling test twice by hand works, of course,
  // but auto-testing will need a reasonable timer
}
