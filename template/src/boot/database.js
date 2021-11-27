{{#if_eq database "mysql"}}
const mysql = require("mysql");
const chalk = require("chalk");

function mergeOptions(options, defaults) {
  if (options === null || typeof options !== "object") {
    options = {
      sql: options,
    };
  }

  return {
    ...defaults,
    ...options,
  };
}

const connect = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

exports.connect = () => {
  return new Promise((resolve, reject) => {
    connect.connect((error) => {
      if (error) {
        reject(error);
      } else {
        resolve(connect);
      }
    });
  });
};

exports.close = (connect) => {
  return new Promise((resolve, reject) => {
    connect.end((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

exports.escape = (sql) => {
  return connect.escape(sql);
};

exports.query = async (options, params) => {
  const db = await exports.connect();

  return new Promise((resolve, reject) => {
    db.query(
      mergeOptions(options, {
        timeout: process.env.DB_TIMEOUT,
      }),
      params,
      (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          if (fields !== undefined) {
            resolve({
              results: [...results],
              fields,
            });
          } else {
            resolve({
              fields,
            });
          }
        }

        exports.close(db);
      }
    );
  });
};
{{/if_eq}}
{{#if_eq database "mongoose"}}
const mongoose = require("mongoose")

connect = async () => {
  return await mongoose.connect("{{ DB_MG_URL }}/{{ DB_MG_NAME }}", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};
connect().then(() => {
  console.log(chalk.blue("MongoDB connected!"));
});
{{/if_eq}}