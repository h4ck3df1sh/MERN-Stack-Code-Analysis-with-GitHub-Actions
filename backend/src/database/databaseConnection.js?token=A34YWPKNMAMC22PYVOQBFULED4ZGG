import Mongoose from 'mongoose';

export async function DBconnection() {
  Mongoose.set('strictQuery', false);
  try {
    await Mongoose.connect(process.env.MONGO_URI2);
    const connection = Mongoose.connection;
    connection.watch().on('change', data => {
      const watcher = {
        operation: data.operationType,
        database: data.ns.db,
        collection: data.ns.coll,
        document: data.documentKey._id,
      };
      const timelog = new Date();
      console.log(`DATABASE OPERATION ${timelog} --> `, watcher);
    });
    const timelog = new Date();
    console.log(`SERVERLOG ${timelog} --> Connected to MongoDB.`);
    return connection;
  } catch (error) {
    const timelog = new Date();
    return console.log(`SERVERLOG ${timelog} --> Connection to MongoDB returned an error: ${error.message}`)
  }
}
