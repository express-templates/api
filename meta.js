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
    if_in(v1, v2, options) {
      if (v2 in v1) {
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
      default: true,
    },
    packages: {
      type: "checkbox",
      message: "Select packages install:",
      choices: [
        {
          name: "Cors",
          value: "cors",
        },
        {
          name: "Axios",
          value: "axios",
        },
        {
          name: "JSDom",
          value: "jsdom",
        },
      ],
    },
    database: {
      type: "list",
      message: "Pick an database preset",
      choices: [
        {
          name: "None",
          value: null,
        },
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
      when: "database == 'mongoose'",
      type: "string",
      required: true,
      message: "Mongo Database connect?",
      default: "mongodb://localhost:27017",
    },
    DB_MG_NAME: {
      when: "database == 'mongoose'",
      type: "string",
      required: true,
      message: "Mongo Database name?",
    },
    DB_DATABASE: {
      when: "database == 'mysql'",
      type: "string",
      required: true,
      message: "Database name?",
    },
    DB_HOST: {
      when: "database == 'mysql'",
      type: "string",
      required: true,
      message: "Host database name?",
      default: "localhost",
    },
    DB_USER: {
      when: "database == 'mysql'",
      type: "string",
      required: true,
      message: "Username database name?",
      default: "root",
    },
    DB_PASSWORD: {
      when: "database == 'mysql'",
      type: "password",
      required: false,
      message: "Password database?",
      default: "",
    },
    DB_TIMEOUT: {
      when: "database == 'mysql'",
      type: "number",
      required: true,
      message: "Timeout query database?",
      default: 60000,
    },
  },
  filters: {
    "src/boot/database.*": "database !== null",
    "tsconfig.json": "ts",
    "**/*.js": "ts === false",
    "**/*.ts": "ts",
  },
};
