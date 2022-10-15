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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagePostType = exports.PostType = exports.PublicPostType = exports.publicPostFields = void 0;
var nexus_1 = require("nexus");
exports.publicPostFields = {
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
        var _this = this;
        t.field("id", { type: "String" });
        t.field("title", { type: "String" });
        t.field("description", { type: "String" });
        t.field("generatedTitleSlug", { type: "String" });
        t.field("contentType", { type: "String" });
        t.field("contentPreview", { type: "String" });
        t.field("content", { type: "String" });
        // t.model.interest();
        t.field("interest", {
            type: "Interest",
            resolve: function (post, __, context) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, context.prisma.interest.findFirst({
                                where: {
                                    posts: {
                                        some: {
                                            id: post.id,
                                        },
                                    },
                                },
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
        });
        // t.model.creator();
        t.field("creator", {
            type: "PublicUser",
            resolve: function (post, __, context) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, context.prisma.user.findFirst({
                                where: {
                                    posts: {
                                        some: {
                                            id: post.id,
                                        },
                                    },
                                },
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
        });
        // t.list.field("messages", {
        //   type: "Message",
        //   resolve: async (post, __, context: Context) => {
        //     return await context.prisma.message.findMany({
        //       where: {
        //         post: {
        //           id: post.id as string,
        //         },
        //       },
        //     });
        //   },
        // });
        t.field("updatedAt", {
            type: "DateTime",
        });
        t.field("createdAt", {
            type: "DateTime",
        });
    },
});
exports.ManagePostType = (0, nexus_1.objectType)({
    name: "ManagePost",
    definition: function (t) {
        var _this = this;
        t.field("id", { type: "String" });
        t.field("title", { type: "String" });
        t.field("description", { type: "String" });
        t.field("generatedTitleSlug", { type: "String" });
        t.field("contentType", { type: "String" });
        t.field("contentPreview", { type: "String" });
        t.field("content", { type: "String" });
        // t.model.interest();
        t.field("interest", {
            type: "Interest",
            resolve: function (post, __, context) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, context.prisma.interest.findFirst({
                                where: {
                                    posts: {
                                        some: {
                                            id: post.id,
                                        },
                                    },
                                },
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
        });
        // t.model.creator();
        t.field("creator", {
            type: "User",
            resolve: function (post, __, context) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, context.prisma.user.findFirst({
                                where: {
                                    posts: {
                                        some: {
                                            id: post.id,
                                        },
                                    },
                                },
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
        });
        t.list.field("messages", {
            type: "Message",
            resolve: function (post, __, context) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, context.prisma.message.findMany({
                                where: {
                                    post: {
                                        id: post.id,
                                    },
                                },
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
        });
        t.field("updatedAt", {
            type: "DateTime",
        });
        t.field("createdAt", {
            type: "DateTime",
        });
    },
});
//# sourceMappingURL=Post.js.map