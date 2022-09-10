"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateQuery = void 0;
var nexus_1 = require("nexus");
var commonplace_utilities_1 = __importDefault(require("../../../../commonplace-utilities"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.AuthenticateQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition: function (t) {
        var _this = this;
        t.field("authenticate", {
            type: "String",
            args: {},
            resolve: function (_, _a, _b, x) {
                var prisma = _b.prisma, mixpanel = _b.mixpanel, req = _b.req;
                return __awaiter(_this, void 0, void 0, function () {
                    var utilities, credentials, email, password, user, data, token;
                    var _this = this;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                utilities = new commonplace_utilities_1.default();
                                credentials = utilities.helpers.parseAuthHeader(req.headers.authorization);
                                email = credentials[0];
                                password = credentials[1];
                                return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                        var user, error_1, match;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    utilities.logs.write(["Authentication Request ", email]);
                                                    _a.label = 1;
                                                case 1:
                                                    _a.trys.push([1, 3, , 4]);
                                                    return [4 /*yield*/, prisma.user.findUnique({
                                                            where: { email: email },
                                                        })];
                                                case 2:
                                                    user = _a.sent();
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    error_1 = _a.sent();
                                                    reject(error_1);
                                                    return [3 /*break*/, 4];
                                                case 4:
                                                    if (!utilities.helpers.isDefinedWithContent(user)) return [3 /*break*/, 6];
                                                    return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
                                                case 5:
                                                    match = _a.sent();
                                                    if (match) {
                                                        utilities.logs.write("Authentication Credentials Valid");
                                                        resolve(user);
                                                    }
                                                    else {
                                                        utilities.logs.write(utilities.ERROR_CODES.B003, "error");
                                                        reject(utilities.ERROR_CODES.B003);
                                                    }
                                                    return [3 /*break*/, 7];
                                                case 6:
                                                    utilities.logs.write(utilities.ERROR_CODES.C001, "error");
                                                    reject(utilities.ERROR_CODES.C001);
                                                    _a.label = 7;
                                                case 7: return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            case 1:
                                user = _c.sent();
                                utilities.logs.write(["Authenticate user", user]);
                                // TODO: set secure cookie tied to origin
                                mixpanel.track("Sign In - Complete");
                                data = {
                                    userId: user.id,
                                };
                                token = utilities.helpers.createJWT(data);
                                return [2 /*return*/, token];
                        }
                    });
                });
            },
        });
    },
});
//# sourceMappingURL=authenticate.js.map