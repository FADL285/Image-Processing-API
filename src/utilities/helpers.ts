export const trimExtension = (file: string): string =>
  file.substring(0, file.lastIndexOf('.')) || file;
