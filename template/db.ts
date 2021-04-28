{{#if_eq database "mysql"}}
import mysql from "mysql";
import { Connection, Query, QueryOptions } from "@types/mysql";
{{/if_eq}}
{{#if_eq database "mongodb"}}
import mongoose from "mongoose";
import { MongoClientOptions, MongoClient } from "@types/mongoose";
{{/if_eq}}

function mergeOptions(options: string|object, defaults: {
  timeout?: number|string;
  [propName: string]: any
}): object {
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

{{#if_eq database "mysql"}}
const _connect: Connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

export const connect = (): Promise<Connection> => {
  return new Promise((resolve, reject): void => {
    _connect.connect((error): void => {
      if (error) {
        reject(error);
      } else {
        resolve(connect);
      }
    });
  });
};

export const close = (connect: Connection): Promise<Connection> => {
  return new Promise((resolve, reject) => {
    connect.end((error): void => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

export const escape = (sql: string): string => {
  return _connect.escape(sql);
};

export const query = async (options: string|QueryOptions|Query, params?: any): Query => {
  const db: Connection = await connect();

  return new Promise((resolve, reject): void => {
    db.query(
      mergeOptions(options, {
        timeout: process.env.DB_TIMEOUT,
      }),
      params,
      (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          if (arguments.length >= 3) {
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

        close(db);
      }
    );
  });
};
{{/if_eq}}
{{#if_eq database "mongodb"}}
export const connect = async (options?: MongoClientOptions): MongoClient => {
   return await mongoose.connect(
     `mongodb://{{DB_USER}}:{{DB_PASSWORD}}@{{DB_HOST}}:{{DB_PORT}}/{{DB_DATABASE}}`,
     mergeOptions(options, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useFindAndModify: false,
       useCreateIndex: true,
     })
   );
 }; 
{{/if_eq}}