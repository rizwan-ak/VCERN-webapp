export const copyToClipboard = async (text) => {
  return navigator.clipboard.writeText(text);
};
