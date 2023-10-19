import mongoose from 'mongoose';

export function isValidMongoID(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}
