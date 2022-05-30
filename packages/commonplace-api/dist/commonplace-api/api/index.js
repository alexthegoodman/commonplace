"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApolloServer = void 0;
var server_1 = require("./server");
var startApolloServer = function () {
    server_1.server.listen().then(function (_a) {
        var url = _a.url;
        console.info("\uD83D\uDE80 Apollo Server ready at ".concat(url));
    });
};
exports.startApolloServer = startApolloServer;
//# sourceMappingURL=index.js.map