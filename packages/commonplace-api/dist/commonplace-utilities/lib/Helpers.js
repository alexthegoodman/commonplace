"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nanoid_1 = require("nanoid");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
    Helpers.prototype.createJWT = function (data) {
        var jwtSecretKey = process.env.JWT_SECRET_KEY;
        var jwtData = __assign({ time: Date() }, data);
        var jwtOptions = {
            expiresIn: "7d",
        };
        var token = jsonwebtoken_1.default.sign(jwtData, jwtSecretKey, jwtOptions);
        return token;
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