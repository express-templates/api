const express = require("express");
{{#morgan}}
const morgan = require("morgan");
{{/morgan}}
{{#helmet}}
const helmet = require("helmet");
{{/helmet}}
{{#cors}}
const cors = require("cors");
{{/cors}}
{{#bodyparser}}
const bodyParser = require("body-parser")
{{/bodyparser}}
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
{{#cors}}
app.use(cors());
{{/cors}}
{{#cookieparser}}
app.use(require("cookie-parser")());
{{/cookieparser}}
{{#bodyparser}}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
{{/bodyparser}}
app.use(routes())

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App it running on port ${PORT}`);
  }
});
