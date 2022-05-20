import { makeSchema, asNexusMethod } from "nexus";
import { join } from "path";
import { nexusPrisma } from "nexus-plugin-prisma";
import { DateTimeResolver, JSONObjectResolver } from "graphql-scalars";

const jsonScalar = asNexusMethod(JSONObjectResolver, "json");
const dateTimeScalar = asNexusMethod(DateTimeResolver, "date");

import * as types from "./graphql";

export const schema = makeSchema({
  types: [types, jsonScalar, dateTimeScalar],
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"),
    schema: join(__dirname, "..", "schema.graphql"),
  },
});
