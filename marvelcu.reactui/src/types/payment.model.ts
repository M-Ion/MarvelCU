export default interface Payment {
  cardNumber: string;
  expMonth: number;
  expYear: number;
  cvc: number;
  amount: number;
  save: boolean;
}
