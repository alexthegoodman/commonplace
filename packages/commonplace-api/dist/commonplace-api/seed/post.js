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
exports.testImages = exports.cloudfrontUrl = void 0;
var client_1 = require("@prisma/client");
var faker_1 = __importDefault(require("@faker-js/faker"));
var slugify_1 = __importDefault(require("slugify"));
var prisma = new client_1.PrismaClient();
exports.cloudfrontUrl = "https://d3ubks77jdbtp7.cloudfront.net";
exports.testImages = [
    "2022/06/courtney-cook-SsIIw_MET0E-unsplash-JzSY6496hv.jpg",
    "2022/06/jr-korpa-ma_PlENP8RE-unsplash-G3eVlSq2RL.jpg",
    "2022/06/melanie-kreutz-IFnknR2Mv5o-unsplash-C3wXqnvF55.jpg",
    "2022/06/nicola-powys-oz7w_okbI0Q-unsplash-OamYSkHP4H.jpg",
    "2022/06/xiaolong-wong-nibgG33H0F8-unsplash-6qv5c390cP.jpg",
    "2022/06/courtney-cook-SsIIw_MET0E-unsplash-JzSY6496hv.jpg",
    "2022/06/jr-korpa-ma_PlENP8RE-unsplash-G3eVlSq2RL.jpg",
    "2022/06/melanie-kreutz-IFnknR2Mv5o-unsplash-C3wXqnvF55.jpg",
    "2022/06/nicola-powys-oz7w_okbI0Q-unsplash-OamYSkHP4H.jpg",
    "2022/06/xiaolong-wong-nibgG33H0F8-unsplash-6qv5c390cP.jpg",
];
function seedPosts(users, interests) {
    return __awaiter(this, void 0, void 0, function () {
        var getDefaultPost, posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getDefaultPost = function (rep1, rep2) {
                        if (rep1 === void 0) { rep1 = -1; }
                        if (rep2 === void 0) { rep2 = -1; }
                        var randomInt1 = rep1 !== -1 ? rep1 : faker_1.default.random.numeric();
                        var randomInt2 = rep2 !== -1 ? rep2 : faker_1.default.random.numeric();
                        // const contentSearch = "design";
                        // const contentHeight = parseInt(faker.random.numeric(3)) + 300;
                        var title = faker_1.default.lorem.words();
                        var generatedTitleSlug = (0, slugify_1.default)(title);
                        var content = exports.testImages[randomInt2];
                        return {
                            title: title,
                            description: faker_1.default.lorem.lines(),
                            contentType: "image",
                            contentPreview: "",
                            generatedTitleSlug: generatedTitleSlug,
                            // content: faker.image.imageUrl(800, contentHeight, contentSearch),
                            content: content,
                            interestId: interests[randomInt1].id,
                            creatorId: users[randomInt2].id,
                        };
                    };
                    return [4 /*yield*/, prisma.post.createMany({
                            data: [
                                getDefaultPost(),
                                getDefaultPost(),
                                getDefaultPost(),
                                getDefaultPost(),
                                // {
                                //   ...getDefaultPost(0, 0),
                                //   contentType: "video",
                                //   contentPreview: "", // TODO: add for video?
                                //   content: "http://localhost:3000/test/cheetah.mp4",
                                // },
                                // {
                                //   ...getDefaultPost(1, 0),
                                //   contentType: "image",
                                //   contentPreview: "",
                                //   content: "http://localhost:3000/test/cheetahPoster.jpeg",
                                // },
                                // {
                                //   ...getDefaultPost(1, 0),
                                //   contentType: "audio",
                                //   contentPreview: "http://localhost:3000/test/cheetahPoster.jpeg",
                                //   content: "http://localhost:3000/test/cheetah.mp3",
                                // },
                                // {
                                //   ...getDefaultPost(),
                                //   contentType: "text",
                                //   contentPreview: "",
                                //   content: `greetings \n\nthis is a poem \n\nwith many words of kindness and wishes of wisdom \nand good things \n\nthank you`,
                                // },
                                getDefaultPost(),
                                getDefaultPost(),
                                getDefaultPost(),
                                getDefaultPost(),
                                getDefaultPost(),
                                getDefaultPost(),
                                getDefaultPost(),
                                getDefaultPost(),
                                getDefaultPost(),
                                getDefaultPost(),
                                getDefaultPost(),
                            ],
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma.post.findMany()];
                case 2:
                    posts = _a.sent();
                    return [2 /*return*/, {
                            posts: posts,
                        }];
            }
        });
    });
}
exports.default = seedPosts;
//# sourceMappingURL=post.js.map