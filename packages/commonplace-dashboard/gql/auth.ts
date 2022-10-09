import { gql } from "graphql-request";

export const authenticateQuery = gql`
  query AuthenticateUser {
    authenticate
  }
`;
