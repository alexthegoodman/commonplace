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
exports.CreateMessageMutation = exports.PostImpressionsQuery = exports.MessageType = void 0;
var client_1 = require("@prisma/client");
var nexus_1 = require("nexus");
var prisma = new client_1.PrismaClient();
exports.MessageType = (0, nexus_1.objectType)({
    name: "Message",
    definition: function (t) {
        t.model.type();
        t.model.content();
        t.model.user();
        t.model.post();
        // t.model.thread();
        t.model.readBy();
        t.model.updatedAt();
        t.model.createdAt();
    },
});
exports.PostImpressionsQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition: function (t) {
        var _this = this;
        t.nonNull.list.field("getPostImpressions", {
            type: "Message",
            args: {
                postTitle: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            resolve: function (_, _a, _b) {
                var postTitle = _a.postTitle;
                var PrismaClient = _b.prisma;
                return __awaiter(_this, void 0, void 0, function () {
                    var post, impressions;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, prisma.post.findUnique({
                                    where: {
                                        generatedTitleSlug: postTitle,
                                    },
                                })];
                            case 1:
                                post = _c.sent();
                                return [4 /*yield*/, prisma.message.findMany({
                                        where: {
                                            post: {
                                                id: post === null || post === void 0 ? void 0 : post.id,
                                            },
                                            type: "impression",
                                        },
                                    })];
                            case 2:
                                impressions = _c.sent();
                                console.info("Get impressions", postTitle, post, impressions);
                                return [2 /*return*/, impressions];
                        }
                    });
                });
            },
        });
    },
});
exports.CreateMessageMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition: function (t) {
        var _this = this;
        t.nonNull.field("createMessage", {
            type: "Message",
            args: {
                type: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                content: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                authorEmail: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                postCreatorEmail: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
                postId: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
                threadId: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
            },
            resolve: function (_, _a, _b) {
                var type = _a.type, content = _a.content, authorEmail = _a.authorEmail, postCreatorEmail = _a.postCreatorEmail, postId = _a.postId, threadId = _a.threadId;
                var PrismaClient = _b.prisma;
                return __awaiter(_this, void 0, void 0, function () {
                    var author, postCreator, message;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                console.info("createMessage", type, content, authorEmail, postCreatorEmail, threadId);
                                return [4 /*yield*/, prisma.user.findUnique({
                                        where: {
                                            email: authorEmail,
                                        },
                                    })];
                            case 1:
                                author = _c.sent();
                                if (!postCreatorEmail) return [3 /*break*/, 3];
                                return [4 /*yield*/, prisma.user.findUnique({
                                        where: {
                                            email: postCreatorEmail,
                                        },
                                    })];
                            case 2:
                                postCreator = _c.sent();
                                _c.label = 3;
                            case 3:
                                if (!(type === "reply" && threadId)) return [3 /*break*/, 5];
                                return [4 /*yield*/, prisma.message.create({
                                        data: {
                                            type: type,
                                            content: content,
                                            thread: {
                                                connect: {
                                                    id: threadId,
                                                },
                                            },
                                            user: {
                                                connect: {
                                                    id: author === null || author === void 0 ? void 0 : author.id,
                                                },
                                            },
                                        },
                                    })];
                            case 4:
                                message = _c.sent();
                                return [3 /*break*/, 7];
                            case 5:
                                if (!(type === "impression" && postCreatorEmail && postId)) return [3 /*break*/, 7];
                                return [4 /*yield*/, prisma.message.create({
                                        data: {
                                            type: type,
                                            content: content,
                                            post: {
                                                connect: {
                                                    id: postId,
                                                },
                                            },
                                            thread: {
                                                create: {
                                                    repliesAllowed: true,
                                                    users: {
                                                        connect: [{ id: author === null || author === void 0 ? void 0 : author.id }, { id: postCreator === null || postCreator === void 0 ? void 0 : postCreator.id }],
                                                    },
                                                },
                                            },
                                            user: {
                                                connect: {
                                                    id: author === null || author === void 0 ? void 0 : author.id,
                                                },
                                            },
                                        },
                                    })];
                            case 6:
                                message = _c.sent();
                                _c.label = 7;
                            case 7:
                                console.info("Created message", message);
                                return [2 /*return*/, message];
                        }
                    });
                });
            },
        });
    },
});
//# sourceMappingURL=Message.js.map