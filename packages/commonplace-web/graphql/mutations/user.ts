import { gql } from "graphql-request";

export const updateProfileMutation = gql`
  mutation UpdateProfile(
    $userId: String!
    $username: String!
    $profileImageName: String
    $profileImageSize: Int
    $profileImageType: String
    $profileImageData: String
    $coverImageName: String
    $coverImageSize: Int
    $coverImageType: String
    $coverImageData: String
  ) {
    updateProfile(
      userId: $userId
      username: $username
      profileImageName: $profileImageName
      profileImageSize: $profileImageSize
      profileImageType: $profileImageType
      profileImageData: $profileImageData
      coverImageName: $coverImageName
      coverImageSize: $coverImageSize
      coverImageType: $coverImageType
      coverImageData: $coverImageData
    )
  }
`;
