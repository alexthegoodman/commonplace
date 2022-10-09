import { gql } from "graphql-request";

export const getDashboardDataQuery = gql`
  query GetDashboardData {
    getDashboardData {
      totalUsers
      dau
      dauMonthly {
        date
        value
      }
      mau
      mauYearly {
        date
        value
      }
      totalPosts
      totalPostsByInterest {
        label
        value
      }
      dailyImpressions
      dailyImpressionsByInterest {
        label
        value
      }
    }
  }
`;
