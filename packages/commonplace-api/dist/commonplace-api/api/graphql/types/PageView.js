"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageViewType = void 0;
var nexus_1 = require("nexus");
exports.PageViewType = (0, nexus_1.objectType)({
    name: "PageView",
    definition: function (t) {
        t.field("url", {
            type: "String",
        });
        t.field("ipAddress", {
            type: "String",
        });
        t.field("city", {
            type: "DateTime",
        });
        t.field("geoData", {
            type: "DateTime",
        });
    },
});
//# sourceMappingURL=PageView.js.map