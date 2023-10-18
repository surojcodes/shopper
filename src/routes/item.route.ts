import express from 'express';
import {
  createItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
} from '../controllers/item.controller';
import validate from '../middleware/validateResource';
import { createItemSchema, updateItemSchema } from '../schema/item.schema';
import asyncWrapper from '../utils/asyncWrapper';

const router = express.Router();

router
  .route('/')
  .get(asyncWrapper(getItems))
  .post(validate(createItemSchema), asyncWrapper(createItem));
router
  .route('/:itemId')
  .get(asyncWrapper(getItem))
  .patch(validate(updateItemSchema), asyncWrapper(updateItem))
  .delete(asyncWrapper(deleteItem));

export default router;
