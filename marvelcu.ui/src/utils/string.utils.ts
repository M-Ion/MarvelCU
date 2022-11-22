export const fileExtension = (fileName: string) => fileName.split(".").pop();

export const isLengthValid = (
  value: string | undefined,
  min: number,
  max: number
): boolean => Boolean(value && value.length >= min && value.length <= max);

export const getNameIdFromImdbLink = (link: string): string | null => {
  const path = "imdb.com/name/";

  if (link.includes(path)) {
    link = link.split(path).pop() as string;
    const id: string = link.split("/")[0];

    return id;
  }

  return null;
};

export const getTitleFromimdbLink = (link: string): string | null => {
  const path = "imdb.com/title/";
  if (link.includes(path)) {
    link = link.split(path).pop() as string;
    const id: string = link.split("/")[0];

    return id;
  }

  return null;
};

export const getYouTubeVideoId = (link: string): string => {
  var id = link.split("v=")[1];
  var ampersandIndex = link.indexOf("&");

  if (ampersandIndex !== -1) {
    id = id.substring(0, ampersandIndex);
  }

  return id;
};
