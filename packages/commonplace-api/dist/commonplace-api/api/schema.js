"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
var nexus_1 = require("nexus");
var path_1 = require("path");
var nexus_plugin_prisma_1 = require("nexus-plugin-prisma");
var graphql_scalars_1 = require("graphql-scalars");
var GraphQLUpload_js_1 = __importDefault(require("graphql-upload/GraphQLUpload.js"));
var jsonScalar = (0, nexus_1.asNexusMethod)(graphql_scalars_1.JSONObjectResolver, "json");
var dateTimeScalar = (0, nexus_1.asNexusMethod)(graphql_scalars_1.DateTimeResolver, "date");
var types = __importStar(require("./graphql"));
exports.schema = (0, nexus_1.makeSchema)({
    types: [types, jsonScalar, dateTimeScalar, GraphQLUpload_js_1.default],
    plugins: [
        (0, nexus_plugin_prisma_1.nexusPrisma)({
            experimentalCRUD: true,
            shouldGenerateArtifacts: true,
            outputs: {
                typegen: __dirname + "/generated/typegen-nexus-plugin-prisma.d.ts",
            },
        }),
    ],
    outputs: {
        typegen: (0, path_1.join)(__dirname, "..", "nexus-typegen.ts"),
        schema: (0, path_1.join)(__dirname, "..", "schema.graphql"),
    },
});
//# sourceMappingURL=schema.js.map