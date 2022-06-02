import { gql } from "graphql-request";

export const categoriesAndInterestsQuery = gql`
  query Categories {
    categories {
      id
      name

      interests {
        id
        name
      }
    }
  }
`;
