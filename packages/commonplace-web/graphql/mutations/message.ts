import { gql } from "graphql-request";

export const createMessageMutation = gql`
  mutation CreateMessage(
    $type: String!
    $content: String!
    $authorUsername: String!
    $postCreatorUsername: String
    $postId: String
    $threadId: String
  ) {
    createMessage(
      type: $type
      content: $content
      authorUsername: $authorUsername
      postCreatorUsername: $postCreatorUsername
      postId: $postId
      threadId: $threadId
    ) {
      createdAt
    }
  }
`;
