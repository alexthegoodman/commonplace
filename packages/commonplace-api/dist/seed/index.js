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
var user_1 = __importDefault(require("./user"));
var clean_1 = __importDefault(require("./clean"));
var client_1 = require("@prisma/client");
var post_1 = __importDefault(require("./post"));
var thread_1 = __importDefault(require("./thread"));
var interest_1 = __importDefault(require("./interest"));
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var users, _a, categories, interests, posts, _b, thread1, thread2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, user_1.default)()];
                case 1:
                    users = (_c.sent()).users;
                    return [4 /*yield*/, (0, interest_1.default)()];
                case 2:
                    _a = _c.sent(), categories = _a.categories, interests = _a.interests;
                    return [4 /*yield*/, (0, post_1.default)(users, interests)];
                case 3:
                    posts = (_c.sent()).posts;
                    return [4 /*yield*/, (0, post_1.default)(users, interests)];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, (0, post_1.default)(users, interests)];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, (0, post_1.default)(users, interests)];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, (0, post_1.default)(users, interests)];
                case 7:
                    _c.sent();
                    return [4 /*yield*/, (0, post_1.default)(users, interests)];
                case 8:
                    _c.sent();
                    return [4 /*yield*/, (0, thread_1.default)(users, posts)];
                case 9:
                    _b = _c.sent(), thread1 = _b.thread1, thread2 = _b.thread2;
                    return [2 /*return*/];
            }
        });
    });
}
(0, clean_1.default)()
    .catch(function (e) { return console.error(e); })
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.info("cleaned");
        // reload
        main()
            .catch(function (e) { return console.error(e); })
            .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.info("populated");
                        return [4 /*yield*/, prisma.$disconnect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=index.js.map