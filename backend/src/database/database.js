import mongoose from 'mongoose';


async function connectDB() {
const { MONGO_DB_NAME, MONGO_URI } = process.env;
const connectionConfig = { dbName: MONGO_DB_NAME, autoIndex: true };
const connection = await mongoose.connect(MONGO_URI, connectionConfig);

if (connection) {
  console.log('Connection with mongo database successfully');
} else {
  console.error('Error to connect with mongo database');
}
}

export default connectDB;