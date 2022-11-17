import * as React from "react";
import { useCookies } from "react-cookie";
import { toggleFavoriteMutation } from "../../../graphql/mutations/post";
import graphClient from "../../../helpers/GQLClient";
import { RWebShare } from "react-web-share";

import { PostInteractionProps } from "./PostInteraction.d";
import Strings from "../../../helpers/Strings";
import MixpanelBrowser from "../../../helpers/MixpanelBrowser";

const PostInteraction: React.FC<PostInteractionProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click PostInteraction"),
  post = null,
}) => {
  const mixpanel = new MixpanelBrowser();
  const strings = new Strings();
  const [cookies] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;
  const gqlClient = graphClient.setupClient(token);

  const [favorited, setFavorited] = React.useState(false);

  console.info("PostInteraction", post?.favoritedByCurrentUser);

  React.useEffect(() => {
    setFavorited(post?.favoritedByCurrentUser);
  }, [post?.favoritedByCurrentUser]);

  const toggleFavorite = async () => {
    console.info("toggleFavorite", post.id);

    await graphClient.client.request(toggleFavoriteMutation, {
      postId: post.id,
    });

    if (favorited) {
      setFavorited(false);
    } else {
      setFavorited(true);
    }
  };

  const postUrl = strings.getPostUrl(post);

  return (
    <div className="postInteraction">
      <div className="postInteractionInner">
        <a
          href="#!"
          className={`interaction ${favorited ? "favorited" : ""}`}
          onClick={toggleFavorite}
        >
          <i className="typcn typcn-heart-outline"></i>
        </a>
        <RWebShare
          data={{
            text: `Check out ${post?.title} on CommonPlace!`,
            url: postUrl,
            title: "Share " + post?.title,
          }}
          onClick={() => mixpanel.track("Post Shared", { post })}
        >
          <a href="#!" className="interaction">
            <i className="typcn typcn-export-outline"></i>
          </a>
        </RWebShare>
      </div>
    </div>
  );
};

export default PostInteraction;
