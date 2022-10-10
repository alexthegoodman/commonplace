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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Helpers = /** @class */ (function () {
    function Helpers() {
    }
    Helpers.prototype.createJWT = function (data) {
        var jwtSecretKey = process.env.JWT_SECRET_KEY;
        var jwtData = __assign({ time: Date() }, data);
        var jwtOptions = {
            expiresIn: "7d",
        };
        var token = jsonwebtoken_1.default.sign(jwtData, jwtSecretKey, jwtOptions);
        return token;
    };
    return Helpers;
}());
exports.default = Helpers;
//# sourceMappingURL=Helpers.js.map