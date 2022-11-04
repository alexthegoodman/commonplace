const { info, warn, log, error, indent } = require("pretty-console-logs");

export default class Logs {
  constructor() {}

  write(message, type = "info", logging = true) {
    if (logging) {
      switch (type) {
        case "info":
          info(message);
          break;
        case "warn":
          warn(message);
          break;
        case "error":
          error(message);
          break;
        case "indent":
          indent(message);
          break;
      }
    }
  }
}
