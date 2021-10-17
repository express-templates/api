const express = require("express");
const createError = require("http-errors");
const chalk = require("chalk");
const morgan = require("morgan");
const helmet = require("helmet");
{{#if_xor cors extraction "extraction"}}
const cors = require("cors");
{{/if_xor}}
const express_import_routes = require("express-import-routes");
{{#if_xor axios extraction "extraction"}}
const alias = require("module-alias");
alias.addAlias("@axios", `${__dirname}/axios.js`);
{{/if_xor}}
{{#if_eq database "mongoose"}}
const db = require("./db");

db.connect().then(() => {
  console.log(chalk.blue("MongoDB connected!"));
});
{{/if_eq}}
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
{{#if_xor cors extraction "extraction"}}
app.use(cors());
{{/if_xor}}
{{#if_xor cookieparser extraction "extraction"}}
app.use(require("cookie-parser")());
{{/if_xor}}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express_import_routes());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  console.error(chalk.red(err.message));
  res.end("Error");
});

app.use(express.static(path.join(__dirname, "..", "public")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App it running on port ${PORT}`);
  }
});

module.exports = app;