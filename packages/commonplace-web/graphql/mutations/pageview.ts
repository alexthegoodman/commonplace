import { gql } from "graphql-request";

export const createPageViewMutation = gql`
  mutation CreatePageView($url: String!) {
    createPageView(url: $url) {
      url
    }
  }
`;
