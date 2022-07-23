import { gql } from "graphql-request";

export const postImpressionsQuery = gql`
  query GetPostImpressions($postTitle: String!) {
    getPostImpressions(postTitle: $postTitle) {
      id
      type
      content

      user {
        name
        chosenUsername
      }

      updatedAt
      createdAt
    }
  }
`;
