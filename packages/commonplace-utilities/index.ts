import Helpers from "./lib/Helpers";
import Logs from "./lib/Logs";
import AWS from "./lib/AWS";
import ERROR_CODES from "./lib/ERROR_CODES";

// const dotenv = require("dotenv");

// dotenv.config();

export default class Utilities {
  helpers;
  logs;
  AWS;
  ERROR_CODES;

  constructor() {
    this.helpers = new Helpers();
    this.logs = new Logs();
    this.AWS = new AWS();
    this.ERROR_CODES = ERROR_CODES;
  }
}
