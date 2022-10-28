import { gql } from "graphql-request";

const PostFieldsFragment = gql`
  fragment PostFieldsFragment on Post {
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
`;

export const queuePostsQuery = gql`
  query GetQueuePosts($interestId: String) {
    getQueuePosts(interestId: $interestId) {
      ...PostFieldsFragment
    }
  }
  ${PostFieldsFragment}
`;

export const explorePostsQuery = gql`
  query GetExplorePosts($interestId: String) {
    getExplorePosts(interestId: $interestId) {
      ...PostFieldsFragment
    }
  }
  ${PostFieldsFragment}
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
