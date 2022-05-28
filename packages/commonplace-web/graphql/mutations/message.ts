import { gql } from "graphql-request";

export const createMessageMutation = gql`
  mutation CreateMessage(
    $type: String!
    $content: String!
    $authorEmail: String!
    $threadId: String!
  ) {
    createMessage(
      type: $type
      content: $content
      authorEmail: $authorEmail
      threadId: $threadId
    ) {
      createdAt
    }
  }
`;
