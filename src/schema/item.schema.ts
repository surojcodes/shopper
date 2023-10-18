import { TypeOf, z } from 'zod';

export const createItemSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Item name is required.' })
      .min(3, 'Item name should be min 3 characters long.'),
    quantity: z.string({ required_error: 'Item quantity is required' }),
  }),
});
export const updateItemSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, 'Item name should be min 3 characters long.')
      .optional(),
    quantity: z
      .string({ required_error: 'Item quantity is required' })
      .optional(),
    purchased: z.boolean().optional(),
  }),
  params: z.object({
    itemId: z.string({ required_error: 'Item id is required' }),
  }),
});

export type createProductInput = TypeOf<typeof createItemSchema>;
export type updateProductInput = TypeOf<typeof updateItemSchema>;
