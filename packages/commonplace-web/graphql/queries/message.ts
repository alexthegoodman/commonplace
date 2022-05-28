import { gql } from "graphql-request";

export const postImpressionsQuery = gql`
  query GetPostImpressions($postTitle: String!) {
    getPostImpressions(postTitle: $postTitle) {
      type
      content

      user {
        name
        chosenUsername
        email
      }

      updatedAt
      createdAt
    }
  }
`;
