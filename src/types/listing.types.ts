import mongoose from "mongoose";

export interface ILocation {
  country?: string;
  city?: string;
  address?: string;
  lat?: number;
  lng?: number;
}

export interface IListing {
  _id?: mongoose.Types.ObjectId;

  category?: string;

  title: string;
  description: string;

  pricePerNight: number;

  location?: ILocation;

  images?: string[];

  maxGuests: number;

  host: mongoose.Types.ObjectId;

  averageRating?: number;
  reviewCount?: number;

  isApproved?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}
