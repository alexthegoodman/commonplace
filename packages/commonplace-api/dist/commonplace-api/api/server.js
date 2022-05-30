"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
var apollo_server_1 = require("apollo-server");
var schema_1 = require("./schema");
var context_1 = require("./context");
exports.server = new apollo_server_1.ApolloServer({ schema: schema_1.schema, context: context_1.context });
//# sourceMappingURL=server.js.map