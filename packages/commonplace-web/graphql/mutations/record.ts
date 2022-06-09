import { gql } from "graphql-request";

export const createRecordMutation = gql`
  mutation CreateOneRecord($data: RecordCreateInput!) {
    createOneRecord(data: $data) {
      createdAt
    }
  }
`;
