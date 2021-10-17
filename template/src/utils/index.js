const axios = require("../axios");
const { JSDOM } = require("jsdom");

exports.loadDOM = async (url, isDocument) => {
  if (typeof url === "object" || isDocument) {
    return new JSDOM(url).window.document;
  }

  const { data } = await axios.get(url);

  return new JSDOM(data).window.document;
};

exports.trim = (value) => {
  if (value == null) {
    return "";
  }

  return (value + "").replace(/^\s+|\s+$/g, "");
};
