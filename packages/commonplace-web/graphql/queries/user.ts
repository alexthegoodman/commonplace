import { gql } from "graphql-request";

export const userQuery = gql`
  query User($where: UserWhereUniqueInput!) {
    user(where: $where) {
      name
      email
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
      }
    }
  }
`;
