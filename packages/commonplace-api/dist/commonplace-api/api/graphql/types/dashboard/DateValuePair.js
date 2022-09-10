"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateValuePair = void 0;
var nexus_1 = require("nexus");
exports.DateValuePair = (0, nexus_1.objectType)({
    name: "DateValuePair",
    definition: function (t) {
        t.field("date", {
            type: "String",
        });
        t.field("value", {
            type: "String",
        });
    },
});
//# sourceMappingURL=DateValuePair.js.map