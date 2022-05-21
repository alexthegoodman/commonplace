import * as React from "react";

import { MessageItemProps } from "./MessageItem.d";

const MessageItem: React.FC<MessageItemProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click MessageItem"),
  authorSide = "left",
  profileImage = "",
  content = "",
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);

  const authorAttribution = (
    <div className="itemAuthor">
      <div className="authorPhoto">
        <img title="" alt="" src={profileImage} />
      </div>
    </div>
  );

  return (
    <div className="messageItem">
      <div className="messageItemInner">
        {authorSide === "left" ? authorAttribution : <></>}
        <div className={`itemContent ${authorSide}`}>
          <span>{content}</span>
        </div>
        {authorSide === "right" ? authorAttribution : <></>}
      </div>
    </div>
  );
};

export default MessageItem;
