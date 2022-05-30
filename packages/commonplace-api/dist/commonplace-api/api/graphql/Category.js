"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryType = void 0;
var client_1 = require("@prisma/client");
var nexus_1 = require("nexus");
var prisma = new client_1.PrismaClient();
exports.CategoryType = (0, nexus_1.objectType)({
    name: "Category",
    definition: function (t) {
        t.model.name();
        t.model.interests();
    },
});
//# sourceMappingURL=Category.js.map