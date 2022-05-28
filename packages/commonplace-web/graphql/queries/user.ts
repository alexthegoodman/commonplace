import { gql } from "graphql-request";

export const authenticateQuery = gql`
  query AuthenticateUser($email: String!, $password: String!) {
    authenticate(email: $email, password: $password)
  }
`;

export const userQuery = gql`
  query User($id: String!) {
    user(id: $id) {
      name
      email

      generatedUsername
      chosenUsername

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
      }
    }
  }
`;

const PublicUserFieldsFragment = gql`
  fragment PublicUserFieldsFragment on User {
    name
    generatedUsername
    chosenUsername

    profileImage
    coverImage
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
