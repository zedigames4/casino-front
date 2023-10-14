export const removeQuote = (text: string | null) => {
  if (!text) {
    return null;
  }
  return text.replace(/"/g, '');
};
