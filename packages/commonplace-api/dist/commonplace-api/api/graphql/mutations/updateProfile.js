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
exports.UpdateProfileMutation = void 0;
var nexus_1 = require("nexus");
var commonplace_utilities_1 = __importDefault(require("../../../../commonplace-utilities"));
exports.UpdateProfileMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition: function (t) {
        var _this = this;
        t.nonNull.field("updateProfile", {
            type: "String",
            args: {
                username: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                profileImageName: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
                profileImageSize: (0, nexus_1.nullable)((0, nexus_1.intArg)()),
                profileImageType: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
                profileImageData: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
                coverImageName: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
                coverImageSize: (0, nexus_1.nullable)((0, nexus_1.intArg)()),
                coverImageType: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
                coverImageData: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
            },
            resolve: function (_, _a, _b) {
                var username = _a.username, profileImageName = _a.profileImageName, profileImageSize = _a.profileImageSize, profileImageType = _a.profileImageType, profileImageData = _a.profileImageData, coverImageName = _a.coverImageName, coverImageSize = _a.coverImageSize, coverImageType = _a.coverImageType, coverImageData = _a.coverImageData;
                var prisma = _b.prisma, mixpanel = _b.mixpanel, currentUser = _b.currentUser;
                return __awaiter(_this, void 0, void 0, function () {
                    var utilities, upload1Path, upload2Path, addtData, updatedUser;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                utilities = new commonplace_utilities_1.default();
                                upload1Path = "";
                                if (!(profileImageName && profileImageData)) return [3 /*break*/, 2];
                                return [4 /*yield*/, utilities.AWS.uploadAsset("image", profileImageName, profileImageType, profileImageSize, profileImageData)];
                            case 1:
                                upload1Path = _c.sent();
                                _c.label = 2;
                            case 2:
                                upload2Path = "";
                                if (!(coverImageName && coverImageData)) return [3 /*break*/, 4];
                                return [4 /*yield*/, utilities.AWS.uploadAsset("image", // file2 is always image
                                    coverImageName, coverImageType, coverImageSize, coverImageData)];
                            case 3:
                                upload2Path = _c.sent();
                                _c.label = 4;
                            case 4:
                                addtData = {};
                                if (upload1Path !== "") {
                                    addtData = __assign(__assign({}, addtData), { profileImage: upload1Path });
                                }
                                if (upload2Path !== "") {
                                    addtData = __assign(__assign({}, addtData), { coverImage: upload2Path });
                                }
                                return [4 /*yield*/, prisma.user.update({
                                        where: {
                                            id: currentUser.id,
                                        },
                                        data: __assign({ chosenUsername: username }, addtData),
                                    })];
                            case 5:
                                updatedUser = _c.sent();
                                return [2 /*return*/, updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.id];
                        }
                    });
                });
            },
        });
    },
});
//# sourceMappingURL=updateProfile.js.map