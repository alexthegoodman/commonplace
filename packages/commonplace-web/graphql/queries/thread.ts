import { gql } from "graphql-request";

const PublicThreadFieldsFragment = gql`
  fragment PublicThreadFieldsFragment on Thread {
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
    messages(orderBy: $orderMessagesBy) {
      user {
        name
        email
        chosenUsername
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
`;

export const threadsQuery = gql`
  query Threads(
    $id: String!
    $orderMessagesBy: [MessageOrderByWithRelationInput!]
  ) {
    user(id: $id) {
      name
      email
      createdAt
      updatedAt

      threads {
        ...PublicThreadFieldsFragment
      }
    }
  }
  ${PublicThreadFieldsFragment}
`;

export const threadQuery = gql`
  query Thread(
    $where: ThreadWhereUniqueInput!
    $orderMessagesBy: [MessageOrderByWithRelationInput!]
  ) {
    thread(where: $where) {
      ...PublicThreadFieldsFragment
    }
  }
  ${PublicThreadFieldsFragment}
`;
