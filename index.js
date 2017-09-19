const express = require("express");
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();

require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  // res.send('<html><head></head><body><form action="/auth/google"><input type="submit"></form></body></html>');
  res.end('<html><head></head><body><form action="/auth/google"><input type="submit"></form></body></html>');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
