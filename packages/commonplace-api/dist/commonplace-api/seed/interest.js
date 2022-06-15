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
var client_1 = require("@prisma/client");
var faker_1 = __importDefault(require("@faker-js/faker"));
var slugify_1 = __importDefault(require("slugify"));
var prisma = new client_1.PrismaClient();
function seedInterests() {
    return __awaiter(this, void 0, void 0, function () {
        var getDefaultCategory, category1, category2, category3, getDefaultInterest, interest1, interest2, interest3, interest4, interest5, interest6, interest7, interest8, interest9, interest10, interests;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getDefaultCategory = function () {
                        var name = faker_1.default.lorem.words();
                        var generatedCategorySlug = (0, slugify_1.default)(name);
                        return {
                            name: name,
                            generatedCategorySlug: generatedCategorySlug,
                        };
                    };
                    return [4 /*yield*/, prisma.category.create({
                            data: getDefaultCategory(),
                        })];
                case 1:
                    category1 = _a.sent();
                    return [4 /*yield*/, prisma.category.create({
                            data: getDefaultCategory(),
                        })];
                case 2:
                    category2 = _a.sent();
                    return [4 /*yield*/, prisma.category.create({
                            data: getDefaultCategory(),
                        })];
                case 3:
                    category3 = _a.sent();
                    getDefaultInterest = function (category) {
                        var name = faker_1.default.lorem.words();
                        var generatedInterestSlug = (0, slugify_1.default)(name);
                        return {
                            name: name,
                            generatedInterestSlug: generatedInterestSlug,
                            contentType: "",
                            categories: {
                                connect: {
                                    id: category.id,
                                },
                            },
                        };
                    };
                    return [4 /*yield*/, prisma.interest.create({
                            data: getDefaultInterest(category1),
                        })];
                case 4:
                    interest1 = _a.sent();
                    return [4 /*yield*/, prisma.interest.create({
                            data: getDefaultInterest(category2),
                        })];
                case 5:
                    interest2 = _a.sent();
                    return [4 /*yield*/, prisma.interest.create({
                            data: getDefaultInterest(category3),
                        })];
                case 6:
                    interest3 = _a.sent();
                    return [4 /*yield*/, prisma.interest.create({
                            data: getDefaultInterest(category1),
                        })];
                case 7:
                    interest4 = _a.sent();
                    return [4 /*yield*/, prisma.interest.create({
                            data: getDefaultInterest(category1),
                        })];
                case 8:
                    interest5 = _a.sent();
                    return [4 /*yield*/, prisma.interest.create({
                            data: getDefaultInterest(category2),
                        })];
                case 9:
                    interest6 = _a.sent();
                    return [4 /*yield*/, prisma.interest.create({
                            data: getDefaultInterest(category3),
                        })];
                case 10:
                    interest7 = _a.sent();
                    return [4 /*yield*/, prisma.interest.create({
                            data: getDefaultInterest(category1),
                        })];
                case 11:
                    interest8 = _a.sent();
                    return [4 /*yield*/, prisma.interest.create({
                            data: getDefaultInterest(category3),
                        })];
                case 12:
                    interest9 = _a.sent();
                    return [4 /*yield*/, prisma.interest.create({
                            data: getDefaultInterest(category1),
                        })];
                case 13:
                    interest10 = _a.sent();
                    return [4 /*yield*/, prisma.interest.findMany()];
                case 14:
                    interests = _a.sent();
                    return [2 /*return*/, {
                            interests: interests,
                        }];
            }
        });
    });
}
exports.default = seedInterests;
//# sourceMappingURL=interest.js.map