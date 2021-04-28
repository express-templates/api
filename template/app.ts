import express, { Application } from "express";
{{#morgan}}
import morgan from "morgan";
{{/morgan}}
{{#helmet}}
import helmet from "helmet";
{{/helmet}}
{{#if_xor cors extraction "extraction"}}
import cors from "cors";
{{/if_xor}}
{{#if_xor bodyparser extraction "extraction"}}
import bodyParser from "body-parser";
{{/if_xor}}
{{#if_xor cookieparser extraction "extraction"}}
import cookieParser from "cookie-parser"
{{/if_xor}}
import routes from "express-import-routes";
{{#if_xor axios extraction "extraction"}}
import alias from "module-alias";
{{/if_xor}}
import dotenv from "dotenv"
{{#if_eq database "mongodb"}}
import { connect } from "./db"
{{/if_eq}}

{{#if_xor axios extraction "extraction"}}
alias.addAlias("@axios", `${__dirname}/axios.js`);
{{/if_xor}}

{{#if_eq database "mongodb"}}
connect()
  .then((error: any): void => {
    if (error) {
      console.error(error);
    } else {
      console.log("MongoDB connected!");
    }
  });
{{/if_eq}}
dotenv.config();

const app: Application = express();

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
app.use(cookieParser());
{{/if_xor}}
{{#if_xor bodyparser extraction "extraction"}}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
{{/if_xor}}
app.use(routes())

const PORT: number = +(process.env.PORT || 3000);

app.listen(PORT, (err?: any): void => {
  if (err) {
    console.error(err);
  } else {
    console.log(`⚡️App it running on port ${PORT}`);
  }
});

export default app