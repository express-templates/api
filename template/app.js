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
const bodyParser = require("body-parser")
const routes = require("express-import-routes")

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
app.use(require("cookie-parser")());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes())

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App it running on port ${PORT}`);
  }
});
