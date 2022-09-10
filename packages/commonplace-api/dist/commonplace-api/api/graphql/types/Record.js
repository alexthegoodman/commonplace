"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordType = void 0;
var nexus_1 = require("nexus");
exports.RecordType = (0, nexus_1.objectType)({
    name: "Record",
    definition: function (t) {
        t.field("name", {
            type: "String",
        });
        t.field("content", {
            type: "String",
        });
        t.field("updatedAt", {
            type: "DateTime",
        });
        t.field("createdAt", {
            type: "DateTime",
        });
    },
});
//# sourceMappingURL=Record.js.map