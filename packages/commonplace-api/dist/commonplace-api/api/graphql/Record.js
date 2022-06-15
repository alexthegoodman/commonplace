"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordType = void 0;
var client_1 = require("@prisma/client");
var nexus_1 = require("nexus");
var prisma = new client_1.PrismaClient();
exports.RecordType = (0, nexus_1.objectType)({
    name: "Record",
    definition: function (t) {
        t.model.id();
        t.model.name();
        t.model.content();
        t.model.updatedAt();
        t.model.createdAt();
    },
});
//# sourceMappingURL=Record.js.map