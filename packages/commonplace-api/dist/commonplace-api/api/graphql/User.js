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
exports.RegisterUserQuery = exports.AuthenticateQuery = exports.UserByPostTitleQuery = exports.UserByUsernameQuery = exports.UserQuery = exports.UserType = exports.PublicUserType = void 0;
var client_1 = require("@prisma/client");
var nexus_1 = require("nexus");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var commonplace_utilities_1 = __importDefault(require("../../../commonplace-utilities"));
var prisma = new client_1.PrismaClient();
var publicUserFields = {
    name: true,
    generatedUsername: true,
    chosenUsername: true,
    profileImage: true,
    coverImage: true,
};
exports.PublicUserType = (0, nexus_1.objectType)({
    name: "PublicUser",
    definition: function (t) {
        t.field("name", { type: "String" });
        t.field("generatedUsername", { type: "String" });
        t.field("chosenUsername", { type: "String" });
        t.field("profileImage", { type: "String" });
        t.field("coverImage", { type: "String" });
    },
});
exports.UserType = (0, nexus_1.objectType)({
    name: "User",
    definition: function (t) {
        t.model.name();
        t.model.generatedUsername();
        t.model.chosenUsername();
        t.model.profileImage();
        t.model.coverImage();
        t.model.posts({
            filtering: false,
            ordering: false,
            pagination: false,
        });
        t.model.updatedAt();
        t.model.createdAt();
        // ** Protected **//
        // t.string("id"); // do not expose
        t.model.email();
        t.model.credit();
        t.model.threads({ ordering: true, filtering: true });
        // t.model.messages();
        // t.model.readMessages();
    },
});
exports.UserQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition: function (t) {
        var _this = this;
        t.field("user", {
            type: "User",
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            resolve: function (_, _a, _b) {
                var id = _a.id;
                var PrismaClient = _b.prisma;
                return __awaiter(_this, void 0, void 0, function () {
                    var user;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, prisma.user.findUnique({
                                    where: {
                                        id: id,
                                    },
                                })];
                            case 1:
                                user = _c.sent();
                                console.info("Get user", id, user);
                                return [2 /*return*/, user];
                        }
                    });
                });
            },
        });
    },
});
exports.UserByUsernameQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition: function (t) {
        var _this = this;
        t.field("getUserByUsername", {
            type: "PublicUser",
            args: {
                chosenUsername: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            resolve: function (_, _a, _b) {
                var chosenUsername = _a.chosenUsername;
                var PrismaClient = _b.prisma;
                return __awaiter(_this, void 0, void 0, function () {
                    var user;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, prisma.user.findFirst({
                                    where: {
                                        chosenUsername: chosenUsername,
                                    },
                                    select: publicUserFields,
                                })];
                            case 1:
                                user = _c.sent();
                                console.info("getUserByUsername", chosenUsername, user);
                                return [2 /*return*/, user];
                        }
                    });
                });
            },
        });
    },
});
exports.UserByPostTitleQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition: function (t) {
        var _this = this;
        t.field("getUserByPostTitle", {
            type: "PublicUser",
            args: {
                postTitle: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            resolve: function (_, _a, _b) {
                var postTitle = _a.postTitle;
                var PrismaClient = _b.prisma;
                return __awaiter(_this, void 0, void 0, function () {
                    var getPostByTitle, user;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, prisma.post.findFirst({
                                    where: {
                                        generatedTitleSlug: postTitle,
                                    },
                                    select: {
                                        id: true,
                                    },
                                })];
                            case 1:
                                getPostByTitle = _c.sent();
                                console.info("getPostByTitle", getPostByTitle);
                                return [4 /*yield*/, prisma.user.findFirst({
                                        where: {
                                            posts: {
                                                some: {
                                                    id: getPostByTitle === null || getPostByTitle === void 0 ? void 0 : getPostByTitle.id,
                                                },
                                            },
                                        },
                                        select: publicUserFields,
                                    })];
                            case 2:
                                user = _c.sent();
                                console.info("getUserByPostTitle", postTitle, user);
                                return [2 /*return*/, user];
                        }
                    });
                });
            },
        });
    },
});
exports.AuthenticateQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition: function (t) {
        var _this = this;
        t.nonNull.field("authenticate", {
            type: "String",
            args: {
                email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                password: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            resolve: function (_, _a) {
                var email = _a.email, password = _a.password;
                return __awaiter(_this, void 0, void 0, function () {
                    var utilities, user;
                    var _this = this;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                utilities = new commonplace_utilities_1.default();
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
                                user = _b.sent();
                                utilities.logs.write(["Authenticate user", user]);
                                // TODO: encrypt with JWT
                                // TODO: set secure cookie tied to origin
                                return [2 /*return*/, user.id];
                        }
                    });
                });
            },
        });
    },
});
exports.RegisterUserQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition: function (t) {
        var _this = this;
        t.nonNull.field("registerUser", {
            type: "String",
            args: {
                email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                password: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            resolve: function (_, _a) {
                var email = _a.email, password = _a.password;
                return __awaiter(_this, void 0, void 0, function () {
                    var utilities, user;
                    var _this = this;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                utilities = new commonplace_utilities_1.default();
                                return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            utilities.logs.write(["Register User Incoming Request ", email]);
                                            bcryptjs_1.default.hash(password, 12, function (err, hash) { return __awaiter(_this, void 0, void 0, function () {
                                                var generatedUsername, newUser, error_2;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!utilities.helpers.isDefinedWithContent(hash)) return [3 /*break*/, 5];
                                                            generatedUsername = utilities.helpers.emailToUsername(email);
                                                            newUser = void 0;
                                                            _a.label = 1;
                                                        case 1:
                                                            _a.trys.push([1, 3, , 4]);
                                                            return [4 /*yield*/, prisma.user.create({
                                                                    data: {
                                                                        email: email,
                                                                        password: hash,
                                                                        generatedUsername: generatedUsername,
                                                                        chosenUsername: generatedUsername,
                                                                    },
                                                                })];
                                                        case 2:
                                                            newUser = _a.sent();
                                                            return [3 /*break*/, 4];
                                                        case 3:
                                                            error_2 = _a.sent();
                                                            reject(utilities.ERROR_CODES.C008);
                                                            return [3 /*break*/, 4];
                                                        case 4:
                                                            // TODO: mandrill
                                                            // TODO: mailchimp list
                                                            // TODO: mixpanel
                                                            resolve(newUser);
                                                            return [3 /*break*/, 6];
                                                        case 5:
                                                            reject(utilities.ERROR_CODES.C005);
                                                            _a.label = 6;
                                                        case 6: return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            return [2 /*return*/];
                                        });
                                    }); })];
                            case 1:
                                user = _b.sent();
                                utilities.logs.write(["Register user", user]);
                                // TODO: encrypt with JWT
                                // TODO: set secure cookie tied to origin
                                return [2 /*return*/, user.id];
                        }
                    });
                });
            },
        });
    },
});
//# sourceMappingURL=User.js.map