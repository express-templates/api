const express = require("express");
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
const bodyParser = require("body-parser")
{{/if_xor}}
const routes = require("express-import-routes")

{{#if_eq database "mongodb"}}
require("./db")
  .connect()
  .then((error) => {
    if (error) {
      console.error(error);
    } else {
      console.log("MongoDB connected!");
    }
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App it running on port ${PORT}`);
  }
});
