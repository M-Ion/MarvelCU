export default interface IGetBlob {
  container: "actor-images" | "movie-images" | "hero-images" | "video";
  blob: string;
}
