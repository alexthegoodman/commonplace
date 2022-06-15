"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadType = void 0;
var client_1 = require("@prisma/client");
var nexus_1 = require("nexus");
var prisma = new client_1.PrismaClient();
exports.ThreadType = (0, nexus_1.objectType)({
    name: "Thread",
    definition: function (t) {
        t.model.id();
        t.model.repliesAllowed();
        // t.model.post();
        t.model.users();
        t.model.messages({
            ordering: true,
        });
        t.model.readHistory({
            ordering: true,
        });
        t.model.updatedAt();
        t.model.createdAt();
    },
});
//# sourceMappingURL=Thread.js.map