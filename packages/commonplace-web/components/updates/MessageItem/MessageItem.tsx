import * as React from "react";
import ContentViewer from "../../post/ContentViewer/ContentViewer";
import { motion } from "framer-motion";

import { MessageItemProps } from "./MessageItem.d";
import { DateTime } from "luxon";
import { useImageUrl } from "../../../hooks/useImageUrl";
import { useRouter } from "next/router";

const MessageItem: React.FC<MessageItemProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click MessageItem"),
  chosenUsername = "",
  message = null,
  authorSide = "left",
  detailsOpen = false,
}) => {
  const router = useRouter();

  const onMessageClick = (e) => {
    onClick(e);
  };
  const displayDate = DateTime.fromISO(message?.createdAt).toFormat("DDD");
  const { imageUrl: profileImageUrl } = useImageUrl(
    message?.user?.profileImage,
    {
      fit: "cover",
      width: 100,
      height: 100,
    }
  );

  const goToUserProfile = () => {
    router.push(`/co/${chosenUsername}`);
  };

  const authorAttribution = (
    <div className="itemAuthor">
      <div className="authorPhoto">
        <img onClick={goToUserProfile} title="" alt="" src={profileImageUrl} />
      </div>
    </div>
  );

  return (
    <div
      className={`messageItem ${message?.type} ${
        authorSide === "left" ? "authorLeft" : "authorRight"
      }`}
      onClick={onMessageClick}
      role="listitem"
      tabIndex={1}
    >
      {message?.type === "impression" ? (
        <div className={`contentViewerWrapper ${authorSide}`}>
          <ContentViewer
            type={message?.post?.contentType}
            preview={message?.post?.contentPreview}
            content={message?.post?.content}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="messageItemInner">
        {authorSide === "left" ? authorAttribution : <></>}
        <div className={`itemContent ${authorSide}`}>
          <span>{message?.content}</span>
        </div>
        {authorSide === "right" ? authorAttribution : <></>}
      </div>
      <div className="messageMeta">
        {detailsOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span>{message?.user?.chosenUsername}</span>
            <span>@ {displayDate}</span>
          </motion.div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
