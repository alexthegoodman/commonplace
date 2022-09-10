"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelValuePair = void 0;
var nexus_1 = require("nexus");
exports.LabelValuePair = (0, nexus_1.objectType)({
    name: "LabelValuePair",
    definition: function (t) {
        t.field("label", {
            type: "String",
        });
        t.field("value", {
            type: "String",
        });
    },
});
//# sourceMappingURL=LabelValuePair.js.map