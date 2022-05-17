import * as React from "react";
import MessageItem from "../MessageItem/MessageItem";

import { MessageListProps } from "./MessageList.d";

const MessageList: React.FC<MessageListProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click MessageList"),
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <section className="messageList">
      <div className="messageListInner">
        <MessageItem authorSide="left" />
        <MessageItem authorSide="right" />
        <MessageItem authorSide="left" />
      </div>
    </section>
  );
};

export default MessageList;
