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

export const userByUsernameQuery = gql`
  query UserByUsername($chosenUsername: String!) {
    getUserByUsername(chosenUsername: $chosenUsername) {
      name
      generatedUsername
      chosenUsername

      profileImage
      coverImage

      # get posts via secondary query?
    }
  }
`;
