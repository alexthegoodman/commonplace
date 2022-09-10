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
var slugify_1 = __importDefault(require("slugify"));
var prisma = new client_1.PrismaClient();
exports.cloudfrontUrl = "https://d3ubks77jdbtp7.cloudfront.net";
exports.testImages = [
    "2022/09/painting2-kQSyfRpjrn.jpg",
    "2022/09/painting1-LLoc8uvOLy.jpg",
    "2022/09/drawing2-kDyehrpfOB.jpg",
    "2022/09/drawing1-1Mdb4o6vu5.jpg",
    "2022/09/sports2-yuxXQHCuf_.jpg",
    "2022/09/sports1-HLXSpjv8hn.jpg",
];
function seedPosts(users, interests) {
    return __awaiter(this, void 0, void 0, function () {
        var posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.post.createMany({
                        data: [
                            {
                                title: "Image #1",
                                description: "custom description",
                                contentType: "image",
                                contentPreview: "",
                                generatedTitleSlug: (0, slugify_1.default)("Image #1"),
                                content: exports.testImages[0],
                                interestId: interests[0].id,
                                creatorId: users[1].id,
                            },
                            {
                                title: "video #1",
                                description: "custom description",
                                contentType: "video",
                                contentPreview: "",
                                generatedTitleSlug: (0, slugify_1.default)("video #1"),
                                content: "2022/09/Chinese - 11700-h-faAYfQRj.mp4",
                                interestId: interests[0].id,
                                creatorId: users[1].id,
                            },
                            {
                                title: "Image 2",
                                description: "custom description",
                                contentType: "image",
                                contentPreview: "",
                                generatedTitleSlug: (0, slugify_1.default)("Image 2"),
                                content: exports.testImages[1],
                                interestId: interests[2].id,
                                creatorId: users[1].id,
                            },
                            {
                                title: "audio #1",
                                description: "custom description",
                                contentType: "audio",
                                contentPreview: "2022/09/music1-Hdz1r_1-QH.jpg",
                                generatedTitleSlug: (0, slugify_1.default)("audio #1"),
                                content: "2022/09/Tuesday-(GlitchSoftHip-hop)-amaksi-pixabay-HIlQb3bzGW.mp3",
                                interestId: interests[0].id,
                                creatorId: users[1].id,
                            },
                            {
                                title: "Image 3",
                                description: "custom description",
                                contentType: "image",
                                contentPreview: "",
                                generatedTitleSlug: (0, slugify_1.default)("Image 3"),
                                content: exports.testImages[2],
                                interestId: interests[0].id,
                                creatorId: users[2].id,
                            },
                            {
                                title: "video #2",
                                description: "custom description",
                                contentType: "video",
                                contentPreview: "",
                                generatedTitleSlug: (0, slugify_1.default)("video #2"),
                                content: "2022/09/Chop - 11638-f7vKlmN_8v.mp4",
                                interestId: interests[0].id,
                                creatorId: users[1].id,
                            },
                            {
                                title: "Image 4",
                                description: "custom description",
                                contentType: "image",
                                contentPreview: "",
                                generatedTitleSlug: (0, slugify_1.default)("Image 4"),
                                content: exports.testImages[3],
                                interestId: interests[0].id,
                                creatorId: users[3].id,
                            },
                            {
                                title: "audio #2",
                                description: "custom description",
                                contentType: "audio",
                                contentPreview: "2022/09/music2-pyPLFtD0mN.jpg",
                                generatedTitleSlug: (0, slugify_1.default)("audio #2"),
                                content: "2022/09/Leonell-Cassio-TheBlackestBouquet-LeonellCassio-pixabay-7i7XmfbUVN.mp3",
                                interestId: interests[0].id,
                                creatorId: users[1].id,
                            },
                            {
                                title: "Image 5",
                                description: "custom description",
                                contentType: "image",
                                contentPreview: "",
                                generatedTitleSlug: (0, slugify_1.default)("Image 5"),
                                content: exports.testImages[4],
                                interestId: interests[0].id,
                                creatorId: users[4].id,
                            },
                            {
                                title: "Image 6",
                                description: "custom description",
                                contentType: "image",
                                contentPreview: "",
                                generatedTitleSlug: (0, slugify_1.default)("Image 6"),
                                content: exports.testImages[5],
                                interestId: interests[0].id,
                                creatorId: users[1].id,
                            },
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