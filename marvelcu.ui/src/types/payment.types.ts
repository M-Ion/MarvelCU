export interface Payment {
  amount: number;
  cardNumber: string;
  cvc: number;
  expMonth: number;
  expYear: number;
  save: boolean;
}
