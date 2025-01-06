import mongoose from 'mongoose';

const dbUrl =  'mongodb+srv://admin:12345@cluster0.hmfd6.mongodb.net/book_register_db?retryWrites=true&w=majority&appName=Cluster0';


const connectDb = async () => {
  try {
    await mongoose.connect(dbUrl, {
    });
    console.log('Connected to MongoDB successfully.');
  } catch (error) {
    throw new Error('Failed to connect to MongoDB:', error);
  }
};

export default connectDb;
