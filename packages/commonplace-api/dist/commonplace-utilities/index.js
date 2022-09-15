"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Helpers_1 = __importDefault(require("./lib/Helpers"));
var Logs_1 = __importDefault(require("./lib/Logs"));
var ERROR_CODES_1 = __importDefault(require("./lib/ERROR_CODES"));
// const dotenv = require("dotenv");
// dotenv.config();
var Utilities = /** @class */ (function () {
    function Utilities() {
        this.helpers = new Helpers_1.default();
        this.logs = new Logs_1.default();
        this.ERROR_CODES = ERROR_CODES_1.default;
    }
    return Utilities;
}());
exports.default = Utilities;
//# sourceMappingURL=index.js.map