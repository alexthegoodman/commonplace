"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
var client_1 = require("@prisma/client");
var nexus_1 = require("nexus");
var prisma = new client_1.PrismaClient();
exports.Mutation = (0, nexus_1.mutationType)({
    definition: function (t) {
        // t.crud.createOnePost();
        // t.crud.updateOneMessage();
        t.crud.createOneRecord();
    },
});
//# sourceMappingURL=Mutation.js.map