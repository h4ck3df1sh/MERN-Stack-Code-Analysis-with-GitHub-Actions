// ENVIRONMENT VARIABLES
import * as dotenv from 'dotenv';
dotenv.config();

// DATABASE 
import connectDB from '../database/database.js';
import { DBconnection } from '../database/databaseConnection.js';

// DEPENDENCIES
import express from 'express';
import { addCountries, emptyVisitors, generateUsers, generatePosts, generateComments, addVisitors, changeImages } from './generate.js';

// SWAGGER
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerDefinition } from './swaggerDefinition.js';
const options = {
  swaggerDefinition,
  apis: [
    './src/api/routers/**.js',
    './src/api/models/**.js'
  ],
};
const swaggerSpec = swaggerJSDoc(options);

// DEV DEPENDENCIES
import cors from 'cors';

// ROUTING
import middleware from './middleware.js';
import router from './router.js';

// SERVER INITIALIZING
const app = express();
const port = process.env.PORT || 3000;

if (process.env.ENVIRONMENT === "dev") app.use(cors());
app.use(express.json());
app.use(middleware);
app.use(router);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

async function start() {
  // DATABASE CONNECTION
  await DBconnection();
  //await connectDB();
  // await addCountries();
  // await emptyVisitors();
  // await generateUsers();
  // await generatePosts();
  // await generateComments();
  // await addVisitors();
  // await changeImages();

  // SERVER START
  const server = app.listen(port, () => {
    const timelog = new Date();
    console.log(`SERVERLOG ${timelog} --> Server started on port ${port}.`);
  });

  process.on('unhandledRejection', err => {
    const timelog = new Date();
    console.error(`SERVERLOG ${timelog} --> Server has closed. An error occurred: ${err}`)
    server.close(() => process.exit(1))
  });
}

start();