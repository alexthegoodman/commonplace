import { gql } from "graphql-request";

export const createReplyMutation = gql`
  mutation CreateReply($content: String!, $threadId: String) {
    createReply(content: $content, threadId: $threadId) {
      createdAt
    }
  }
`;

export const createImpressionMutation = gql`
  mutation CreateImpression(
    $content: String!
    $postCreatorUsername: String
    $postId: String
  ) {
    createImpression(
      content: $content
      postCreatorUsername: $postCreatorUsername
      postId: $postId
    ) {
      createdAt
    }
  }
`;
