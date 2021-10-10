import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import LOG from './log';
import routes from './routes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const Environment = process.env.ENVIRONMENT;
const Port = process.env.PORT;
const MongoUri = process.env.MONGO_URI;

if (Port && MongoUri) {
  mongoose
    .connect(MongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      LOG.info('Database Synced');
    })
    .catch((error) => {
      LOG.error(error.message);
    });

  app.get('/', (req, res) => {
    res.send(`<h3>School Management REST API</h3>`);
  });

  app.listen(Port, () => {
    LOG.info(Environment);
    LOG.info(MongoUri);
    LOG.info(`API is up and running on Port ${Port}`);
    routes(app);
  });
}
