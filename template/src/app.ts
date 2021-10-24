import path from "path";

import chalk from "chalk";
import cookieParser from "cookie-parser";
{{#if_xor cors extraction "extraction"}}
import cors from "cors";
{{/if_xor}}
import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import express_import_routes, { setSrcRoot } from "express-import-routes";
import helmet from "helmet";
import createError from "http-errors";
import alias from "module-alias";
import morgan from "morgan";

{{#if_eq database "mongoose"}}
import db from "./db";

{{/if_eq}}
alias.addAlias("src", __dirname);
{{#if_eq database "mongoose"}}

db.connect().then(() => {
  console.log(chalk.blue("MongoDB connected!"));
});
{{/if_eq}}
dotenv.config();
setSrcRoot(__dirname);

const app: Application = express();

app.use(morgan("dev"));
app.use(helmet());
{{#if_xor cors extraction "extraction"}}
app.use(cors());
{{/if_xor}}
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express_import_routes());

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction): void => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(chalk.red(err.message));
  res.end("Error");
});

app.use(express.static(path.join(__dirname, "..", "public")));

const PORT: number = +(process.env.PORT || 3000);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.listen(PORT, (err?: any): void => {
  if (err) {
    console.error(err);
  } else {
    console.log(`⚡️App it running on port ${PORT}`);
  }
});

export default app;