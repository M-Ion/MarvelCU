import IUser from "../user.model";

export default interface IAuthResponse {
  user: IUser;
  token: string;
}
