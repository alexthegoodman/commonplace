import Helpers from "./Helpers";
import Logs from "./Logs";
import ERROR_CODES from "./ERROR_CODES";

// const dotenv = require("dotenv");

// dotenv.config();

export default class Utilities {
  helpers;
  logs;
  ERROR_CODES;

  constructor() {
    this.helpers = new Helpers();
    this.logs = new Logs();
    this.ERROR_CODES = ERROR_CODES;
  }
}
