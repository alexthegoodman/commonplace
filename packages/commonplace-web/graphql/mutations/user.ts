import { gql } from "graphql-request";

export const updateProfileMutation = gql`
  mutation UpdateProfile(
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
