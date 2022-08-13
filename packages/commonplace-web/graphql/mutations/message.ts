import { gql } from "graphql-request";

export const createMessageMutation = gql`
  mutation CreateMessage(
    $type: String!
    $content: String!
    $postCreatorUsername: String
    $postId: String
    $threadId: String
  ) {
    createMessage(
      type: $type
      content: $content
      postCreatorUsername: $postCreatorUsername
      postId: $postId
      threadId: $threadId
    ) {
      createdAt
    }
  }
`;
