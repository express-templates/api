import cookieParser from "cookie-parser";
import { boot } from "express-fw";
import express from "express";
{{#if_in packages "cors"}}
import cors from "cors";
{{/if_in}} 
import helmet from "helmet";
import createError from "http-errors";
import alias from "module-alias";
import morgan from "morgan";

export default boot(() => {
  return [
    morgan("dev"),
    helmet(),{{#if_in packages "cors"}}
    cors(),{{/if_in}}
    cookieParser(), 
    express.urlencoded({ extended: true }),
    express.json(),
  ]
});