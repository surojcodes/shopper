import { Request, Response } from 'express';
import { createProductInput } from '../schema/item.schema';
import Item from '../models/item.model';

export async function createItem(
  req: Request<{}, {}, createProductInput['body']>,
  res: Response
) {
  const item = Item.build(req.body);
  await item.save();
  res.status(201).json({
    success: true,
    data: item,
  });
}
export function getItems() {}
export function getItem() {}
export function updateItem() {}
export function deleteItem() {}
