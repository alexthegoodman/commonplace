import { gql } from "graphql-request";

export const authenticateQuery = gql`
  query AuthenticateUser($email: String!, $password: String!) {
    authenticate(email: $email, password: $password)
  }
`;

export const registerQuery = gql`
  query RegisterUser($email: String!, $password: String!) {
    registerUser(email: $email, password: $password)
  }
`;

export const userQuery = gql`
  query User($id: String!) {
    user(id: $id) {
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
