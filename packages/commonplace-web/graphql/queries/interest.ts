import { gql } from "graphql-request";

export const categoriesAndInterestsQuery = gql`
  query GetCategories {
    getCategories {
      id
      name

      interests {
        id
        name

        posts {
          title
        }
      }
    }
  }
`;
