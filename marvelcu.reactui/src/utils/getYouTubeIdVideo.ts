const getYouTubeIdVideo = (link: string): string => {
  var id = link.split("v=")[1];
  var ampersandIndex = link.indexOf("&");

  if (ampersandIndex !== -1) {
    id = id.substring(0, ampersandIndex);
  }

  return id;
};

export default getYouTubeIdVideo;
