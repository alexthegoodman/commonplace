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
        email
        generatedUsername
        chosenUsername
        profileImage
        coverImage
        language
      }
      messages {
        id
        type
        content
        user {
          chosenUsername
        }
        updatedAt
        createdAt
      }
      updatedAt
      createdAt
    }
  }
`;

export const getDashboardUsersQuery = gql`
  query GetDashboardUsers {
    getDashboardUsers {
      name
      email
      generatedUsername
      chosenUsername
      profileImage
      coverImage
      language

      posts {
        title
      }

      pageViews {
        url
        createdAt
      }

      updatedAt
      createdAt
    }
  }
`;

export const deletePostAdminMutation = gql`
  mutation DeletePostAdmin($postId: String!) {
    deletePostAdmin(postId: $postId)
  }
`;

export const deleteUserAdminMutation = gql`
  mutation DeleteUserAdmin($generatedUsername: String!) {
    deleteUserAdmin(generatedUsername: $generatedUsername)
  }
`;
