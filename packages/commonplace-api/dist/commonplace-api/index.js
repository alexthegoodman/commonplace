"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_1 = require("./api");
var app = (0, express_1.default)();
var port = 3001;
console.info("Setup Express Routes...");
app.get("/", function (req, res) {
    res.send("API Functioning");
});
console.info("Start Server...");
app.listen(port, "0.0.0.0", function () {
    console.info("Express Server ready on port ".concat(port));
});
(0, api_1.startApolloServer)();
//# sourceMappingURL=index.js.map