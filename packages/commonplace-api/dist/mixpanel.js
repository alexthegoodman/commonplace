"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMixpanel = void 0;
var Mixpanel = require("mixpanel");
var setupMixpanel = function () {
    console.info("Setup Mixpanel...");
    var isDevelopment = process.env.NODE_ENV === "development";
    var mixpanel = Mixpanel.init("0257a00f77cd9b500e88e34f96b2e991", {
        debug: isDevelopment,
    });
    // if (isDevelopment) {
    //   mixpanel.opt_out_tracking();
    // } else {
    //   mixpanel.opt_in_tracking();
    // }
    return mixpanel;
};
exports.setupMixpanel = setupMixpanel;
//# sourceMappingURL=mixpanel.js.map