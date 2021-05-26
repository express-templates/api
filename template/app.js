const express = require("express");
const createError = require("http-errors");
{{#morgan}}
const morgan = require("morgan");
{{/morgan}}
{{#helmet}}
const helmet = require("helmet");
{{/helmet}}
{{#if_xor cors extraction "extraction"}}
const cors = require("cors");
{{/if_xor}}
{{#if_xor bodyparser extraction "extraction"}}
const bodyParser = require("body-parser");
{{/if_xor}}
const routes = require("express-import-routes");
{{#if_xor axios extraction "extraction"}}
const alias = require("module-alias");
alias.addAlias("@axios", `${__dirname}/axios.js`);
{{/if_xor}}
{{#if_eq database "mongoose"}}
const db = require("./db");
const chalk = require("chalk");

db.connect().then(() => {
  console.log(chalk.blue("MongoDB connected!"));
});
{{/if_eq}}
require("dotenv").config();

const app = express();

{{#morgan}}
app.use(morgan("dev"));
{{/morgan}}
{{#helmet}}
app.use(helmet());
{{/helmet}}
{{#if_xor cors extraction "extraction"}}
app.use(cors());
{{/if_xor}}
{{#if_xor cookieparser extraction "extraction"}}
app.use(require("cookie-parser")());
{{/if_xor}}
{{#if_xor bodyparser extraction "extraction"}}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
{{/if_xor}}
app.use(routes())

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App it running on port ${PORT}`);
  }
});

module.exports = app