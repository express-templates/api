const path = require("path");
const fs = require("fs");

const {
  sortDependencies,
  installDependencies,
  printMessage,
} = require("./utils");
const pkg = require("./package.json");

const templateVersion = pkg.version;

module.exports = {
  metalsmith: {},
  helpers: {
    if_or(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    },
    exists(value, options) {
      if (value) {
        return options.fn(this);
      }

      return options.inverse(this);
    },
    if_xor(v1, v2, v3, options) {
      if (v1 || v2 === v3) {
        return options.fn(this);
      }

      return options.inverse(this);
    },
    if_ne(v1, v2, options) {
      if (v1 !== v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    },
    template_version() {
      return templateVersion;
    },
  },

  prompts: {
    name: {
      type: "string",
      required: true,
      message: "Project name",
    },
    description: {
      type: "string",
      required: false,
      message: "Project description",
      default: "A Express.js project",
    },
    author: {
      type: "string",
      message: "Author",
    },
    ts: {
      type: "confirm",
      message: "Use TypeScript?",
      default: false,
    },
    extraction: {
      type: "list",
      message: "Pick an mode API",
      choices: [
        {
          name: "Normal API",
          value: "normal",
          short: "normal",
        },
        {
          name: "Data extraction API",
          value: "extraction",
          short: "extraction",
        },
      ],
    },
    cors: {
      when: "extraction !== 'extraction'",
      type: "confirm",
      message: "Install cors?",
    },
    cookieparser: {
      when: "extraction !== 'extraction'",
      type: "confirm",
      message: "Install cookie-parser?",
    },
    axios: {
      when: "extraction !== 'extraction'",
      type: "confirm",
      message: "Install axios?",
      default: false,
    },
    jsdom: {
      when: "extraction !== 'extraction'",
      type: "confirm",
      message: "Install jsdom?",
      default: false,
    },
    useDatabase: {
      type: "confirm",
      message: "Use database?",
      default: false,
    },
    database: {
      when: "useDatabase",
      type: "list",
      message: "Pick an database preset",
      choices: [
        {
          name: "MySQL",
          value: "mysql",
          short: "MySQL",
        },
        {
          name: "MongoDB",
          value: "mongoose",
          short: "MongoDB",
        },
      ],
    },
    DB_MG_URL: {
      when: "useDatabase && database == 'mongoose'",
      type: "string",
      required: true,
      message: "Mongo Database connect?",
      default: "mongodb://localhost:27017",
    },
    DB_MG_NAME: {
      when: "useDatabase && database == 'mongoose'",
      type: "string",
      required: true,
      message: "Mongo Database name?",
    },
    DB_DATABASE: {
      when: "useDatabase && database == 'mysql'",
      type: "string",
      required: true,
      message: "Database name?",
    },
    DB_HOST: {
      when: "useDatabase && database == 'mysql'",
      type: "string",
      required: true,
      message: "Host database name?",
      default: "localhost",
    },
    DB_USER: {
      when: "useDatabase && database == 'mysql'",
      type: "string",
      required: true,
      message: "Username database name?",
      default: "root",
    },
    DB_PASSWORD: {
      when: "useDatabase && database == 'mysql'",
      type: "password",
      required: false,
      message: "Password database?",
      default: "",
    },
    DB_TIMEOUT: {
      when: "useDatabase && database == 'mysql'",
      type: "number",
      required: true,
      message: "Timeout query database?",
      default: 60000,
    },
    autoInstall: {
      type: "list",
      message:
        "Should we run `npm install` for you after the project has been created? (recommended)",
      choices: [
        {
          name: "Yes, use Yarn",
          value: "yarn",
          short: "yarn",
        },
        {
          name: "Yes, use NPM",
          value: "npm",
          short: "npm",
        },
        {
          name: "No, I will handle that myself",
          value: false,
          short: "no",
        },
      ],
    },
  },
  filters: {
    "db.*": "useDatabase",
    "axios.*": "extraction === 'extraction' || axios",
    "utils/index.*": "extraction === 'extraction' || jsdom",
    "tsconfig.json": "ts",
    "**/*.js": "ts === false",
    "**/*.ts": "ts",
    "typings/*": "ts",
    "models/*": 'database === "mongoose"',
    "schema/*": 'database === "mongoose"',
  },
  complete: function (data, { chalk }) {
    const green = chalk.green;

    sortDependencies(data, green);

    const cwd = path.join(process.cwd(), data.inPlace ? "" : data.destDirName);

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          printMessage(data, green);
        })
        .catch((e) => {
          console.log(chalk.red("Error:"), e);
        });
    } else {
      printMessage(data, chalk);
    }
  },
};
