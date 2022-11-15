export default interface INews {
  id: number;
  title: string;
  content: string;
  posted: Date;
  updated: Date | null;
}
