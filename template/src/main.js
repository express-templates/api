import { createApp } from "express-fw";
import path from "path";
import chalk from "chalk";
import express from "express";

const app = createApp();

// catch 404 and forward to error handler
app.use((req, res, next): void => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next): void => {
  console.error(chalk.red(err.message));
  res.end("Error");
});

app.use(express.static(path.join(__dirname, "..", "public")));

export default app; 