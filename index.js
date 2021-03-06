const express = require('express');
const gqHTTP = require("express-graphql");
const connect = require('./src/Config/connect')();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());


const Account = require("./src/DataAccess/Accounts/Account");

app.use((req, res, next) => {
  res.setHeader("X-Powered-By", "Vigil");
  next();
});

let schema = require('./src/Graph/Schemas/Schema');
let resolver = require('./src/Graph/Resolver/Resolver');

app.use(cors());


app.use("/", gqHTTP({schema:schema,    rootValue: resolver,    graphiql: true}));

app.listen(process.env.PORT || 3000)
