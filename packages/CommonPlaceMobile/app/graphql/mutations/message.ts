import { gql } from "graphql-request";

export const createMessageMutation = gql`
  mutation CreateMessage(
    $type: String!
    $content: String!
    $authorEmail: String!
    $postCreatorEmail: String
    $postId: String
    $threadId: String
  ) {
    createMessage(
      type: $type
      content: $content
      authorEmail: $authorEmail
      postCreatorEmail: $postCreatorEmail
      postId: $postId
      threadId: $threadId
    ) {
      createdAt
    }
  }
`;
