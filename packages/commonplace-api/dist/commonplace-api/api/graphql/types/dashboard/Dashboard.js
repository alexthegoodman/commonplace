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
exports.DashboardType = void 0;
var nexus_1 = require("nexus");
var luxon_1 = require("luxon");
var getUniquePropertyOfArray = function (items, property) {
    var set = new Set();
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        set.add(item[property]);
    }
    return set;
};
var categoryByDate = function (impressions, format) {
    var impressionsByDate = {};
    impressions.forEach(function (impression, i) {
        var jsDate = new Date(impression.createdAt);
        var impressionDate = luxon_1.DateTime.fromJSDate(jsDate).toFormat(format);
        if (typeof impressionsByDate[impressionDate] === "undefined") {
            impressionsByDate[impressionDate] = [];
        }
        impressionsByDate[impressionDate].push(impression);
    });
    return impressionsByDate;
};
var categoryByInterest = function (type, items) {
    var itemsByInterest = []; // { label: "", count: 0 }
    items.forEach(function (entity) {
        var _a;
        var interestName = type === "post" ? entity.interest.name : (_a = entity.post) === null || _a === void 0 ? void 0 : _a.interest.name;
        var itemExists = itemsByInterest.findIndex(function (item) {
            return item.label === interestName;
        });
        if (itemExists < 0) {
            itemsByInterest.push({
                label: interestName,
                value: 1,
            });
        }
        else {
            var deletedItem = itemsByInterest.splice(itemExists, 1);
            itemsByInterest.push({
                label: interestName,
                value: deletedItem[0].value + 1,
            });
        }
    });
    return itemsByInterest;
};
var dateToPair = function (items) {
    var byDate = [];
    Object.keys(items).forEach(function (key, i) {
        var set = getUniquePropertyOfArray(items[key], "userId");
        var value = set.size;
        var datePair = { date: key, value: value };
        byDate.push(datePair);
    });
    return byDate;
};
exports.DashboardType = (0, nexus_1.objectType)({
    name: "Dashboard",
    definition: function (t) {
        var _this = this;
        t.field("totalUsers", {
            type: "Int",
            resolve: function (_, __, context) { return __awaiter(_this, void 0, void 0, function () {
                var totalUsers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, context.prisma.user.count({
                                where: {
                                    id: {
                                        not: "",
                                    },
                                },
                            })];
                        case 1:
                            totalUsers = _a.sent();
                            return [2 /*return*/, totalUsers];
                    }
                });
            }); },
        });
        t.field("dau", {
            type: "Int",
            resolve: function (_, __, context) { return __awaiter(_this, void 0, void 0, function () {
                var today, yesterday, totalImpressions, set, dau;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            today = luxon_1.DateTime.now().toISO();
                            yesterday = luxon_1.DateTime.now().minus({ hours: 24 }).toISO();
                            return [4 /*yield*/, context.prisma.message.findMany({
                                    where: {
                                        type: "impression",
                                        createdAt: {
                                            lte: today,
                                            gt: yesterday,
                                        },
                                    },
                                })];
                        case 1:
                            totalImpressions = _a.sent();
                            set = getUniquePropertyOfArray(totalImpressions, "userId");
                            dau = set.size;
                            return [2 /*return*/, dau];
                    }
                });
            }); },
        });
        t.list.field("dauMonthly", {
            type: "DateValuePair",
            resolve: function (_, __, context) { return __awaiter(_this, void 0, void 0, function () {
                var today, lastMonth, totalImpressions, impressionsByDate, dauByDate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            today = luxon_1.DateTime.now().toISO();
                            lastMonth = luxon_1.DateTime.now().minus({ months: 1 }).toISO();
                            return [4 /*yield*/, context.prisma.message.findMany({
                                    where: {
                                        type: "impression",
                                        createdAt: {
                                            lte: today,
                                            gt: lastMonth,
                                        },
                                    },
                                })];
                        case 1:
                            totalImpressions = _a.sent();
                            impressionsByDate = categoryByDate(totalImpressions, "yyyy-MM-dd");
                            dauByDate = dateToPair(impressionsByDate);
                            return [2 /*return*/, dauByDate];
                    }
                });
            }); },
        });
        t.field("mau", {
            type: "Int",
            resolve: function (_, __, context) { return __awaiter(_this, void 0, void 0, function () {
                var today, lastMonth, totalImpressions, set, mau;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            today = luxon_1.DateTime.now().toISO();
                            lastMonth = luxon_1.DateTime.now().minus({ months: 1 }).toISO();
                            return [4 /*yield*/, context.prisma.message.findMany({
                                    where: {
                                        type: "impression",
                                        createdAt: {
                                            lte: today,
                                            gt: lastMonth,
                                        },
                                    },
                                })];
                        case 1:
                            totalImpressions = _a.sent();
                            set = getUniquePropertyOfArray(totalImpressions, "userId");
                            mau = set.size;
                            return [2 /*return*/, mau];
                    }
                });
            }); },
        });
        t.list.field("mauYearly", {
            type: "DateValuePair",
            resolve: function (_, __, context) { return __awaiter(_this, void 0, void 0, function () {
                var today, lastYear, totalImpressions, impressionsByDate, mauByDate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            today = luxon_1.DateTime.now().toISO();
                            lastYear = luxon_1.DateTime.now().minus({ years: 1 }).toISO();
                            return [4 /*yield*/, context.prisma.message.findMany({
                                    where: {
                                        type: "impression",
                                        createdAt: {
                                            lte: today,
                                            gt: lastYear,
                                        },
                                    },
                                })];
                        case 1:
                            totalImpressions = _a.sent();
                            impressionsByDate = categoryByDate(totalImpressions, "yyyy-MM");
                            mauByDate = dateToPair(impressionsByDate);
                            return [2 /*return*/, mauByDate];
                    }
                });
            }); },
        });
        t.field("totalPosts", {
            type: "Int",
            resolve: function (_, __, context) { return __awaiter(_this, void 0, void 0, function () {
                var totalPosts;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, context.prisma.post.count({
                                where: {
                                    id: {
                                        not: "",
                                    },
                                },
                            })];
                        case 1:
                            totalPosts = _a.sent();
                            return [2 /*return*/, totalPosts];
                    }
                });
            }); },
        });
        t.list.field("totalPostsByInterest", {
            type: "LabelValuePair",
            resolve: function (_, __, context) { return __awaiter(_this, void 0, void 0, function () {
                var allPosts, postsByInterest;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, context.prisma.post.findMany({
                                where: {
                                    id: {
                                        not: "",
                                    },
                                },
                                include: {
                                    interest: true,
                                },
                            })];
                        case 1:
                            allPosts = _a.sent();
                            console.info("allPosts", allPosts);
                            postsByInterest = categoryByInterest("post", allPosts);
                            return [2 /*return*/, postsByInterest];
                    }
                });
            }); },
        });
        t.field("dailyImpressions", {
            type: "Int",
            resolve: function (_, __, context) { return __awaiter(_this, void 0, void 0, function () {
                var today, yesterday, dailyImpressions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            today = luxon_1.DateTime.now().toISO();
                            yesterday = luxon_1.DateTime.now().minus({ hours: 24 }).toISO();
                            return [4 /*yield*/, context.prisma.message.count({
                                    where: {
                                        type: "impression",
                                        createdAt: {
                                            lte: today,
                                            gt: yesterday,
                                        },
                                    },
                                })];
                        case 1:
                            dailyImpressions = _a.sent();
                            return [2 /*return*/, dailyImpressions];
                    }
                });
            }); },
        });
        t.list.field("dailyImpressionsByInterest", {
            type: "LabelValuePair",
            resolve: function (_, __, context) { return __awaiter(_this, void 0, void 0, function () {
                var today, yesterday, dailyImpressions, impressionsByInterest;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            today = luxon_1.DateTime.now().toISO();
                            yesterday = luxon_1.DateTime.now().minus({ hours: 24 }).toISO();
                            return [4 /*yield*/, context.prisma.message.findMany({
                                    where: {
                                        type: "impression",
                                        createdAt: {
                                            lte: today,
                                            gt: yesterday,
                                        },
                                    },
                                    include: {
                                        post: {
                                            include: {
                                                interest: true,
                                            },
                                        },
                                    },
                                })];
                        case 1:
                            dailyImpressions = _a.sent();
                            impressionsByInterest = categoryByInterest("impression", dailyImpressions);
                            return [2 /*return*/, impressionsByInterest];
                    }
                });
            }); },
        });
    },
});
//# sourceMappingURL=Dashboard.js.map