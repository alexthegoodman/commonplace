import { gql } from "graphql-request";

export const queuePostsQuery = gql`
  query GetQueuePosts($interestId: String) {
    getQueuePosts(interestId: $interestId) {
      id
      title
      description
      generatedTitleSlug

      contentType
      contentPreview
      content

      creator {
        name
        generatedUsername
        chosenUsername
        profileImage
      }
      interest {
        name
      }

      createdAt
      updatedAt
    }
  }
`;

const PublicPostFieldsFragment = gql`
  fragment PublicPostFieldsFragment on PublicPost {
    title
    description
    generatedTitleSlug

    contentType
    contentPreview
    content

    interest {
      name
      generatedInterestSlug
    }

    createdAt
    updatedAt
  }
`;

export const postURLsQuery = gql`
  query GetPostURLs {
    getPostURLs
  }
`;

export const postsByUsernameQuery = gql`
  query getPostsByUsername($chosenUsername: String!) {
    getPostsByUsername(chosenUsername: $chosenUsername) {
      ...PublicPostFieldsFragment
    }
  }
  ${PublicPostFieldsFragment}
`;

export const postByPostTitleQuery = gql`
  query getPostByPostTitle($postTitle: String!) {
    getPostByPostTitle(postTitle: $postTitle) {
      ...PublicPostFieldsFragment
    }
  }
  ${PublicPostFieldsFragment}
`;
