import IUser from "../user.model";

export default interface IGetReview {
  id: number;
  opinion: string;
  rating: number;
  user: IUser | null;
}
