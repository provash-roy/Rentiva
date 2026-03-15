import { Types } from "mongoose";

export interface IPayment {
  reservation: Types.ObjectId;
  user: Types.ObjectId;
  amount: number;
  paymentMethod?: string;
  transactionId?: string;
  status?: "pending" | "paid" | "failed";
  createdAt?: Date;
  updatedAt?: Date;
}
