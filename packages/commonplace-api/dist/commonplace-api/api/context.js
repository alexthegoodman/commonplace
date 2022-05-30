"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
exports.context = {
    prisma: prisma,
};
//# sourceMappingURL=context.js.map