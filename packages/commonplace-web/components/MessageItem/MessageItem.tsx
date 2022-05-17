import * as React from "react";

import { MessageItemProps } from "./MessageItem.d";

const MessageItem: React.FC<MessageItemProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click MessageItem"),
  authorSide = "left",
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);

  const authorAttribution = (
    <div className="itemAuthor">
      <img className="authorPhoto" title="" alt="" src="" />
    </div>
  );

  return (
    <div className="messageItem">
      <div className="messageItemInner">
        {authorSide === "left" ? authorAttribution : <></>}
        <div className={`itemContent ${authorSide}`}>
          <span>Spooky!</span>
        </div>
        {authorSide === "right" ? authorAttribution : <></>}
      </div>
    </div>
  );
};

export default MessageItem;
