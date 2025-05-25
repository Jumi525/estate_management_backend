const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const properties = require('./routes/properties');
const Authentication = require('./routes/authentication');
const app = express();

dotenv.config();

const PORTS = process.env.PORT;

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDb connected...'))
  .catch((err) => console.error('Mongo_db error', err));

app.use('/api/auth', Authentication);
app.use('/api', properties);

app.listen(PORTS, () => {
  console.log(`server is running on Port http://localhost:${PORTS}`);
});
