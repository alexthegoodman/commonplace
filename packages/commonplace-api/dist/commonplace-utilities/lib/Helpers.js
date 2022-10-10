"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nanoid_1 = require("nanoid");
var Helpers = /** @class */ (function () {
    function Helpers() {
    }
    Helpers.prototype.isDefinedWithContent = function (item) {
        if (typeof item !== "undefined" && item && item !== "" && item !== null) {
            if (item.constructor === Array && item.length > 0) {
                return true;
            }
            else if (item.constructor === Array && item.length === 0) {
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    };
    Helpers.prototype.parseCookie = function (str) {
        if (str && typeof str !== "undefined") {
            return str
                .split(";")
                .map(function (v) { return v.split("="); })
                .reduce(function (acc, v) {
                acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
                return acc;
            }, {});
        }
        else {
            return {};
        }
    };
    Helpers.prototype.parseAuthHeader = function (str) {
        var credentials = Buffer.from(str.split("Basic ")[1], "base64").toString("ascii");
        return credentials.split(":");
    };
    Helpers.prototype.createAuthHeader = function (str) {
        var authPayload = Buffer.from("".concat(str), "utf8").toString("base64");
        return "Basic ".concat(authPayload);
    };
    Helpers.prototype.emailToUsername = function (email) {
        var emailUsername = email.split("@")[0];
        var pin = (0, nanoid_1.nanoid)(10);
        var generatedUsername = emailUsername + "-" + pin;
        return generatedUsername;
    };
    return Helpers;
}());
exports.default = Helpers;
//# sourceMappingURL=Helpers.js.map