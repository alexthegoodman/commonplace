import { gql } from "graphql-request";

export const threadsQuery = gql`
  query Threads($where: UserWhereUniqueInput!) {
    user(where: $where) {
      name
      email
      createdAt
      updatedAt

      threads {
        id
        repliesAllowed
        users {
          name
        }
        post {
          title
          contentType
          contentPreview
          content
        }
        messages {
          user {
            name
            email
            profileImage
          }
          type
          content

          createdAt
          updatedAt
        }

        createdAt
        updatedAt
      }
    }
  }
`;

export const threadQuery = gql`
  query Thread($where: ThreadWhereUniqueInput!) {
    thread(where: $where) {
      id
      repliesAllowed
      users {
        name
      }
      post {
        title
        contentType
        contentPreview
        content

        creator {
          name
        }
      }
      messages {
        user {
          name
          email
          profileImage
        }
        type
        content

        createdAt
        updatedAt
      }

      createdAt
      updatedAt
    }
  }
`;
