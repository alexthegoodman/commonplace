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
var client_1 = require("@prisma/client");
var faker_1 = __importDefault(require("@faker-js/faker"));
var commonplace_utilities_1 = __importDefault(require("../../commonplace-utilities"));
var nanoid_1 = require("nanoid");
var prisma = new client_1.PrismaClient();
var profileImages = [
    "2022/09/ali-jouyandeh-bodgc6H44FA-unsplash-5DW97Z8rXK.jpg",
    "2022/09/deepak-rautela-4gM1CmY2qek-unsplash-P_7kOTJN3N.jpg",
    "2022/09/europeana-5TK1F5VfdIk-unsplash-Xzxh1YDfLv.jpg",
    "2022/09/europeana-L62U8oeBVgE-unsplash-QtrJ3UsfeZ.jpg",
    "2022/09/morgan-aragon-BFyTdSthQDA-unsplash-OEhxZL5RwY.jpg",
    "2022/09/nadine-burzler-FsXq3xu72bs-unsplash-1Z4sI3f1hR.jpg",
    "2022/09/prashant-saini-BeoRcYyVgxE-unsplash-9ZKrVR1Vg3.jpg",
    "2022/09/ruvim-noga-fyoGx76Cm7E-unsplash-RqVBCAtgF-.jpg",
    "2022/09/shuttergames-9BE8hiqvUM4-unsplash-IpoQ0BfHkU.jpg",
    "2022/09/thought-catalog-6tveVV8rRMo-unsplash-oWCDbuihSW.jpg",
];
var coverImages = [
    "2022/09/annie-spratt-PM4Vu1B0gxk-unsplash-3JZ433y5Mr.jpg",
    "2022/09/clark-tibbs-oqStl2L5oxI-unsplash-BOwRf2AP2F.jpg",
    "2022/09/freestocks-RgKmrxpIraY-unsplash-k97r_A7unw.jpg",
    "2022/09/gradienta-QWutu2BRpOs-unsplash-K4FrX5YEwx.jpg",
    "2022/09/jeet-dhanoa-XZgcJcBhSgM-unsplash-2bhN7xdOWu.jpg",
    "2022/09/jr-korpa-I0TaBAAwm9g-unsplash-tMt1idHmyw.jpg",
    "2022/09/markus-spiske-pZX9QPxeIQc-unsplash-plnCpohZfN.jpg",
    "2022/09/patrick-tomasso-QMDap1TAu0g-unsplash-XY3JPSLH0Y.jpg",
    "2022/09/simon-berger-twukN12EN7c-unsplash-t19qFqEgRp.jpg",
    "2022/09/vicko-mozara-m82uh_vamhg-unsplash-WkwbBFi2SR.jpg",
];
function seedUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var getDefaultUser, users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getDefaultUser = function () {
                        var utilities = new commonplace_utilities_1.default();
                        var email = "alexthegoodman+" + (0, nanoid_1.nanoid)() + "@gmail.com";
                        var generatedUsername = utilities.helpers.emailToUsername(email);
                        var randomInt1 = faker_1.default.random.numeric();
                        var randomInt2 = faker_1.default.random.numeric();
                        return {
                            email: email,
                            role: "USER",
                            generatedUsername: generatedUsername,
                            chosenUsername: generatedUsername,
                            profileImage: profileImages[randomInt1],
                            coverImage: coverImages[randomInt2],
                            password: "$2a$12$QG3qjuizq4bb24Gl2hhhSegdv7XHpv0nJrc1Fw/920gOMNSzn80A.",
                            favoriteInterestId: null,
                        };
                    };
                    return [4 /*yield*/, prisma.user.createMany({
                            data: [
                                __assign(__assign({}, getDefaultUser()), { email: "alexthegoodman@gmail.com", role: "ADMIN" }),
                                __assign(__assign({}, getDefaultUser()), { chosenUsername: "Color Gradienta" }),
                                __assign(__assign({}, getDefaultUser()), { chosenUsername: "Beijing Dishes" }),
                                __assign(__assign({}, getDefaultUser()), { chosenUsername: "dorvmachine" }),
                                __assign(__assign({}, getDefaultUser()), { chosenUsername: "amaksi" }),
                                __assign(__assign({}, getDefaultUser()), { chosenUsername: "endless future" }),
                                __assign(__assign({}, getDefaultUser()), { chosenUsername: "friendlycooker" }),
                                __assign(__assign({}, getDefaultUser()), { chosenUsername: "EverydayDrawing" }),
                                __assign(__assign({}, getDefaultUser()), { chosenUsername: "Leonell Cassio" }),
                                __assign(__assign({}, getDefaultUser()), { chosenUsername: "Cricket Master" }),
                            ],
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.findMany()];
                case 2:
                    users = _a.sent();
                    // console.info("users", users);
                    return [2 /*return*/, {
                            users: users,
                        }];
            }
        });
    });
}
exports.default = seedUsers;
//# sourceMappingURL=user.js.map