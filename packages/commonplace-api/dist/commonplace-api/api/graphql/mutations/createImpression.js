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
exports.CreateImpressionMutation = void 0;
var nexus_1 = require("nexus");
var Mandrill_1 = __importDefault(require("../../../../commonplace-utilities/lib/Mandrill"));
exports.CreateImpressionMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition: function (t) {
        var _this = this;
        t.nonNull.field("createImpression", {
            type: "Message",
            args: {
                content: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                postCreatorUsername: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
                postId: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
            },
            resolve: function (_, _a, _b) {
                var content = _a.content, postCreatorUsername = _a.postCreatorUsername, postId = _a.postId;
                var prisma = _b.prisma, mixpanel = _b.mixpanel, currentUser = _b.currentUser;
                return __awaiter(_this, void 0, void 0, function () {
                    var mandrill, postCreator, message, checkMessage, newCredit, threadExists, addtData, emailUrl, buttonText;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                console.info("createMessage", content, postCreatorUsername);
                                mandrill = new Mandrill_1.default();
                                if (!postCreatorUsername) return [3 /*break*/, 2];
                                return [4 /*yield*/, prisma.user.findUnique({
                                        where: {
                                            generatedUsername: postCreatorUsername,
                                        },
                                    })];
                            case 1:
                                postCreator = _c.sent();
                                _c.label = 2;
                            case 2:
                                if (!(postCreatorUsername && postId)) return [3 /*break*/, 9];
                                return [4 /*yield*/, prisma.message.findFirst({
                                        where: {
                                            type: "impression",
                                            post: {
                                                id: postId,
                                            },
                                            user: {
                                                id: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
                                            },
                                        },
                                    })];
                            case 3:
                                checkMessage = _c.sent();
                                console.info("checkMessage", checkMessage);
                                if (!(checkMessage === null)) return [3 /*break*/, 7];
                                newCredit = (currentUser === null || currentUser === void 0 ? void 0 : currentUser.credit) + 1;
                                return [4 /*yield*/, prisma.user.update({
                                        where: {
                                            id: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
                                        },
                                        data: {
                                            credit: newCredit,
                                        },
                                    })];
                            case 4:
                                _c.sent();
                                return [4 /*yield*/, prisma.thread.findFirst({
                                        where: {
                                            users: {
                                                every: {
                                                    id: {
                                                        in: [currentUser === null || currentUser === void 0 ? void 0 : currentUser.id, postCreator === null || postCreator === void 0 ? void 0 : postCreator.id],
                                                    },
                                                },
                                            },
                                        },
                                    })];
                            case 5:
                                threadExists = _c.sent();
                                console.info("threadExists", threadExists);
                                addtData = {
                                    thread: {},
                                };
                                if (threadExists) {
                                    addtData = {
                                        thread: {
                                            connect: {
                                                id: threadExists === null || threadExists === void 0 ? void 0 : threadExists.id,
                                            },
                                        },
                                    };
                                }
                                else {
                                    addtData = {
                                        thread: {
                                            create: {
                                                repliesAllowed: true,
                                                users: {
                                                    connect: [
                                                        { id: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id },
                                                        { id: postCreator === null || postCreator === void 0 ? void 0 : postCreator.id },
                                                    ],
                                                },
                                            },
                                        },
                                    };
                                }
                                return [4 /*yield*/, prisma.message.create({
                                        data: __assign({ type: "impression", content: content, post: {
                                                connect: {
                                                    id: postId,
                                                },
                                            }, user: {
                                                connect: {
                                                    id: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
                                                },
                                            } }, addtData),
                                    })];
                            case 6:
                                message = _c.sent();
                                emailUrl = "https://commonplace.social/updates/" + message.threadId;
                                buttonText = "Open Thread";
                                mandrill.sendEmail(postCreator === null || postCreator === void 0 ? void 0 : postCreator.email, postCreator === null || postCreator === void 0 ? void 0 : postCreator.chosenUsername, "Feedback Received", "notification", [
                                    {
                                        name: "subject",
                                        content: "Feedback Received",
                                    },
                                    {
                                        name: "title",
                                        content: currentUser.chosenUsername + " gave you their impression",
                                    },
                                    {
                                        name: "body",
                                        content: "\"".concat(content, "\""),
                                    },
                                    {
                                        name: "notification-action-btn",
                                        content: "<a href=\"".concat(emailUrl, "\" class=\"btn\" style=\"background:#38f;border:none;border-radius:50px;box-shadow:none;color:#fff;cursor:pointer;display:block;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;height:auto;letter-spacing:.2px;line-height:18px;margin:0 auto 25px auto;max-width:360px;padding:11px 15px 12px 15px;text-align:center;text-decoration:none;text-transform:uppercase;width:80%\">").concat(buttonText, "</a>"),
                                    },
                                ]);
                                return [3 /*break*/, 8];
                            case 7: throw Error("Cannot give impression to same post twice");
                            case 8:
                                mixpanel.track("Impression Sent", {
                                    message: message,
                                    currentUser: currentUser,
                                    postCreator: postCreator,
                                });
                                _c.label = 9;
                            case 9:
                                console.info("Created message", message);
                                return [2 /*return*/, message];
                        }
                    });
                });
            },
        });
    },
});
//# sourceMappingURL=createImpression.js.map