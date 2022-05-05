export const trimExtension = (file: string): string =>
  file.substring(0, file.lastIndexOf('.')) || file;

export const generateFileName = (
  name: string,
  width: number,
  height: number
): string => {
  let thumbnailName = name;
  if (width) {
    thumbnailName += `_w${width}`;
  }
  if (height) {
    thumbnailName += `_h${height}`;
  }
  return thumbnailName;
};
