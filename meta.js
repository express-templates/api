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
    morgan: {
      type: "confirm",
      message: "Install morgan?",
    },
    helmet: {
      type: "confirm",
      message: "Install helmet?",
    },
    cors: {
      type: "confirm",
      message: "Install cors?",
    },
    bodyparser: {
      type: "confirm",
      message: "Install body-parser?",
    },
    cookieparser: {
      type: "confirm",
      message: "Install cookie-parser?",
    },
    useDatabase: {
      type: "confirm",
      message: "Use database?",
      default: "no",
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
          value: "mongodb",
          short: "MongoDB",
        },
      ],
    },
    DB_DATABASE: {
      when: "useDatabase",
      type: "string",
      required: true,
      message: "Database name?",
      default: "{{ name }}",
    },
    DB_HOST: {
      when: "useDatabase",
      type: "string",
      required: true,
      message: "Host database name?",
      default: "localhost",
    },
    DB_USER: {
      when: "useDatabase",
      type: "string",
      required: true,
      message: "Username database name?",
      default: "root",
    },
    DB_PASSWORD: {
      when: "useDatabase",
      type: "string",
      required: true,
      message: 'Password database "{{DB_USER}}"?',
      default: "",
    },
    DB_PORT: {
      when: "useDatabase",
      type: "string",
      required: true,
      message: "Port database?",
      default: "3306",
    },
    DB_TIMEOUT: {
      when: "useDatabase",
      type: "string",
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
    "db.js": "useDatabase",
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
