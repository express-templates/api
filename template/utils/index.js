const axios = require("../axios")
const { JSDOM } = require("jsdom")

exports.loadDOM = async (url, isDocument) => {
   if ( typeof url === "object" || isDocument ) {
      return new JSDOM(url).window.document
   }

   const { data } = axios.get(url)

   return new JSDOM(data).window.document
}