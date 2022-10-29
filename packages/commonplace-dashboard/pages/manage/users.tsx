import { GQLClient } from "commonplace-utilities/lib/GQLClient";
import type { NextPage } from "next";
import { useCookies } from "react-cookie";
import useSWR from "swr";
import DeletePostModal from "../../components/DeletePostModal/DeletePostModal";
import ManagementNavigation from "../../components/ManagementNavigation/ManagementNavigation";
import {
  getDashboardPostsQuery,
  getDashboardUsersQuery,
} from "../../gql/manage";
import { useImageUrl } from "../../hooks/useImageUrl";
import { DateTime } from "luxon";
import DeleteUserModal from "../../components/DeleteUserModal/DeleteUserModal";

const getManageData = async (token: string) => {
  const gqlClient = new GQLClient(token);

  const usersData = await gqlClient.client.request(getDashboardUsersQuery);

  return usersData;
};

const Users: NextPage = () => {
  const [cookies] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const { data, mutate } = useSWR("manageUsersKey", () => getManageData(token));

  console.info("getDashboardUsers", data?.getDashboardUsers);

  return (
    <main>
      <ManagementNavigation />
      <h1>Manage Users</h1>
      <section className="grid posts">
        {data?.getDashboardUsers.map((user, i) => {
          //   const { imageUrl } = useImageUrl(post.content, { width: 200 });

          return (
            <div className="card">
              <div className="cardInner">
                <div className="headerInfo">
                  {user.email} {user.chosenUsername}
                </div>
                <div className="info"></div>
                <div className="pageViews">
                  {user.pageViews.map((pageView) => {
                    return (
                      <div className="pageView">
                        <p>{pageView.url}</p>
                        <span>
                          {DateTime.fromISO(pageView.createdAt).toLocaleString(
                            DateTime.DATETIME_MED
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="creator"></div>
                <div className="footerInfo">
                  {/* <span>Updated At: {DateTime.fromISO(user.updatedAt).toFormat("LLL dd, yyyy")}</span> */}
                  <span>
                    Created At:{" "}
                    {DateTime.fromISO(user.createdAt).toLocaleString(
                      DateTime.DATETIME_MED
                    )}
                  </span>
                </div>
                <div className="controls">
                  <DeleteUserModal onConfirm={() => mutate()} user={user} />
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      fallback: {
        manageUsersKey: null,
      },
    },
  };
}

export default Users;
