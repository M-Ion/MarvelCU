export const getMovieIdFromimdbLink = (link: string): string | null => {
  const path = "imdb.com/title/";
  if (link.includes(path)) {
    link = link.split(path).pop() as string;
    const id: string = link.split("/")[0];

    return id;
  }

  return null;
};

export const getActorIdFromimdbLink = (link: string): string | null => {
  const path = "imdb.com/name/";

  if (link.includes(path)) {
    link = link.split(path).pop() as string;
    const id: string = link.split("/")[0];

    return id;
  }

  return null;
};
