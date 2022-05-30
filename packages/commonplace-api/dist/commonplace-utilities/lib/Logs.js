"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require("pretty-console-logs"), info = _a.info, warn = _a.warn, log = _a.log, error = _a.error, indent = _a.indent;
var Logs = /** @class */ (function () {
    function Logs() {
    }
    Logs.prototype.write = function (message, type, logging) {
        if (type === void 0) { type = "info"; }
        if (logging === void 0) { logging = true; }
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
    };
    return Logs;
}());
exports.default = Logs;
//# sourceMappingURL=Logs.js.map