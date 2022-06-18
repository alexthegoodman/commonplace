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
exports.PostsByUsernameQuery = exports.PostByPostTitleQuery = exports.PostURLsQuery = exports.CreatePostMutation = exports.PostType = exports.PublicPostType = void 0;
var client_1 = require("@prisma/client");
var nanoid_1 = require("nanoid");
var nexus_1 = require("nexus");
var slugify_1 = __importDefault(require("slugify"));
var commonplace_utilities_1 = __importDefault(require("../../../commonplace-utilities"));
var prisma = new client_1.PrismaClient();
var publicPostFields = {
    id: true,
    title: true,
    description: true,
    generatedTitleSlug: true,
    contentType: true,
    contentPreview: true,
    content: true,
    interest: true,
    updatedAt: true,
    createdAt: true,
};
exports.PublicPostType = (0, nexus_1.objectType)({
    name: "PublicPost",
    definition: function (t) {
        t.field("id", { type: "String" });
        t.field("title", { type: "String" });
        t.field("description", { type: "String" });
        t.field("generatedTitleSlug", { type: "String" });
        t.field("contentType", { type: "String" });
        t.field("contentPreview", { type: "String" });
        t.field("content", { type: "String" });
        t.field("interest", { type: "Interest" });
        t.field("updatedAt", { type: "DateTime" });
        t.field("createdAt", { type: "DateTime" });
    },
});
exports.PostType = (0, nexus_1.objectType)({
    name: "Post",
    definition: function (t) {
        t.model.id();
        t.model.title();
        t.model.description();
        t.model.generatedTitleSlug();
        t.model.contentType();
        t.model.contentPreview();
        t.model.content();
        t.model.interest();
        // t.model.modifiers();
        t.model.creator();
        // t.model.threads();
        t.model.updatedAt();
        t.model.createdAt();
    },
});
exports.CreatePostMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition: function (t) {
        var _this = this;
        t.nonNull.field("createPost", {
            type: "Post",
            args: {
                creatorId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                interestId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                contentType: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                title: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                description: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                text: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
                file1Name: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
                file1Size: (0, nexus_1.nullable)((0, nexus_1.intArg)()),
                file1Type: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
                file1Data: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
                file2Name: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
                file2Size: (0, nexus_1.nullable)((0, nexus_1.intArg)()),
                file2Type: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
                file2Data: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
            },
            resolve: function (_, _a, _b) {
                var creatorId = _a.creatorId, interestId = _a.interestId, contentType = _a.contentType, title = _a.title, description = _a.description, text = _a.text, file1Name = _a.file1Name, file1Size = _a.file1Size, file1Type = _a.file1Type, file1Data = _a.file1Data, file2Name = _a.file2Name, file2Size = _a.file2Size, file2Type = _a.file2Type, file2Data = _a.file2Data;
                var PrismaClient = _b.prisma;
                return __awaiter(_this, void 0, void 0, function () {
                    var utilities, upload1Path, upload2Path, generatedTitleSlug, contentData, post, interest, creator, newCredit;
                    var _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                console.info("Create Post", creatorId, interestId, contentType, title, description, text, file1Name, file1Size, file1Type, file2Name, file2Size, file2Type);
                                utilities = new commonplace_utilities_1.default();
                                upload1Path = "";
                                if (!(file1Name && file1Data)) return [3 /*break*/, 2];
                                return [4 /*yield*/, utilities.AWS.uploadAsset(contentType, file1Name, file1Type, file1Size, file1Data)];
                            case 1:
                                upload1Path = _e.sent();
                                _e.label = 2;
                            case 2:
                                upload2Path = "";
                                if (!(file2Name && file2Data)) return [3 /*break*/, 4];
                                return [4 /*yield*/, utilities.AWS.uploadAsset("image", // file2 is always image
                                    file2Name, file2Type, file2Size, file2Data)];
                            case 3:
                                upload2Path = _e.sent();
                                _e.label = 4;
                            case 4:
                                generatedTitleSlug = (0, slugify_1.default)(title) + "-" + (0, nanoid_1.nanoid)(10);
                                console.info("generatedTitleSlug", upload1Path, upload2Path, generatedTitleSlug);
                                contentData = {
                                    contentPreview: upload2Path,
                                    content: upload1Path,
                                };
                                if (contentType === "text" && text) {
                                    contentData = {
                                        contentPreview: "",
                                        content: text,
                                    };
                                }
                                return [4 /*yield*/, prisma.post.create({
                                        data: __assign(__assign({ title: title, description: description, generatedTitleSlug: generatedTitleSlug, contentType: contentType }, contentData), { interest: {
                                                connect: {
                                                    id: interestId,
                                                },
                                            }, creator: {
                                                connect: {
                                                    id: creatorId,
                                                },
                                            } }),
                                    })];
                            case 5:
                                post = _e.sent();
                                return [4 /*yield*/, prisma.interest.findFirst({
                                        where: {
                                            id: interestId,
                                        },
                                        include: {
                                            posts: true,
                                        },
                                    })];
                            case 6:
                                interest = _e.sent();
                                console.info("create post, intersts", interestId, interest, (_c = interest === null || interest === void 0 ? void 0 : interest.posts) === null || _c === void 0 ? void 0 : _c.length);
                                if (!(interest && ((_d = interest === null || interest === void 0 ? void 0 : interest.posts) === null || _d === void 0 ? void 0 : _d.length) > 5)) return [3 /*break*/, 9];
                                return [4 /*yield*/, prisma.user.findFirst({
                                        where: {
                                            id: creatorId,
                                        },
                                    })];
                            case 7:
                                creator = _e.sent();
                                newCredit = (creator === null || creator === void 0 ? void 0 : creator.credit) - 3;
                                if (newCredit < 0) {
                                    throw Error("Not enough Credits");
                                }
                                return [4 /*yield*/, prisma.user.update({
                                        where: {
                                            id: creatorId,
                                        },
                                        data: {
                                            credit: newCredit,
                                        },
                                    })];
                            case 8:
                                _e.sent();
                                _e.label = 9;
                            case 9:
                                console.info("Created post", post);
                                return [2 /*return*/, post];
                        }
                    });
                });
            },
        });
    },
});
exports.PostURLsQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition: function (t) {
        var _this = this;
        t.list.field("getPostURLs", {
            type: "String",
            args: {},
            resolve: function (_, _a, _b) {
                var PrismaClient = _b.prisma;
                return __awaiter(_this, void 0, void 0, function () {
                    var slugs, urls;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, prisma.post.findMany({
                                    select: {
                                        generatedTitleSlug: true,
                                        interest: true,
                                    },
                                })];
                            case 1:
                                slugs = _c.sent();
                                urls = slugs.map(function (user, i) {
                                    return ("/" +
                                        user.interest.generatedInterestSlug +
                                        "/" +
                                        user.generatedTitleSlug);
                                });
                                console.info("getPostURLs", slugs, urls);
                                return [2 /*return*/, urls];
                        }
                    });
                });
            },
        });
    },
});
exports.PostByPostTitleQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition: function (t) {
        var _this = this;
        t.field("getPostByPostTitle", {
            type: "PublicPost",
            args: {
                postTitle: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            resolve: function (_, _a, _b) {
                var postTitle = _a.postTitle;
                var PrismaClient = _b.prisma;
                return __awaiter(_this, void 0, void 0, function () {
                    var post;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, prisma.post.findFirst({
                                    where: {
                                        generatedTitleSlug: postTitle,
                                    },
                                    select: publicPostFields,
                                })];
                            case 1:
                                post = _c.sent();
                                console.info("getPostsByPostTitle", postTitle, post);
                                return [2 /*return*/, post];
                        }
                    });
                });
            },
        });
    },
});
exports.PostsByUsernameQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition: function (t) {
        var _this = this;
        t.list.field("getPostsByUsername", {
            type: "PublicPost",
            args: {
                chosenUsername: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            resolve: function (_, _a, _b) {
                var chosenUsername = _a.chosenUsername;
                var PrismaClient = _b.prisma;
                return __awaiter(_this, void 0, void 0, function () {
                    var getUserId, posts;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, prisma.user.findUnique({
                                    where: {
                                        chosenUsername: chosenUsername,
                                    },
                                    select: {
                                        id: true,
                                    },
                                })];
                            case 1:
                                getUserId = _c.sent();
                                return [4 /*yield*/, prisma.post.findMany({
                                        where: {
                                            creator: {
                                                id: getUserId === null || getUserId === void 0 ? void 0 : getUserId.id,
                                            },
                                        },
                                        select: publicPostFields,
                                    })];
                            case 2:
                                posts = _c.sent();
                                console.info("getPostsByUsername", chosenUsername, posts);
                                return [2 /*return*/, posts];
                        }
                    });
                });
            },
        });
    },
});
//# sourceMappingURL=Post.js.map