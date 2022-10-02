const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    // https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    locales: ["en", "bn"],
    localePath: path.resolve("./public/locales"),
  },
};
