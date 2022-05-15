import Helpers from "./lib/Helpers";
import Logs from "./lib/Logs";
import { ERROR_CODES } from "./lib/ERROR_CODES";

export default class Utilities {
  public helpers: Helpers;
  public logs: Logs;
  public ERROR_CODES;

  constructor() {
    this.helpers = new Helpers();
    this.logs = new Logs();
    this.ERROR_CODES = ERROR_CODES;
  }
}
