import { Request, Response } from 'express';
import {
  createItemInput,
  getItemInput,
  updateItemInput,
} from '../schema/item.schema';
import Item, { ItemDoc } from '../models/item.model';
import { FilterQuery } from 'mongoose';
import { isValidMongoID } from '../utils/isValidMongoId';
import { BadRequestError, NotFoundError } from '../errors/CustomError';

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

export async function updateItem(
  req: Request<updateItemInput['params'], {}, updateItemInput['body']>,
  res: Response
) {
  const itemId = req.params.itemId;
  if (!isValidMongoID(itemId))
    throw new NotFoundError('Item Not Found', 'getItem');
  const { name, quantity, purchased } = req.body;
  if (!name && !quantity && purchased === undefined)
    throw new BadRequestError('Not updating anything', 'updateItem');
  const item = await Item.findOneAndUpdate(
    { _id: itemId },
    { name, quantity, purchased },
    { new: true }
  );
  res.status(200).json({
    success: true,
    data: item,
  });
}

export async function deleteItem(
  req: Request<updateItemInput['params']>,
  res: Response
) {
  const itemId = req.params.itemId;
  const item = await checkAndGetItem({ _id: itemId });
  item.deleteOne();
  res.status(200).json({
    success: true,
    data: item,
  });
}
