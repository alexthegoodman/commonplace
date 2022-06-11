import { gql } from "graphql-request";

export const createPostMutation = gql`
  mutation CreatePost(
    $creatorId: String!
    $interestId: String!
    $contentType: String!
    $title: String!
    $description: String!
    $text: String
    $file1Name: String
    $file1Size: Int
    $file1Type: String
    $file1Data: String
    $file2Name: String
    $file2Size: Int
    $file2Type: String
    $file2Data: String
  ) {
    createPost(
      creatorId: $creatorId
      interestId: $interestId
      contentType: $contentType
      title: $title
      description: $description
      text: $text
      file1Name: $file1Name
      file1Size: $file1Size
      file1Type: $file1Type
      file1Data: $file1Data
      file2Name: $file2Name
      file2Size: $file2Size
      file2Type: $file2Type
      file2Data: $file2Data
    ) {
      id
      title
      generatedTitleSlug
    }
  }
`;
