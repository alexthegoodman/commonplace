import * as React from "react";
import ContentViewer from "../ContentViewer/ContentViewer";

import { MessageItemProps } from "./MessageItem.d";

const MessageItem: React.FC<MessageItemProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click MessageItem"),
  message = null,
  authorSide = "left",
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);

  const authorAttribution = (
    <div className="itemAuthor">
      <div className="authorPhoto">
        <img title="" alt="" src={message?.user?.profileImage} />
      </div>
    </div>
  );

  return (
    <div className={`messageItem ${message?.type}`}>
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
    </div>
  );
};

export default MessageItem;
