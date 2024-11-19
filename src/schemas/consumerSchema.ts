import { z } from "zod";

export const consumerSchema = z.object({
  consumerNo: z.string(),
  name: z.string(),
  phone: z.string(),
  noOfCylinder: z.number(),
});
