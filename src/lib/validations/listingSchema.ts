// import { z } from "zod";

// export const listingSchema = z.object({
//   category: z.string().min(1, "Category is required"),
//   country: z.string().min(1, "Country is required"),
//   city: z.string().min(1, "City is required"),
//   address: z.string().min(1, "Address is required"),
//   title: z.string().min(1, "Title is required"),
//   description: z.string().min(1, "Description is required"),
//   pricePerNight: z
//     .number({ invalid_type_error: "Price must be a number" })
//     .min(1, "Price must be at least $1"),
//   image: z.string().url("Image must be a valid URL"),
//   maxGuests: z
//     .number({ invalid_type_error: "Max guests must be a number" })
//     .min(1, "At least 1 guest required"),
// });
