"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestType = void 0;
var client_1 = require("@prisma/client");
var nexus_1 = require("nexus");
var prisma = new client_1.PrismaClient();
exports.InterestType = (0, nexus_1.objectType)({
    name: "Interest",
    definition: function (t) {
        t.model.name();
        t.model.categories();
    },
});
//# sourceMappingURL=Interest.js.map