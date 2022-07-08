import { gql } from "graphql-request";

const PublicThreadFieldsFragment = gql`
  fragment PublicThreadFieldsFragment on Thread {
    id
    repliesAllowed
    users {
      name
      chosenUsername
    }
    readHistory {
      name
      content
      createdAt
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
      id
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
    getUser(id: $id) {
      name
      chosenUsername
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
