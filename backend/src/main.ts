// dotenv config
import dotenv from 'dotenv';
dotenv.config();

// imports
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import { configInt } from './config';
import { createDB } from './database/database';
import { getCurrentUser } from './middlewares/authentication.middlewares';
import { handleError } from './middlewares/general.middlewares';
import { createRoutes } from './routes/routes';

// initializations
const app = express();

// db
createDB();

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);
app.use(compression());
app.use(bodyParser.json());
app.use(getCurrentUser);

// routes
createRoutes(app);

// handle errors
app.use(handleError);

// starting the server
const PORT = configInt('PORT');
app.listen(PORT, () => {
  console.log('Server listening on port: ' + PORT);
});
