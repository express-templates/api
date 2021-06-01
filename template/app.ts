import express, { Application, NextFunction, Request, Response } from "express";
import createError from "http-errors";
import chalk from "chalk";
import debug from "debug";
{{#morgan}}
import morgan from "morgan";
{{/morgan}}
{{#helmet}}
import helmet from "helmet";
{{/helmet}}
{{#if_xor cors extraction "extraction"}}
import cors from "cors";
{{/if_xor}}
{{#if_xor cookieparser extraction "extraction"}}
import cookieParser from "cookie-parser";
{{/if_xor}}
import express_import_routes from "express-import-routes";
{{#if_xor axios extraction "extraction"}}
import alias from "module-alias";
{{/if_xor}}
import dotenv from "dotenv";
{{#if_eq database "mongoose"}}
import db from "./db";
{{/if_eq}}

{{#if_xor axios extraction "extraction"}}
alias.addAlias("@axios", `${__dirname}/axios.js`);
{{/if_xor}}

{{#if_eq database "mongoose"}}
db.connect().then(() => {
  console.log(chalk.blue("MongoDB connected!"));
});
{{/if_eq}}
dotenv.config();

const app: Application = express();

const debuger = debug("web:server");

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express_import_routes());

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction): void => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(chalk.red(err.message));
  res.end("Error");
});

const PORT: number = +(process.env.PORT || 3000);

app.listen(PORT, (err?: any): void => {
  if (err) {
    console.error(err);
  } else {
    debuger(`⚡️App it running on port ${PORT}`);
  }
});

export default app;