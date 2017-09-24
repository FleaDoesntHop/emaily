const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require('body-parser');
const keys = require("./config/keys");
require("./models/user");
require("./services/passport");

mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require('./routes/billingRoutes')(app);

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  // res.send('<html><head></head><body><form action="/auth/google"><input type="submit"></form></body></html>');
  res.end(
    '<html><head></head><body><form action="/auth/google"><input type="submit"></form></body></html>'
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
