"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
var client_1 = require("@prisma/client");
var nexus_1 = require("nexus");
var prisma = new client_1.PrismaClient();
exports.Query = (0, nexus_1.queryType)({
    definition: function (t) {
        // NOTE: no filtering except by id, CRUD unnecessary
        // t.crud.user();
        // NOTE: not protected
        t.crud.post();
        // NOTE: only accesseble via id or user query
        t.crud.thread();
        // NOTE: not protected, better accessed via interest query?
        // paginate?
        t.crud.posts({ filtering: true, ordering: true });
        // NOTE: not protected
        t.crud.categories();
        // NOTE: not protected
        t.crud.interests();
    },
});
//# sourceMappingURL=Query.js.map