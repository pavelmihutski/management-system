import { z } from 'zod';

export const EmployeeSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  img: z.string(),
});

export const EmployeeListSchema = z.array(EmployeeSchema);

export const CreateEmployeeSchema = EmployeeSchema.omit({ id: true });
