import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  img: z.string(),
});

export const UserListSchema = z.array(UserSchema);

export const CreateUserSchema = UserSchema.omit({ id: true });
