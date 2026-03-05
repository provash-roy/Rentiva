import { Types } from "mongoose";

export interface IReview {
  user: Types.ObjectId;
  listing: Types.ObjectId;
  rating: number;
  comment?: string;
  hostReply?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
