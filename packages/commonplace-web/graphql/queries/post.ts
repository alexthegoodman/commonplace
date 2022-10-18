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
      impressions {
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

    impressions {
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
