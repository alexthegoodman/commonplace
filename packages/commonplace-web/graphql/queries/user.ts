import { gql } from "graphql-request";

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
        threads {
          repliesAllowed
          messages {
            user {
              name
              chosenUsername
            }
            type
            content
          }
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
