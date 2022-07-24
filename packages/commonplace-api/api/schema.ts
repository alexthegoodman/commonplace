import { makeSchema, asNexusMethod } from "nexus";
import { join } from "path";
import { DateTimeResolver, JSONObjectResolver } from "graphql-scalars";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { applyMiddleware } from "graphql-middleware";

const jsonScalar = asNexusMethod(JSONObjectResolver, "json");
const dateTimeScalar = asNexusMethod(DateTimeResolver, "date");

import * as types from "./graphql";
import { permissions } from "./permissions";

const schema = makeSchema({
  types: [types, jsonScalar, dateTimeScalar, GraphQLUpload],
  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"),
    schema: join(__dirname, "..", "schema.graphql"),
  },
});

export const protectedSchema = applyMiddleware(schema, permissions);
