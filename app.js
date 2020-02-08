const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const { MongoURI } = require("./configs/keys");
console.log("test2 development");
const routes = require("./routes/index");

console.log("developing in test1 branch");
mongoose
  .connect(MongoURI)
  .then(e => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.log("Something went weong.", err.message);
  });

// body parser
app.use(bodyParser.json());

// helmet
app.use(helmet());

// gzip
app.use(compression());

//   execute all routes
routes(app);

app.listen(5000, () => {
  console.log(`Running on localhost 5000`);
});
