import { GraphQLClient } from "graphql-request";
import { cpGraphqlUrl } from "../def/urls";

export class GQLClient {
  public client;
  public token;

  constructor(token) {
    this.token = token;

    this.setupClient();
  }

  setupClient() {
    this.client = new GraphQLClient(cpGraphqlUrl, {
      headers: {
        Authorization: "Bearer " + this.token,
      },
    });
  }
}
