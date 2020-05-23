function escapeText(text: string): string {
  // what, there's nothing better?
  return encodeURIComponent(text);
}

export default escapeText;
