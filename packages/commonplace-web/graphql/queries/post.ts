import { gql } from "graphql-request";

export const postsQuery = gql`
  query Posts {
    posts {
      title
      description
      contentType
      contentPreview
      content

      creator {
        name
        chosenUsername
        profileImage

        posts {
          title
        }
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
            profileImage
          }
          type
          content
        }
      }

      createdAt
      updatedAt
    }
  }
`;

const PublicPostFieldsFragment = gql`
  fragment PublicPostFieldsFragment on Post {
    title
    description
    contentType
    contentPreview
    content

    createdAt
    updatedAt
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
