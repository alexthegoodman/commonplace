import { makeSchema, asNexusMethod } from "nexus";
import { join } from "path";
import { nexusPrisma } from "nexus-plugin-prisma";
import { DateTimeResolver, JSONObjectResolver } from "graphql-scalars";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";

const jsonScalar = asNexusMethod(JSONObjectResolver, "json");
const dateTimeScalar = asNexusMethod(DateTimeResolver, "date");

import * as types from "./graphql";

export const schema = makeSchema({
  types: [types, jsonScalar, dateTimeScalar, GraphQLUpload],
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
      shouldGenerateArtifacts: true,
      outputs: {
        typegen: __dirname + "/generated/typegen-nexus-plugin-prisma.d.ts",
      },
    }),
  ],
  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"),
    schema: join(__dirname, "..", "schema.graphql"),
  },
});
