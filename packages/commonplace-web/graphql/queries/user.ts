import { gql } from "graphql-request";

export const authenticateQuery = gql`
  query AuthenticateUser {
    authenticate
  }
`;

export const registerQuery = gql`
  query RegisterUser {
    registerUser
  }
`;

export const userQuery = gql`
  query GetUser($id: String!) {
    getUser(id: $id) {
      name
      email

      generatedUsername
      chosenUsername

      credit

      profileImage
      coverImage

      createdAt
      updatedAt

      posts {
        title
        description
        generatedTitleSlug

        contentType
        contentPreview
        content

        creator {
          name
          chosenUsername
        }
        interest {
          name
          generatedInterestSlug
        }

        createdAt
        updatedAt
      }
    }
  }
`;

const PublicUserFieldsFragment = gql`
  fragment PublicUserFieldsFragment on PublicUser {
    name
    generatedUsername
    chosenUsername

    profileImage
    coverImage
  }
`;

export const profileURLsQuery = gql`
  query GetProfileURLs {
    getProfileURLs
  }
`;

export const userByUsernameQuery = gql`
  query UserByUsername($chosenUsername: String!) {
    getUserByUsername(chosenUsername: $chosenUsername) {
      ...PublicUserFieldsFragment
    }
  }
  ${PublicUserFieldsFragment}
`;

export const userByPostTitleQuery = gql`
  query UserByPostTitle($postTitle: String!) {
    getUserByPostTitle(postTitle: $postTitle) {
      ...PublicUserFieldsFragment
    }
  }
  ${PublicUserFieldsFragment}
`;
