import { User } from "./user.types";

export interface AuthRegister {
  confirmPassword: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface AuthRespone {
  user: User;
  token: string;
}

export interface Login {
  email: string;
  password: string;
}
