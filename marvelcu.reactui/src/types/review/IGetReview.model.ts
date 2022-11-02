export default interface IGetReview {
  id: number;
  opinion: string;
  rating: number;
  user: { id: string; firstName: string; lastName: string };
}
