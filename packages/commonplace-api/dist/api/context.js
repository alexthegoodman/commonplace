"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = void 0;
var client_1 = require("@prisma/client");
var mixpanel_1 = require("../mixpanel");
var prisma = new client_1.PrismaClient();
var mixpanel = (0, mixpanel_1.setupMixpanel)();
exports.context = {
    prisma: prisma,
    mixpanel: mixpanel,
};
//# sourceMappingURL=context.js.map