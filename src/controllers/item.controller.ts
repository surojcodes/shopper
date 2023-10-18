import { Request, Response } from 'express';
import { createItemInput, getItemInput } from '../schema/item.schema';
import Item, { ItemDoc } from '../models/item.model';
import { FilterQuery } from 'mongoose';
import { isValidMongoID } from '../utils/isValidMongoId';
import { NotFoundError } from '../errors/CustomError';

async function checkAndGetItem(query: FilterQuery<ItemDoc>) {
  const item = await Item.findOne(query);
  if (!item) {
    throw new NotFoundError('Item Not Found', 'checkAndGetItem');
  }
  return item;
}

export async function createItem(
  req: Request<{}, {}, createItemInput['body']>,
  res: Response
) {
  const item = Item.build(req.body);
  await item.save();
  res.status(201).json({
    success: true,
    data: item,
  });
}
export async function getItems(req: Request, res: Response) {
  const items = await Item.find();
  res.status(200).json({
    success: true,
    data: {
      count: items.length,
      items,
    },
  });
}
export async function getItem(
  req: Request<getItemInput['params']>,
  res: Response
) {
  const itemId = req.params.itemId;
  if (!isValidMongoID(itemId))
    throw new NotFoundError('Item Not Found', 'getItem');
  const item = await checkAndGetItem({ _id: itemId });
  res.status(200).json({
    success: true,
    data: item,
  });
}

export function updateItem() {}
export function deleteItem() {}
