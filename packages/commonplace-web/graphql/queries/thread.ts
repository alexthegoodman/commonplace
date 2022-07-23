import { gql } from "graphql-request";

const ThreadFieldsFragment = gql`
  fragment ThreadFieldsFragment on Thread {
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
    messages {
      user {
        name
        generatedUsername
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
        ...ThreadFieldsFragment
      }
    }
  }
  ${ThreadFieldsFragment}
`;

export const userThreadsQuery = gql`
  query GetUserThreads {
    getUserThreads {
      ...ThreadFieldsFragment
    }
  }
  ${ThreadFieldsFragment}
`;

export const threadQuery = gql`
  query GetThreadById($threadId: String!) {
    getThreadById(threadId: $threadId) {
      ...ThreadFieldsFragment
    }
  }
  ${ThreadFieldsFragment}
`;
