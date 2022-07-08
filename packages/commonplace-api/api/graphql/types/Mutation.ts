import { mutationType } from "nexus";

export const Mutation = mutationType({
  definition(t) {
    // t.crud.createOnePost();
    // t.crud.updateOneMessage();
    t.crud.createOneRecord();
  },
});
