import mongoose, { } from 'mongoose';

//things needed to create a document
export interface ItemInput{
  name:string;
  quantity:string;
}

export interface ItemDoc extends mongoose.Document{
  purchased:boolean;
  createdAt:Date,
  updatedAt:Date,
}

export interface ItemModel extends mongoose.Model<ItemDoc>{
  build:(input:ItemInput)=>ItemDoc
}

const itemSchema = new mongoose.Schema({
  name:{type:String,required:true},
  quantity:{type:String,required:true},
  purchased:{type:Boolean,default:false}
},{timestamps:true})

itemSchema.statics.build = function (item:ItemInput){
  return new Item(item);
}

const Item = mongoose.model<ItemDoc,ItemModel>('Item',itemSchema)

export default Item