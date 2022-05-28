import { gql } from "graphql-request";

const PublicThreadFieldsFragment = gql`
  fragment PublicThreadFieldsFragment on Thread {
    id
    repliesAllowed
    users {
      name
    }

    messages(orderBy: $orderMessagesBy) {
      user {
        name
        email
        chosenUsername
        profileImage
      }
      post {
        title
        contentType
        contentPreview
        content
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
    $orderThreadsBy: [ThreadOrderByWithRelationInput!]
    $threadWhere: ThreadWhereInput
  ) {
    user(id: $id) {
      name
      email
      createdAt
      updatedAt

      threads(orderBy: $orderThreadsBy, where: $threadWhere) {
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
