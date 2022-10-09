import { gql } from "graphql-request";

export const getDashboardPostsQuery = gql`
  query GetDashboardPosts {
    getDashboardPosts {
      id
      title
      description
      generatedTitleSlug
      contentType
      contentPreview
      content
      interest {
        id
        name
      }
      creator {
        name
        generatedUsername
        chosenUsername
        profileImage
        coverImage
        language
      }
      updatedAt
      createdAt
    }
  }
`;
