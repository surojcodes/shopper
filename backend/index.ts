import app from './app';
import dotenv from 'dotenv';
import mongoose, { MongooseError } from 'mongoose';

dotenv.config();

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

const startApp = async function (){
  try {
    if(!mongoUri){
      throw new Error('Mongo Connection URL missing')
    }
    await mongoose.connect(mongoUri)
    console.log('MongoDB Connected');
  } catch (e:any) {
    console.log('Could not connect to MongoDB:',e.message);
    process.exit();
  }
  app.listen(port,()=>console.log(`App Listening on port ${port}...`))
}

startApp();