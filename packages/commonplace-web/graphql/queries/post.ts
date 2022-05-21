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
      }
      interest {
        name
      }
      threads {
        repliesAllowed
        messages {
          user {
            name
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
