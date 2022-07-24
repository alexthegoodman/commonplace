import { gql } from "graphql-request";

export const createRecordMutation = gql`
  mutation CreateReadRecord($username: String!, $threadId: String!) {
    createReadRecord(username: $username, threadId: $threadId) {
      createdAt
    }
  }
`;
