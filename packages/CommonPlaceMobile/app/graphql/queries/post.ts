import {gql} from '@apollo/client';

export const postsQuery = gql`
  query Posts(
    $where: PostWhereInput
    $orderBy: [PostOrderByWithRelationInput!]
  ) {
    posts(where: $where, orderBy: $orderBy) {
      id
      title
      description
      generatedTitleSlug

      contentType
      contentPreview
      content

      creator {
        name
        chosenUsername
        profileImage
        email

        posts {
          title
        }
      }
      interest {
        name
      }

      createdAt
      updatedAt
    }
  }
`;

export const queuePostsQuery = gql`
  query GetQueuePosts($interestId: String) {
    getQueuePosts(interestId: $interestId) {
      id
      title
      description
      generatedTitleSlug

      contentType
      contentPreview
      content

      creator {
        name
        chosenUsername
        profileImage
        email

        posts {
          title
        }
      }
      interest {
        name
      }

      createdAt
      updatedAt
    }
  }
`;

const PublicPostFieldsFragment = gql`
  fragment PublicPostFieldsFragment on PublicPost {
    title
    description
    generatedTitleSlug

    contentType
    contentPreview
    content

    interest {
      name
      generatedInterestSlug
    }

    createdAt
    updatedAt
  }
`;

export const postURLsQuery = gql`
  query GetPostURLs {
    getPostURLs
  }
`;

export const postsByUsernameQuery = gql`
  query getPostsByUsername($chosenUsername: String!) {
    getPostsByUsername(chosenUsername: $chosenUsername) {
      ...PublicPostFieldsFragment
    }
  }
  ${PublicPostFieldsFragment}
`;

export const postByPostTitleQuery = gql`
  query getPostByPostTitle($postTitle: String!) {
    getPostByPostTitle(postTitle: $postTitle) {
      ...PublicPostFieldsFragment
    }
  }
  ${PublicPostFieldsFragment}
`;
